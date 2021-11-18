import {
  Chapter,
  ChapterDetails,
  LanguageCode,
  Manga,
  MangaStatus,
  MangaTile,
  TagSection,
} from "paperback-extensions-common";
import {
  URLBuilder,
  createText,
} from "./GeneralHelper";
import { CheerioAPI } from "cheerio";

const parseTime = (timeString: string): Date => {
  if (timeString.includes(":")) {
    const [ month, day, year ] = new Date()
      .toLocaleDateString("en-US", { timeZone: "Asia/Seoul" })
      .split("/")
      .map((part) => part.padStart(2));

    return new Date([ year, month, day ].join("-") + "T" + timeString + ":00+09:00");
  } else {
    return new Date(timeString.replace(/\./g, "-") + "T00:00:00+09:00");
  }
};

export const parseSearchResults = ($: CheerioAPI, baseDomain: string): [MangaTile[], boolean] => {
  const results = $("#webtoon-list-all > li > div > div > .imgframe")
    .toArray()
    .map((tile) => {
      const id = $(".img-item > a", tile)
        .attr("href")
        .match(/comic\/(\d+)/)[1];
      if (!id) throw Error("Unable to match search result ID");

      let image = $(".img-item > a > img", tile).attr("src");
      const imageParts = image
        .match(/\.[a-zA-Z]*\/(.*)\/thumb-([^.]*)_\d+x\d+\.jpe?g/);

      if (imageParts) {
        image = new URLBuilder(baseDomain)
          .addPath(imageParts[1])
          .addPath(imageParts[2] + ".jpg")
          .build();
      }

      const title = createText($(".title", tile).text());
      const subtitleText = createText($(".list-date", tile).text());

      return createMangaTile({
        id,
        image,
        title,
        subtitleText,
      });
    });

  const end = $(".disabled > a > .fa-angle-double-right")
    .toArray()
    .length != 0;

  return [
    results,
    end,
  ];
};

export const parseSearchTags = ($: CheerioAPI): TagSection[] => {
  const genres = $(".s-genre")
    .toArray()
    .map((el): string => $(el).attr("data-value"))
    .filter((tag) => !!tag)
    .map((tag) => createTag({
      id: tag,
      label: tag,
    }));

  return [
    createTagSection({
      id: "tag",
      label: "장르",
      tags: genres,
    }),
  ];
};

export const parseMangaDetails = ($: CheerioAPI, id: string): Manga => {
  const el = $(".view-title > .view-content > .row");
  const image = $("div > .view-content1 > .view-img > img", el).attr("src");
  const titles = [
    $("div > .view-content > span > b", el).text()
      .trim(),
  ];
  const descEl = $("div > .view-content", el).get(1);
  const desc = $(descEl)
    .text()
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
    const id = linkEl
      .attr("href")
      .match(/comic\/(\d+)/)[1];
    if (!id) throw Error("Unable to match search result ID");

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
      .trim();

    const time = parseTime(timeStr);

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

export const parseChapterDetails =
  (data: string, cheerio: CheerioAPI, mangaId: string, id: string): ChapterDetails => {
    let pages = [];

    try {
      const htmlRegex = /var( *html_data *\+?= *'([A-Z0-9]{2}\.)*';? *\n?)+/;
      const scriptRegex = /unescape\('(%[A-Z0-9]{2})+'\)/;
      // @ts-ignore
      const htmlDataScript = data.match(htmlRegex)[0];
      // @ts-ignore
      const htmlData = eval(htmlDataScript);
      // @ts-ignore
      let script = data.match(scriptRegex)[0];
      console.log("Original Script: " + script);
      // @ts-ignore
      script = eval(script);
      // @ts-ignore
      script = script.substr(0, script.lastIndexOf("<"));
      script = script.substr(script.lastIndexOf(">") + 1);
      script = script.replace(/document\..*=/, "return ");
      script = script.replace(/document\..*\((.*)\)/, "return $1");
      const funcName = (script.match(/function +(.*?)\(/) ?? [0, "html_encoder"])[1];
      console.log("parsed: " + script);
      const out = eval("var l;" + script + `${funcName}(htmlData)`);
      console.log("Output: " + out);

      const $ = cheerio.load(out);

      pages = $("img")
        .toArray()
        .map((page) => $(page).get(0).attribs)
        .filter((attribs) => attribs["src"].includes("loading"))
        .map((attribs) => attribs[
          Object.keys(attribs).filter((attrib) => attrib.startsWith("data-"))[0] ?? "data"
        ]);
    } catch (err) {
      throw Error(`Unable to evaluate server chapter code.\n${err}`);
    }

    return createChapterDetails({
      mangaId,
      id,
      pages,
      longStrip: false,
    });
  };

export const parseHomeUpdates = ($: CheerioAPI, collectedIds?: string[]): { manga: MangaTile[], collectedIds: string[] } => {
  const mangaTiles: MangaTile[] = []
  if (!collectedIds) {
    collectedIds = []
  }

  for (const item of $('.post-row', '.miso-post-webzine').toArray()) {
    const id = $('a', $('.pull-right.post-info', item)).attr('href')?.split('/').pop() ?? ''
    const title = $('a', $('.post-subject', item)).children().remove().end().text().trim()
    const image = $('img', item).attr('src') ?? ''

    if (!collectedIds.includes(id)) {
      mangaTiles.push(createMangaTile({
        id: id,
        title: createIconText({ text: title }),
        image: image
      }))
      collectedIds.push(id)
    }
  }

  return { manga: mangaTiles, collectedIds: collectedIds }
}

export const parseHomeList = ($: CheerioAPI, collectedIds?: string[]): { manga: MangaTile[], collectedIds: string[] } => {
  const mangaTiles: MangaTile[] = []
  if (!collectedIds) {
    collectedIds = []
  }

  for (const item of $('li', '#webtoon-list-all').toArray()) {
    const id = $('a', item).attr('href')?.split('/').pop() ?? ''
    const title = $('span.title.white', item).text()
    const image = $('img', item).attr('src') ?? ''

    if (!collectedIds.includes(id)) {
      mangaTiles.push(createMangaTile({
        id: id,
        title: createIconText({ text: title }),
        image: image
      }))
      collectedIds.push(id)
    }
  }

  return { manga: mangaTiles, collectedIds: collectedIds }
}

