interface MediaStackPagination {
  limit: number
  offset: number
  count: number
  total: number
}

interface MediaStackNewsItem {
  author: string | null
  title: string
  description: string
  url: string
  source: string
  image: string | null
  category: "general" | "business" | "entertainment" | "health" | "science" | "sports" | "technology",
  language: "ar" | "de" | "en" | "es" | "fr" | "he" | "it" | "nl" | "no" | "pt" | "ru" | "se" | "zh"
  country: "gb" | "us" | "au" | "ae",
  published_at: string
}

export interface MediaStackNewsResponse {
  pagination: MediaStackPagination
  data: MediaStackNewsItem[]
}