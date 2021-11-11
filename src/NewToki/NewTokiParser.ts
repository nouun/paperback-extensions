import {
  Chapter,
  ChapterDetails,
  LanguageCode,
  Manga,
  MangaStatus,
  MangaTile,
} from "paperback-extensions-common";
import { CheerioAPI } from "cheerio";
import { createText } from "./GeneralHelper";
import vm from "vm";

export const parseSearchResults = ($: CheerioAPI): MangaTile[] => {
  const results = $("#webtoon-list-all > li > div > div > .imgframe").toArray();

  return results.map((tile) => {
    let id = $(".img-item > a", tile).attr("href");
    id = id.substr(0, id.lastIndexOf("/"));
    id = id.substr(id.lastIndexOf("/") + 1);

    const image = $(".img-item > a > img", tile).attr("src")
      .replaceAll("thumb-", "")
      .replaceAll("_174x124", "");

    const title = createText($(".title", tile).text());
    const subtitleText = createText($(".list-date", tile).text());

    return createMangaTile({
      id,
      image,
      title,
      subtitleText,
    });
  });
};

export const parseMangaDetails = ($: CheerioAPI, id: string): Manga => {
  const el = $(".view-title > .view-content > .row");
  const image = $("div > .view-content1 > .view-img > img", el).attr("src");
  const titles = [
    $("div > .view-content > span > b", el).text()
      .trim(),
  ];
  const descEl = $("div > .view-content", el).get(1);
  const desc = $(descEl).text()
    .trim();

  return createManga({
    id,
    image,
    titles,
    desc,
    status: MangaStatus.UNKNOWN,
  });
};

export const parseChapters = ($: CheerioAPI, mangaId: string): Chapter[] => {
  const chapters = $("#serial-move > .serial-list > .list-body > .list-item").toArray();

  return chapters.map((chapter) => {
    const linkEl = $(".wr-subject > .item-subject", chapter);
    let id = linkEl.attr("href");
    id = id.substr(0, id.lastIndexOf("/"));
    id = id.substr(id.lastIndexOf("/") + 1);

    const name = linkEl
      .contents()
      .filter(function() {
        return this.nodeType === 3;
      })
      .text()
      .trim();
    const chapNum = parseFloat($(".wr-num", chapter).text()) || 1;
    const timeStr = $(".wr-date", chapter)
      .text()
      .replaceAll(".", "-");
    const time = new Date(timeStr);

    return createChapter({
      id,
      mangaId,
      name,
      chapNum,
      time,
      langCode: LanguageCode.KOREAN,
    });
  });
};

export const parseChapterDetails = (data: string, cheerio: CheerioAPI, mangaId: string, id: string): ChapterDetails => {
  const pages = [];

  //try {
  const t = vm.runInNewContext("1 + 1");
  throw Error(t);

  return createChapterDetails({
    mangaId,
    id,
    pages,
    longStrip: false,
  });
};
