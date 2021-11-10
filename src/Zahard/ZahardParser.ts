import {
  Chapter,
  ChapterDetails,
  LanguageCode,
  Manga,
  MangaStatus,
  MangaTile,
  Tag,
  TagSection,
} from "paperback-extensions-common";
import { BASE_URL } from "./Zahard";

export const parseSearchTags =
  ($: CheerioAPI): TagSection[] => {
    const tags = $(".list-category > li > a")
      .toArray()
      .map((el: Node) => {
        const idParts = $(el).attr("href")
          .split("=");
        const id = idParts[idParts.length - 1];
        const label = $(el).text();
        return createTag({
          id,
          label,
        });
      })
      .filter((tag: Tag) => (tag.id && tag.label));

    const categories = createTagSection({
      id: "0",
      label: "genres",
      tags: tags,
    });

    return [ categories ];
  };

export const parseMangaDetails =
  ($: CheerioAPI, mangaId: string): Manga => {
    const title = $(".col-sm-12 > .widget-title").text();
    const desc = $(".well > p").text();
    const rating = parseFloat($("#item-rating").attr("data-score")) || 0.0;
    const tags = $("dl > dd > a")
      .toArray()
      .map((el: Node) => {
        const idParts = $(el).attr("href");
        const id = idParts[idParts.length - 1];
        return createTag({
          label: $(el).text(),
          id,
        });
      });

    let status: MangaStatus;
    switch ($("dl > dd > span").text()) {
      case "Ongoing":
        status = MangaStatus.ONGOING;
        break;
      default:
        // TODO: Find other status and remove this.
        console.log(`UNKNOWN STATUS: ${$("dl > dd > span").text()}`);
        status = MangaStatus.UNKNOWN;
    }

    return createManga({
      id: mangaId,
      titles: [ title ],
      image: getImage(mangaId),
      author: "Unknown",
      artist: "Unknown",
      desc,
      rating,
      status,
      tags: [
        createTagSection({
          id: "cats",
          label: "Categories",
          tags,
        }),
      ],
    });
  };

export const parseChapterDetails =
  ($: CheerioAPI, mangaId: string, id: string): ChapterDetails => {
    const pages = $("#all > img")
      .toArray()
      .map((el: Node): string => $(el).attr("data-src")
        .trim())
      .filter((img: string): boolean => !!img);

    return createChapterDetails({
      id,
      mangaId,
      pages,
      longStrip: false,
    });
  };

export const parseChapters =
  ($: CheerioAPI, mangaId: string): Chapter[] =>
    $(".chapters > li")
      .toArray()
      .map((el: Node): Chapter => {
        const linkEl = $("h5 > a", el);
        const idParts = linkEl.attr("href").split("/");
        const id = idParts[idParts.length - 1];
        const volume = $(el).attr("class")
          .split("-")[1];
        const chapNum = Number(id) || 0;
        const name = $("h5 > em", el).text() || `Chapter ${chapNum}`;
        const dateStr = $("div > div", el).text();
        const time = new Date(Date.parse(dateStr)) || new Date();

        return createChapter({
          id,
          mangaId,
          name,
          volume,
          chapNum,
          time,
          langCode: LanguageCode.ENGLISH,
        });
      })
      .reverse();

export const parseUpdatedItems =
  ($: CheerioAPI, truncate: boolean): MangaTile[] =>
    $(".hot-thumbnails > li > div").toArray()
      .map((el: Node): MangaTile => {
        const titleEl = $(".manga-name > a", el);
        const title = createIconText({ text: titleEl.text() });
        const idParts = titleEl.attr("href").split("/");
        const id = idParts[idParts.length - 1];
        const chapter = $(".well", el).text()
          .trim()
          .substr(1);
        const chapterText = createIconText({ text: "Ch. " + chapter });

        const image = $("a > img", el).attr("src");

        return createMangaTile({
          title,
          id,
          image,
          subtitleText: chapterText,
        });
      })
      .filter((_: MangaTile, index: number) => (!truncate || (index < 12)));

export const parseFilterSearch =
  ($: CheerioAPI): MangaTile[] =>
    $(".col-sm-6 > .media")
      .toArray()
      .map((el: Node): MangaTile => {
        const headerEl = $(".media-body > .media-heading > a", el);
        const idParts = headerEl.attr("href").split("/");
        const id = idParts[idParts.length - 1];
        const title = createIconText({ text: headerEl.text() });
        const image = $(".media-left > a > img", el).attr("src");
        const rating = parseFloat($(".media-body > span", el).text()) || 0.0;

        return createMangaTile({
          id,
          title,
          image,
          subtitleText: createIconText({ text: "☆ " + rating.toFixed(2) }),
        });
      });

export const getImage =
  (id: string): string =>
    `${BASE_URL}/uploads/manga/${id}/cover/cover_250x350.jpg`;

