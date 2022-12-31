import { MediaStackNewsResponse } from "src/http/ergast/models/MediaStackNews"
import { NewsItem, NewsResponse } from "../models"

const sortNews = (a: NewsItem, b: NewsItem) => 
  new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()

export const mapSeasonsFromSource = (source: MediaStackNewsResponse): NewsResponse => {
  const news = source.data
    .filter(item => !!item.image)
    .map((item) => ({
      author: item.author,
      title: item.title,
      description: item.description,
      url: item.url,
      source: item.source,
      image: item.image,
      publishDate: item.published_at,
    }))
    .sort(sortNews)

  return {
    news,
  }
}