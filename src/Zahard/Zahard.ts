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
  Source,
  SourceInfo,
  Tag,
  TagSection,
} from "paperback-extensions-common";
import {
  getImage,
  parseChapterDetails,
  parseChapters,
  parseFilterSearch,
  parseMangaDetails,
  parseSearchTags,
  parseUpdatedItems,
} from "./ZahardParser";
import { ZSearchItem } from "./ZahardTypes";

export const BASE_URL = "https://zahard.top";

export const ZahardInfo: SourceInfo = {
  name: "Zahard",
  icon: "icon.png",
  websiteBaseURL: BASE_URL,
  version: "0.1.0",
  description: "Extension that scrapes manwha and webtoons from Zahard.top.",
  author: "Nouun",
  authorWebsite: "https://github.com/nouun/",
  contentRating: ContentRating.ADULT,
  language: LanguageCode.ENGLISH,
};

export class Zahard extends Source {
  requestManager = createRequestManager({
    requestsPerSecond: 4,
    requestTimeout: 15000,
  });

  override getMangaShareUrl = (id: string): string => `${BASE_URL}/manga/${id}`;

  // eslint-disable-next-line max-len
  async getSearchResults(query: SearchRequest, metadata: Metadata): Promise<PagedResults> {
    if (query.title) {
      return this.getSearchTitleResults(query.title);
    } else if (query.includedTags && query.includedTags[0]) {
      return this.getSearchTagResults(query.includedTags[0], metadata);
    } else {
      return createPagedResults({ results: [] });
    }
  }

  async getSearchTitleResults(title: string): Promise<PagedResults> {
    const req = createRequestObject({
      url: `${BASE_URL}/search?query=${encodeURIComponent(title)}`,
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const results = JSON.parse(data.data)
      .suggestions
      .map((item: ZSearchItem): MangaTile => {
        return createMangaTile({
          id: item.data,
          image: getImage(item.data),
          title: createIconText({ text: item.value }),
        });
      });

    return createPagedResults({ results });
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

  async getChapters(mangaId: string): Promise<Chapter[]> {
    const req = createRequestObject({
      url: `${BASE_URL}/manga/${mangaId}`,
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    return parseChapters(cheerio, mangaId);
  }

  async getChapterDetails(mangaId: string, id: string): Promise<ChapterDetails> {
    const req = createRequestObject({
      url: `${BASE_URL}/manga/${mangaId}/${id}`,
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    return parseChapterDetails(cheerio, mangaId, id);
  }

  async getMangaDetails(mangaId: string): Promise<Manga> {
    const req = createRequestObject({
      url: `${BASE_URL}/manga/${mangaId}`,
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    return parseMangaDetails(cheerio, mangaId);
  }

  override async getSearchTags(): Promise<TagSection[]> {
    const req = createRequestObject({
      url: `${BASE_URL}/manga-list`,
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const cheerio = this.cheerio.load(data.data);

    return parseSearchTags(cheerio);
  }

  override async getHomePageSections(cb: (section: HomeSection) => void): Promise<void> {
    const sections = [
      {
        req: createRequestObject({
          url: BASE_URL,
          method: "GET",
        }),
        section: createHomeSection({
          id: "updated",
          title: "Recently Updated",
          view_more: true,
        }),
      }, {
        req: createRequestObject({
          url: `${BASE_URL}/filterList?page=1&sortBy=views&asc=false`,
          method: "GET",
        }),
        section: createHomeSection({
          id: "viewed",
          title: "Most Viewed",
          view_more: true,
        }),
      },
    ];

    const promises: Promise<void>[] = [];

    for (const section of sections) {
      cb(section.section);

      promises.push(
        this.requestManager.schedule(section.req, 2).then((res) => {
          const $ = this.cheerio.load(res.data);

          switch (section.section.id) {
            case "updated":
              section.section.items = parseUpdatedItems($, true);
              break;
            case "viewed":
              section.section.items = parseFilterSearch($);
              break;
            default: return;
          }

          cb(section.section);
        }),
      );
    }

    await Promise.all(promises);
  }

  override async getViewMoreItems(id: string, metadata: Metadata): Promise<PagedResults> {
    const page = metadata?.page || 1;
    let results: MangaTile[];
    switch (id) {
      case "updated": {
        if (page != 1)
          return createPagedResults({ results: [] });

        const req = createRequestObject({
          url: BASE_URL,
          method: "GET",
        });

        const data = await this.requestManager.schedule(req, 1);
        const $ = this.cheerio.load(data.data);

        results = parseUpdatedItems($, false);
        break;
      }
      case "viewed": {
        const req = createRequestObject({
          url: `${BASE_URL}/filterList?page=${page}&sortBy=views&asc=false`,
          method: "GET",
        });

        const data = await this.requestManager.schedule(req, 1);
        const $ = this.cheerio.load(data.data);

        results = parseFilterSearch($);
        break;
      }
      default:
        return Promise.resolve(createPagedResults({ results: [] }));
    }

    return createPagedResults({
      results,
      metadata: { page: page + 1 },
    });
  }
}

