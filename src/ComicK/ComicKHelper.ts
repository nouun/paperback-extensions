interface Language {
  name: string,
  pbCode: string,
  ckCode: string,
  default?: boolean,
}

class _CKLanguages {
  // As ComicK is just a Mangadex clone, we can use the codes from the Mangadex extension.
  // https://github.com/Paperback-iOS/extensions-sources/blob/primary/src/MangaDex
  Languages: Language[] = [
    {
      // Arabic
      name: "اَلْعَرَبِيَّةُ",
      ckCode: "ar",
      pbCode: "sa",
    },
    {
      // Bulgarian
      name: "български",
      ckCode: "bg",
      pbCode: "bg",
    },
    {
      // Bengali
      name: "বাংলা",
      ckCode: "bn",
      pbCode: "bd",
    },
    {
      // Catalan
      name: "Català",
      ckCode: "ca",
      pbCode: "es",
    },
    {
      // Czech
      name: "Čeština",
      ckCode: "cs",
      pbCode: "cz",
    },
    {
      // Danish
      name: "Dansk",
      ckCode: "da",
      pbCode: "dk",
    },
    {
      // German
      name: "Deutsch",
      ckCode: "de",
      pbCode: "de",
    },
    {
      // English
      name: "English",
      ckCode: "en",
      pbCode: "gb",
      default: true,
    },
    {
      // Spanish
      name: "Español",
      ckCode: "es",
      pbCode: "es",
    },
    {
      // Spanish (Latin American)
      name: "Español (Latinoamérica)",
      ckCode: "es-la",
      pbCode: "es",
    },
    {
      // Farsi
      name: "فارسی",
      ckCode: "fa",
      pbCode: "ir",
    },
    {
      // Finnish
      name: "Suomi",
      ckCode: "fi",
      pbCode: "fi",
    },
    {
      // French
      name: "Français",
      ckCode: "fr",
      pbCode: "fr",
    },
    {
      // Hebrew
      name: "עִבְרִית",
      ckCode: "he",
      pbCode: "il",
    },
    {
      // Hindi
      name: "हिन्दी",
      ckCode: "hi",
      pbCode: "in",
    },
    {
      // Hungarian
      name: "Magyar",
      ckCode: "hu",
      pbCode: "hu",
    },
    {
      // Indonesian
      name: "Indonesia",
      ckCode: "id",
      pbCode: "id",
    },
    {
      // Italian
      name: "Italiano",
      ckCode: "it",
      pbCode: "it",
    },
    {
      // Japanese
      name: "日本語",
      ckCode: "ja",
      pbCode: "jp",
    },
    {
      // Korean
      name: "한국어",
      ckCode: "ko",
      pbCode: "kr",
    },
    {
      // Lithuanian
      name: "Lietuvių",
      ckCode: "lt",
      pbCode: "lt",
    },
    {
      // Mongolian
      name: "монгол",
      ckCode: "mn",
      pbCode: "mn",
    },
    {
      // Malay
      name: "Melayu",
      ckCode: "ms",
      pbCode: "my",
    },
    {
      // Burmese
      name: "မြန်မာဘာသာ",
      ckCode: "my",
      pbCode: "mm",
    },
    {
      // Dutch
      name: "Nederlands",
      ckCode: "nl",
      pbCode: "nl",
    },
    {
      // Norwegian
      name: "Norsk",
      ckCode: "no",
      pbCode: "no",
    },
    {
      // Polish
      name: "Polski",
      ckCode: "pl",
      pbCode: "pl",
    },
    {
      // Portuguese
      name: "Português",
      ckCode: "pt",
      pbCode: "pt",
    },
    {
      // Portuguese (Brazilian)
      name: "Português (Brasil)",
      ckCode: "pt-br",
      pbCode: "pt",
    },
    {
      // Romanian
      name: "Română",
      ckCode: "ro",
      pbCode: "ro",
    },
    {
      // Russian
      name: "Pусский",
      ckCode: "ru",
      pbCode: "ru",
    },
    {
      // Serbian
      name: "Cрпски",
      ckCode: "sr",
      pbCode: "rs",
    },
    {
      // Swedish
      name: "Svenska",
      ckCode: "sv",
      pbCode: "se",
    },
    {
      // Thai
      name: "ไทย",
      ckCode: "th",
      pbCode: "th",
    },
    {
      // Tagalog
      name: "Filipino",
      ckCode: "tl",
      pbCode: "ph",
    },
    {
      // Turkish
      name: "Türkçe",
      ckCode: "tr",
      pbCode: "tr",
    },
    {
      // Ukrainian
      name: "Yкраї́нська",
      ckCode: "uk",
      pbCode: "ua",
    },
    {
      // Vietnamese
      name: "Tiếng Việt",
      ckCode: "vi",
      pbCode: "vn",
    },
    {
      // Chinese (Simplified)
      name: "中文 (简化字)",
      ckCode: "zh",
      pbCode: "cn",
    },
    {
      // Chinese (Traditional)
      name: "中文 (繁體字)",
      ckCode: "zh-hk",
      pbCode: "hk",
    },
  ];

  getCKCodeList = (): string[] =>
    this.Languages.map((lang) => lang.ckCode);

  getName = (ckCode: string): string =>
    this.Languages
      .filter((lang) => lang.ckCode == ckCode)[0]?.name ?? "Unknown";

  getCKCode = (pbCode: string): string =>
    this.Languages
      .filter((lang) => lang.pbCode == pbCode)[0]?.ckCode ?? "_unknown"

  getPBCode = (ckCode: string): string =>
    this.Languages
      .filter((lang) => lang.ckCode == ckCode)[0]?.pbCode ?? "_unknown";

  getDefault = (): string[] =>
    this.Languages
      .filter((lang) => lang.default)
      .map((lang) => lang.ckCode);
}

export const CKLanguages = new _CKLanguages();

