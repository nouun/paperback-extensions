import {
  Chapter,
  ChapterDetails,
  ContentRating,
  HomeSection,
  LanguageCode,
  Manga,
  MangaTile,
  PagedResults,
  SearchRequest,
  Section,
  Source,
  SourceInfo,
} from "paperback-extensions-common";
import {
  getStateData,
  menuGeneralSettings,
} from "./NewTokiSettings";
import { URLBuilder } from "./GeneralHelper";
import {
  parseChapterDetails,
  parseChapters,
  parseMangaDetails,
  parseSearchResults,
} from "./NewTokiParser";

export const DEFAULT_NEWTOKI_URL = "https://newtoki111.com";

export const NewTokiInfo: SourceInfo = {
  name: "뉴토끼",
  icon: "icon.png",
  websiteBaseURL: DEFAULT_NEWTOKI_URL,
  version: "0.1.0",
  description: "Extension that scrapes webtoons from 뉴토끼.",
  author: "Nouun",
  authorWebsite: "https://github.com/nouun/",
  contentRating: ContentRating.MATURE,
  language: LanguageCode.KOREAN,
};

export class NewToki extends Source {
  NEWTOKI_URL = DEFAULT_NEWTOKI_URL;

  requestManager = createRequestManager({
    requestsPerSecond: 4,
    requestTimeout: 15000,
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
    const title = query.title || "";
    if (title.split("").length < 2 || metadata?.end) {
      return createPagedResults({ results: [] });
    }

    const req = createRequestObject({
      url: (await this.getBaseURL())
        .addPath("webtoon")
        .addParam("stx", title)
        .build(),
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    const results = parseSearchResults(cheerio);

    return createPagedResults({
      results,
      metadata: { end: true },
    });
  }

  async getSearchTagResults(tag: Tag, metadata: Metadata): Promise<PagedResults> {
    const page = metadata?.page || 1;
    const req = createRequestObject({
      url: `${BASE_URL}/filterList?page=${page}&cat=${tag.id}&sortBy=name&asc=true`,
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);
    const results = parseFilterSearch(cheerio);

    return createPagedResults({ results });
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

  // override async getSearchTags(): Promise<TagSection[]> {
  //   const req = createRequestObject({
  //     url: `${BASE_URL}/manga-list`,
  //     method: "GET",
  //   });

  //   const data = await this.requestManager.schedule(req, 2);
  //   const cheerio = this.cheerio.load(data.data);

  //   return parseSearchTags(cheerio);
  // }

  //     override async getHomePageSections(cb: (section: HomeSection) => void): Promise<void> {
  //       const req = createRequestObject({
  //         url: `${API_BASE_URL}?${PARAMS}`,
  //         method: "GET",
  //       });
  //       const data = await this.requestManager.schedule(req, 2);
  //       const details = JSON.parse(data.data).data;

  //       parseHomePageSections(details, cb);
  //     }

  //     override async getViewMoreItems(id: string, metadata: Metadata): Promise<PagedResults> {
  //       const page = metadata?.page || 1;
  //       let results: MangaTile[];
  //       switch (id) {
  //         case "updated": {
  //           if (page != 1)
  //             return createPagedResults({ results: [] });

  //           const req = createRequestObject({
  //             url: BASE_URL,
  //             method: "GET",
  //           });

  //           const data = await this.requestManager.schedule(req, 2);
  //           const $ = this.cheerio.load(data.data);

  //           results = parseUpdatedItems($, false);
  //           break;
  //         }
  //         case "viewed": {
  //           const req = createRequestObject({
  //             url: `${BASE_URL}/filterList?page=${page}&sortBy=views&asc=false`,
  //             method: "GET",
  //           });

  //           const data = await this.requestManager.schedule(req, 2);
  //           const $ = this.cheerio.load(data.data);

  //           results = parseFilterSearch($);
  //           break;
  //         }
  //         default:
  //           return Promise.resolve(createPagedResults({ results: [] }));
  //       }

//     return createPagedResults({
//       results,
//       metadata: { page: page + 1 },
//     });
//   }
}

