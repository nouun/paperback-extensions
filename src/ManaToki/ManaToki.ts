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
} from "paperback-extensions-common";
import {
  getStateData,
  menuGeneralSettings,
} from "./TokiSettings";
import {
  parseChapterDetails,
  parseChapters,
  parseHomeList,
  parseHomeUpdates,
  parseMangaDetails,
  parseSearchResults,
  parseSearchTags,
} from "./TokiParser";
import { URLBuilder } from "./GeneralHelper";

export const DEFAULT_URL = "https://manatoki111.net";

export const ManaTokiInfo: SourceInfo = {
  name: "마나토끼",
  icon: "icon.png",
  websiteBaseURL: DEFAULT_URL,
  version: "0.1.0",
  description: "Extension that scrapes webtoons from 마나토끼.",
  author: "Nouun",
  authorWebsite: "https://github.com/nouun/",
  contentRating: ContentRating.ADULT,
  language: LanguageCode.KOREAN,
};

export class ManaToki extends Source {
  URL = DEFAULT_URL;

  requestManager = createRequestManager({
    requestsPerSecond: 4,
    requestTimeout: 10000,
    interceptor: new NewTokiInterceptor(() => this.requestManager),
  });

  stateManager = createSourceStateManager({});

  override async getSourceMenu(): Promise<Section> {
    return Promise.resolve(createSection({
      id: "main",
      header: "마나토끼 설정",
      rows: () => Promise.resolve([menuGeneralSettings(this.stateManager)]),
    }));
  }

  updateDomain = async (): Promise<string> =>
    this.URL = (await getStateData(this.stateManager)).domain;

  getBaseURL = async (): Promise<URLBuilder> =>
    new URLBuilder(await this.updateDomain());

  override getMangaShareUrl = (id: string): string =>
    new URLBuilder(this.URL)
      .addPath("comic")
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
      .addPath("comic")
      .addParam("stx", title)
      .addParam("tag", query.includedTags?.map((tag) => tag.id).join(","));

    if (page > 1) url.addPath(`p${page}`);
    const req = createRequestObject({
      url: url.build(),
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    const [results, end] = parseSearchResults(cheerio, this.URL);

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
        .addPath("comic")
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
        .addPath("comic")
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
        .addPath("comic")
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
        .addPath("comic")
        .addPath(id)
        .build(),
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);

    return parseChapterDetails(data.data, this.cheerio, mangaId, id);
  }

  override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
    const sections = [
      {
        request: createRequestObject({
          url: (await this.getBaseURL())
            .addPath("bbs")
            .addPath("page.php")
            .addParam("hid", "update")
            .build(),
          method: 'GET'
        }),
        section: createHomeSection({
          id: 'updates',
          title: '최신화',
          view_more: true,
        }),
      },
      {
        request: createRequestObject({
          url: (await this.getBaseURL())
            .addPath("comic")
            .build(),
          method: 'GET'
        }),
        section: createHomeSection({
          id: 'list',
          title: '만화목록',
          view_more: true
        }),
      },
    ]

    const promises: Promise<void>[] = []

    for (const section of sections) {
      sectionCallback(section.section)

      promises.push(
        this.requestManager.schedule(section.request, 3).then(response => {
          const $ = this.cheerio.load(response.data)
          switch (section.section.id) {
            case 'updates':
              section.section.items = parseHomeUpdates($).manga
              break
            case 'list':
              section.section.items = parseHomeList($).manga
              break
          }
          sectionCallback(section.section)
        }),
      )
    }

    await Promise.all(promises)
  }

  override async getViewMoreItems(homepageSectionId: string, metadata: Metadata): Promise<PagedResults> {
    const page: number = metadata?.page ?? 1
    let collectedIds: string[] = metadata?.collectedIds ?? []
    let manga
    let mData = undefined

    switch (homepageSectionId) {

      case 'updates': {
        const request = createRequestObject({
          url: (await this.getBaseURL())
            .addPath("bbs")
            .addPath("page.php")
            .addParam("hid", "update")
            .addParam("page", page)
            .build(),
          method: 'GET'
        })

        const data = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(data.data)

        const parsedData = parseHomeUpdates($, collectedIds)
        manga = parsedData.manga
        collectedIds = parsedData.collectedIds

        if (page <= 9)
          mData = { page: (page + 1), collectedIds: collectedIds }

        break
      }
      case 'list': {
        const request = createRequestObject({
          url: (await this.getBaseURL())
            .addPath("comic")
            .addPath(`p${page}`)
            .build(),
          method: 'GET'
        })

        const data = await this.requestManager.schedule(request, 3)
        const $ = this.cheerio.load(data.data)

        const parsedData = parseHomeList($, collectedIds)
        manga = parsedData.manga
        collectedIds = parsedData.collectedIds

        if (page <= 9)
          mData = { page: (page + 1), collectedIds: collectedIds }

        break
      }
      default:
        return createPagedResults({
          results: [],
          metadata: mData
        })
    }

    return createPagedResults({
      results: manga,
      metadata: mData
    })
  }
}

class NewTokiInterceptor implements RequestInterceptor {
  constructor(
    private requestManager: () => RequestManager,
  ) { }

  async interceptRequest(req: Request): Promise<Request> {
    return req;
  }

  async interceptResponse(res: Response): Promise<Response> {
    // FIXME: Test in 0.7

    // If .jpg returns 404, try .jpeg.
    const url = res.request.url;

    if (url.endsWith("jpg") && res.status == 404) {
      const req = res.request;
      req.url = url.slice(0, -3) + "jpeg";

      res = await this.requestManager().schedule(req, 2);
    }

    return res;
  }
}
