import {
  CKChapterPreview,
  CKGenre,
  CKPerson,
  CKRelated,
  CKSearchResult,
} from "./ComicKTypes";
import {
  Chapter,
  LanguageCode,
  Manga,
  MangaTile,
  TagSection,
} from "paperback-extensions-common";
import { CKLanguages } from "./ComicKHelper";
import { StateData } from "./ComicKSettings";

export const parseSearchTags = (genre: string): TagSection[] => {
  const genreTags = JSON.parse(genre)
    .filter((item: CKGenre) => item.slug && item.name)
    .map((item: CKGenre) => createTag({
      id: item.slug,
      label: item.name,
    }));

  return [
    createTagSection({
      id: "genre",
      label: "Genre",
      tags: genreTags,
    }),
  ];
};

export const parseMangaDetails = (mangaId: string, data: string): Manga => {
  const res = JSON.parse(data);
  const c = res.comic;
  const artist = res.artists.map((item: CKPerson) => item.name).join();
  const author = res.authors.map((item: CKPerson) => item.name).join();
  const relatedIds = c.relate_from
    .map((item: CKRelated) => item.relate_to.slug);

  const genres = res.genres
    .map((item: CKGenre) => createTag({
      label: item.name,
      id: item.slug,
    }));

  return createManga({
    id: mangaId,
    titles: [ c.title ],
    author,
    artist,
    relatedIds,
    desc: c.desc.replaceAll("<br/>", "\n"),
    image: c.cover_url,
    rating: c.bayesian_rating,
    status: c.status,
    follows: c.user_follow_count,
    hentai: c.hentai,
    tags: [
      createTagSection({
        id: "genres",
        label: "Genres",
        tags: genres,
      }),
    ],
  });
};

export const parseChapters =
  (mangaId: string, data: CKChapterPreview[]): Chapter[] =>
      data.map((c: CKChapterPreview): Chapter => {
        const id = c.hid;
        const name = c.title || "Unknown";
        const volume = parseInt(c.vol || "") || 1;
        const chapNum = parseInt(c.chap || "1") || 1;
        const time = new Date(c.created_at);
        const langCode = <LanguageCode> CKLanguages.getPBCode(c.lang);

        return createChapter({
          id,
          mangaId,
          name,
          volume,
          chapNum,
          time,
          langCode,
        });
      });

export const parseSearchItems = (data: string): MangaTile[] =>
  JSON.parse(data)
    .map((item: CKSearchResult): MangaTile => {
      let image = "https://comick.fun/static/failed_to_load.png";

      if (item.cover_url) {
        image = item.cover_url;
      } else if (item.md_covers && item.md_covers[0]) {
        image = item.md_covers[0].gpurl;
      }

      return createMangaTile({
        id: item.slug,
        image,
        title: createIconText({ text: item.title }),
      });
    });

