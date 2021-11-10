export type CKSearchResult = {
  slug: string,
  title: string,
  md_covers: {
    gpurl: string,
  }[] | undefined,
  cover_url: string | undefined,
}

export type CKChapterPreview = {
  hid: string,
  chap: string,
  lang: string,
  title: string | null,
  vol: string | null,
  created_at: string,
}

export type CKChapterImage = {
  url: string,
  w: number,
  h: number
}

export type CKChapter = {
  images: CKChapterImage[]
}

export type CKPerson = {
  name: string,
  slug: string,
}

export type CKTitle = {
  title: string,
}

export type CKRelated = {
  relate_to: {
    title: string,
    slug: string,
  },
  md_relates: {
    name: string,
  },
}

export type CKCategory = {
  mu_categories: {
    title: string,
    slug: string,
  },
  positive_vote: number,
  negative_vote: number,
}

export type CKGenre = {
  id: number,
  slug: string,
  name: string,
}
