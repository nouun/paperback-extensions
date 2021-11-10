import {
  Chapter,
  ChapterDetails,
  ContentRating,
  HomeSection,
  LanguageCode,
  Manga,
  MangaStatus,
  MangaTile,
  PagedResults,
  SearchRequest,
  Source,
  SourceInfo,
  TagType,
} from "paperback-extensions-common";

const BASE_URL = "https://mangamutiny.org";
const API_BASE_URL = "https://api.mangamutiny.org/v1/public";
const API_HEADERS = {
  "Accept": "application/json",
  "Origin": "https://mangamutiny.org",
};

export const MangaMutinyInfo: SourceInfo = {
  name: "MangaMutiny",
  icon: "icon.png",
  websiteBaseURL: BASE_URL,
  version: "0.1.0",
  description: "",
  author: "Nouun",
  authorWebsite: "https://github.com/nouun/",
  contentRating: ContentRating.ADULT,
  language: LanguageCode.ENGLISH,
  sourceTags: [
    {
      text: "Buggy",
      type: TagType.RED,
    },
  ],
};

export class MangaMutiny extends Source {
  requestManager = createRequestManager({
    requestsPerSecond: 4,
    requestTimeout: 15000,
  })

  // TODO: Implement advanced search
  // eslint-disable-next-line
  async getSearchResults(query: SearchRequest, metadata: Metadata): Promise<PagedResults> {
    const title = query.title ?? "";
    //const page = metadata?.page ?? 1;

    const q = encodeURIComponent(title);
    const req = createRequestObject({
      url: `${API_BASE_URL}/manga?text=${q}&sort=title&limit=12`,//&skip=${12*(page-1)}
      method: "GET",
      headers: API_HEADERS,
    });

    const data = await this.requestManager.schedule(req, 2);
    const results = parseItems(JSON.parse(data.data).items);

    return createPagedResults({ results });
  }

  async getChapters(mangaId: string): Promise<Chapter[]> {
    const req = createRequestObject({
      url: `${API_BASE_URL}/manga/${mangaId}`,
      method: "GET",
      headers: API_HEADERS,
    });

    const data = await this.requestManager.schedule(req, 2);
    return JSON.parse(data.data)
      .chapters
      .map((chapter) => {
        return createChapter({
          id: chapter.slug,
          mangaId: mangaId,
          volume: chapter.volume,
          name: chapter.title,
          chapNum: chapter.chapter,
          langCode: LanguageCode.ENGLISH,
          time: new Date(chapter.releasedAt),
        });
      });
  }

  async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
    const req = createRequestObject({
      url: `${API_BASE_URL}/chapter/${chapterId}`,
      method: "GET",
      headers: API_HEADERS,
    });

    const data = await this.requestManager.schedule(req, 2);
    const result = JSON.parse(data.data);
    const pages = result
      .images
      .map((image) => {
        return `${result.storage}/${result.manga}/${result.id}/${image}`;
      });

    return createChapterDetails({
      id: chapterId,
      mangaId: mangaId,
      pages: pages,
      longStrip: false,
    });
  }

  async getMangaDetails(mangaId: string): Promise<Manga> {

    const req = createRequestObject({
      url: `${API_BASE_URL}/manga/${mangaId}`,
      method: "GET",
      headers: API_HEADERS,
    });

    const data = await this.requestManager.schedule(req, 2);
    const res = JSON.parse(data.data);
    const tags = res.tags.map((item: string) => createTag({
      id: item,
      label: item,
    }));

    return createManga({
      id: mangaId,
      titles: [ res.title ],
      image: res.thumbnail || defaultImage,
      author: res.authors,
      artist: res.artists,
      desc: res.summary,
      rating: res.rating,
      status: MangaStatus.COMPLETED, // FIXME: Parse status.
      tags: [
        createTagSection({
          id: "tags",
          label: "Tags",
          tags,
        }),
      ],
    });
  }

  override async getHomePageSections(cb: (section: HomeSection) => void): Promise<void> {
    const sections = [
      createHomeSection({
        id: "1",
        title: "Recently Updated",
        view_more: true,
      }),
      createHomeSection({
        id: "2",
        title: "Newest",
        view_more: true,
      }),
      createHomeSection({
        id: "3",
        title: "Popular",
        view_more: true,
      }),
    ];

    const promises: Promise<void>[] = [];

    for (const section of sections) {
      cb(section);

      let sorting = "";
      switch (section.id) {
        case "1": sorting = "-lastReleasedAt"; break;
        case "2": sorting = "-createdAt"; break;
        case "3": sorting = "-rating+-ratingCount"; break;
        default: return;
      }
      const req = createRequestObject({
        url: `${API_BASE_URL}/manga?sort=${sorting}&limit=12`,
        method: "GET",
        headers: API_HEADERS,
      });

      promises.push(
        this.requestManager.schedule(req, 2).then((res) => {
          section.items = parseItems(JSON.parse(res.data).items);

          cb(section);
        }),
      );
    }

    await Promise.all(promises);
  }

  override async getViewMoreItems(id: string, metadata: Metadata): Promise<PagedResults> {
    const page = metadata?.page ?? 1;

    let sorting = "&sort=";
    switch (id) {
      case "1": sorting += "-lastReleasedAt"; break;
      case "2": sorting += "-createdAt"; break;
      case "3": sorting += "-rating+-ratingCount"; break;
      default: sorting = ""; break;
    }
    const req = createRequestObject({
      url: `${API_BASE_URL}/manga?limit=12${sorting}&skip=${12 * (page - 1)}`,
      method: "GET",
      headers: API_HEADERS,
    });

    const data = await this.requestManager.schedule(req, 1);
    const results = parseItems(JSON.parse(data.data).items);

    return createPagedResults({
      results,
      metadata: { page: page + 1 },
    });
  }
}

const parseItems = (items): MangaTile[] =>
  items
    .map((item): MangaTile => {
      return createMangaTile({
        id: item.slug,
        image: item.thumbnail || defaultImage,
        title: createIconText({ text: item.title }),
      });
    });

const defaultImage = `${BASE_URL}/assets/img/404_not_found.png`;
