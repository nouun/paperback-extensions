import {
  Chapter,
  ChapterDetails,
  ContentRating,
  HomeSection,
  HomeSectionType,
  LanguageCode,
  Manga,
  MangaTile,
  PagedResults,
  Request,
  RequestInterceptor,
  RequestManager,
  Response,
  SearchRequest,
  Section,
  Source,
  SourceInfo,
  Tag,
  TagSection,
  TagType,
} from "paperback-extensions-common";
import {
  getStateData,
  menuGeneralSettings,
} from "./NewTokiSettings";
import {
  parseChapterDetails,
  parseChapters,
  parseMangaDetails,
  parseSearchResults,
  parseSearchTags,
} from "./NewTokiParser";
import { URLBuilder } from "./GeneralHelper";

export const DEFAULT_NEWTOKI_URL = "https://newtoki111.com";

export const NewTokiInfo: SourceInfo = {
  name: "NewToki (뉴토끼)",
  icon: "icon.png",
  websiteBaseURL: DEFAULT_NEWTOKI_URL,
  version: "0.1.0",
  description: "Extension that scrapes webtoons from 뉴토끼.",
  author: "Nouun",
  authorWebsite: "https://github.com/nouun/",
  contentRating: ContentRating.ADULT,
  language: LanguageCode.KOREAN,
  sourceTags: [
    {
      text: "Korean (한국어)",
      type: TagType.GREY,
    }
  ],
};

export class NewToki extends Source {
  NEWTOKI_URL = DEFAULT_NEWTOKI_URL;

  requestManager = createRequestManager({
    requestsPerSecond: 0.5,
    requestTimeout: 10000,
    interceptor: new NewTokiInterceptor(() => this.requestManager),
  });

  stateManager = createSourceStateManager({});

  override async getSourceMenu(): Promise<Section> {
    return Promise.resolve(createSection({
      id: "main",
      header: "뉴토끼 설정",
      rows: () => Promise.resolve([ menuGeneralSettings(this.stateManager) ]),
    }));
  }

  updateDomain = async (): Promise<string> =>
    this.NEWTOKI_URL = (await getStateData(this.stateManager)).domain;

  getBaseURL = async (): Promise <URLBuilder> =>
    new URLBuilder(await this.updateDomain());

  override getMangaShareUrl = (id: string): string =>
    new URLBuilder(this.NEWTOKI_URL)
      .addPath("webtoon")
      .addPath(id)
      .build();

  // eslint-disable-next-line max-len
  async getSearchResults(query: SearchRequest, metadata?: Metadata): Promise<PagedResults> {
    const page = metadata?.page || 1;
    const title = query.title || "";
    if (metadata?.end) {
      return createPagedResults({ results: [] });
    }

    const url = (await this.getBaseURL())
      .addPath("webtoon")
      .addParam("stx", title)
      .addParam("tag", query.includedTags?.map((tag) => tag.id).join(","));

    if (page > 1) url.addPath(`p${page}`);
    const req = createRequestObject({
      url: url.build(),
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    const [ results, end ] = parseSearchResults(cheerio, this.NEWTOKI_URL);

    return createPagedResults({
      results,
      metadata: {
        page: page + (end ? 0 : 1),
        end,
      },
    });
  }

  override async getSearchTags(): Promise<TagSection[]> {
    const req = createRequestObject({
      url: (await this.getBaseURL())
        .addPath("webtoon")
        .build(),
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    return parseSearchTags(cheerio);
  }

  async getMangaDetails(mangaId: string): Promise<Manga> {
    const req = createRequestObject({
      url: (await this.getBaseURL())
        .addPath("webtoon")
        .addPath(mangaId)
        .build(),
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    return parseMangaDetails(cheerio, mangaId);
  }

  async getChapters(mangaId: string): Promise<Chapter[]> {
    const req = createRequestObject({
      url: (await this.getBaseURL())
        .addPath("webtoon")
        .addPath(mangaId)
        .build(),
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    return parseChapters(cheerio, mangaId);
  }

  async getChapterDetails(mangaId: string, id: string): Promise<ChapterDetails> {
    const req = createRequestObject({
      url: (await this.getBaseURL())
        .addPath("webtoon")
        .addPath(id)
        .build(),
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);

    return parseChapterDetails(data.data, this.cheerio, mangaId, id);
  }

  override async getHomePageSections(cb: (section: HomeSection) => void): Promise<void> {
    const sorts = [
      {
        id: "as_view",
        name: "인기순",
      },
      {
        id: "as_good",
        name: "추천순",
      },
      {
        id: "as_star",
        name: "별점순",
      },
      {
        id: "new",
        name: "최신",
      },
    ];
    const toonTypes = [ "일반웹툰", "성인웹툰", "BL/GL" ];

    const stateData = await getStateData(this.stateManager);
    const sections = toonTypes
      .filter((toonType) => stateData.homeSections.includes(toonType))
      .flatMap((toonType) => sorts
        // eslint-disable-next-line
        .map((sort) => { return { sort, toonType }; }))
      .map(({ sort: { id, name }, toonType }, idx) => createHomeSection({
        id: `${toonType}-${id}`,
        type: idx == 0 ?
          HomeSectionType.featured :
          HomeSectionType.singleRowNormal,
        title: `${toonType}: ${name}`,
        view_more: true,
      }));

    const promises = sections.map(async (section) => {
      const [ toonType, id ] = section.id.split("-");

      cb(section);

      const url = (await this.getBaseURL())
        .addPath("webtoon")
        .addParam("toon", toonType)
        .addParam("sod", "desc");

      if (id != "new") {
        url.addParam("sst", id);
      }

      const req = createRequestObject({
        url: url.build(),
        method: "GET",
      });

      const data = await this.requestManager.schedule(req, 2);
      const cheerio = this.cheerio.load(data.data);

      const [ results ] = parseSearchResults(cheerio, this.NEWTOKI_URL);

      // if (section.type == HomeSectionType.featured) {
      //   result = result.map((res) => {
      //     res.subtitleText = undefined;
      //     return res;
      //   });
      // }

      section.items = results;
      cb(section);
    });

    Promise.all(promises);
  }

  override async getViewMoreItems(ID: string, metadata: Metadata): Promise<PagedResults> {
    if (metadata?.end) {
      return createPagedResults({
        results: [],
        metadata,
      });
    }

    const page = metadata?.page || 1;

    const [ toonType, id ] = ID.split("-");

    const url = (await this.getBaseURL())
      .addPath("webtoon")
      .addParam("toon", toonType)
      .addParam("sod", "desc");

    if (id != "new") url.addParam("sst", id);
    if (page > 1) url.addPath(`p${page}`);

    const req = createRequestObject({
      url: url.build(),
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    const [ results, end ] = parseSearchResults(cheerio, this.NEWTOKI_URL);

    return createPagedResults({
      results,
      metadata: {
        page: page + 1,
        end,
      },
    });
  }
}

class NewTokiInterceptor implements RequestInterceptor {
  // constructor(
  //   private requestManager: () => RequestManager,
  // ) {}

  async interceptRequest(req: Request): Promise<Request> {
    return req;
  }

  async interceptResponse(res: Response): Promise<Response> {
    // FIXME: Figure out why this isn't working.

    // If .jpg returns 404, try .jpeg.
    // const url = res.request.url;

    // if (url.includes("jpg") && res.status == 404) {
    //   const req = res.request;
    //   req.url = url.replaceAll("jpg", "jpeg");

    //   res = await this.requestManager().schedule(req, 2);
    // }

    return res;
  }
}
