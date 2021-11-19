import {
  CKChapter,
  CKChapterImage,
} from "./ComicKTypes";
import {
  Chapter,
  ChapterDetails,
  ContentRating,
  HomeSection,
  LanguageCode,
  Manga,
  PagedResults,
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
} from "./ComicKSettings";
import {
  parseChapters,
  parseMangaDetails,
  parseSearchItems,
  parseSearchTags,
} from "./ComicKParser";
import { CKLanguages } from "./ComicKHelper";

const BASE_URL = "https://comick.fun";
const API_BASE_URL = "https://api.comick.fun";

export const ComicKInfo: SourceInfo = {
  name: "ComicK",
  icon: "icon.png",
  websiteBaseURL: BASE_URL,
  version: "0.1.0",
  description: "Extension that scrapes comics from ComicK.fun.",
  author: "Nouun",
  authorWebsite: "https://github.com/nouun/",
  contentRating: ContentRating.ADULT,
  language: LanguageCode.ENGLISH,
};

export class ComicK extends Source {
  stateManager = createSourceStateManager({});

  override async getSourceMenu(): Promise<Section> {
    return Promise.resolve(createSection({
      id: "main",
      header: "ComicK Settings",
      rows: () => Promise.resolve([menuGeneralSettings(this.stateManager)]),
    }));
  }

  override async supportsTagExclusion(): Promise<boolean> {
    return true;
  }

  requestManager = createRequestManager({
    requestsPerSecond: 4,
    requestTimeout: 15000,
  });

  override getMangaShareUrl = (id: string): string =>
    `${BASE_URL}/comic/${id}`;

  // eslint-disable-next-line max-len
  async getSearchResults(query: SearchRequest, metadata: Metadata): Promise<PagedResults> {
    const page = metadata?.page || 1;
    const title = (query.title || "").toString();
    const q = encodeURIComponent(title);
    const inclTags = query.includedTags?.map((tag: Tag) => tag.id).join(",");
    const exclTags = query.excludedTags?.map((tag: Tag) => tag.id).join(",");
    const tags = `genres=${inclTags}&excludes=${exclTags}`;
    const req = createRequestObject({
      url: `${API_BASE_URL}/search?tachiyomi=true&q=${q}&page=${page}&${tags}`,
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const results = parseSearchItems(data.data);

    return createPagedResults({
      results,
      metadata: { page: page + 1 },
    });
  }

  async getChapters(mangaId: string): Promise<Chapter[]> {
    const _req = createRequestObject({
      url: `${API_BASE_URL}/comic/${mangaId}?tachiyomi=true`,
      method: "GET",
    });

    const _data = await this.requestManager.schedule(_req, 2);
    const _res = JSON.parse(_data.data).comic;

    const req = createRequestObject({
      url: `${API_BASE_URL}/comic/${_res.id}/chapter?tachiyomi=true`,
      method: "GET",
    });
    const res = await this.requestManager.schedule(req, 2);
    const data = JSON.parse(res.data);

    let allChapters = parseChapters(mangaId, data.chapters);

    const pages = Math.ceil((data.total - 50) / 50);
    console.log(pages)
    if (pages > 0) {
      const reqs = [...Array(pages).keys()]
        .map(async (page) => {
          const req = createRequestObject({
            url: `${API_BASE_URL}/comic/${_res.id}/chapter?tachiyomi=true&page=${page + 1}`,
            method: "GET",
          });

          const res = await this.requestManager.schedule(req, 2);
          const data = JSON.parse(res.data);

          if (data?.chapters.length == 0) {
            return;
          }

          const chapters = parseChapters(mangaId, data.chapters);
          allChapters = allChapters.concat(chapters);
        });

      await Promise.all(reqs);
    }

    console.log(allChapters.length);
    console.log(data.total);

    const stateData = await getStateData(this.stateManager);
    return allChapters
      .filter((c: Chapter) =>
        stateData.filter.languages.includes(CKLanguages.getCKCode(c.langCode)))
  }

  async getChapterDetails(mangaId: string, id: string): Promise<ChapterDetails> {
    const req = createRequestObject({
      url: `${API_BASE_URL}/chapter/${id}?tachiyomi=true`,
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    const results = <CKChapter>JSON.parse(data.data).chapter;
    const pages = results.images
      .map((item: CKChapterImage) => item.url);

    return createChapterDetails({
      mangaId,
      id,
      pages,
      longStrip: false,
    });
  }

  async getMangaDetails(mangaId: string): Promise<Manga> {
    const req = createRequestObject({
      url: `${API_BASE_URL}/comic/${mangaId}?tachiyomi=true`,
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 2);
    return parseMangaDetails(mangaId, data.data);
  }

  override async getSearchTags(): Promise<TagSection[]> {
    const req = createRequestObject({
      url: `${API_BASE_URL}/genre?tachiyomi=true`,
      method: "GET",
    });
    const genreData = await this.requestManager.schedule(req, 2);

    return parseSearchTags(genreData.data);
  }

  override async getHomePageSections(cb: (section: HomeSection) => void): Promise<void> {
    const sections = [
      createHomeSection({
        id: "rating",
        title: "Hot",
        view_more: true,
      }),
      createHomeSection({
        id: "view",
        title: "Trending",
        view_more: true,
      }),
      createHomeSection({
        id: "uploaded",
        title: "New",
        view_more: true,
      }),
    ];

    const promises: Promise<void>[] = [];

    for (const section of sections) {
      cb(section);

      const req = createRequestObject({
        url: `${API_BASE_URL}/search?tachiyomi=true&sort=${section.id}&page=1`,
        method: "GET",
      });

      promises.push(this.requestManager
        .schedule(req, 2)
        .then((data) => {
          section.items = parseSearchItems(data.data);
          cb(section);
        }));
    }

    await Promise.all(promises);
  }

  override async getViewMoreItems(id: string, metadata: Metadata): Promise<PagedResults> {
    const page = metadata?.page || 1;

    if (metadata?.end) {
      return createPagedResults({
        results: [],
        metadata,
      });
    }

    const req = createRequestObject({
      url: `${API_BASE_URL}/search?tachiyomi=true&sort=${id}&page=${page}`,
      method: "GET",
    });

    const data = await this.requestManager.schedule(req, 1);
    const results = parseSearchItems(data.data);
    return createPagedResults({
      results,
      metadata: {
        page: page + 1,
        end: (results.length < 50),
      },
    });
  }
}

