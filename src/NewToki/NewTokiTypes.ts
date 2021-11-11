export type TTag = {
  tag: string,
  type: string,
  target_idx: string | number,
};

export type TWebtoonPreview = {
  toon_idx: string,
  title: string,
  img_path: string,
  update_episode: string,
};

export type TWebtoonEpisode = {
  score: string,
  ep: string,
  art_idx: string,
  title: string | undefined,
  ep_text: string,
  up_date: string,
};

export type TWebtoonDetails = {
  toon_idk: string,
  title: string,
  img_path: string,
  summary: string,
  adult: string,
  author: string,
  tags: TTag[],
  episode: TWebtoonEpisode[]
};

export type THomeSection = {
  title: string,
  data: TWebtoonPreview[],
};

export type THomePageBanner = {
  ref_idx: string,
  img_path: string,
};

export type THomePage = {
  best: THomeSection[],
  today: TWebtoonPreview[],
  monthly: TWebtoonPreview[],
  news: TWebtoonPreview[],
  exhibition_1: THomeSection[],
  exhibition_2: THomeSection[],
  exhibition_3: THomeSection[],
  event_theme_1: THomeSection[],
  event_theme_2: THomeSection[],
  event_theme_3: THomeSection[],
  main_banner: THomePageBanner[],
};
