import { MediaStackNewsResponse } from "src/http/ergast/models/MediaStackNews"
import { NewsItem, NewsResponse } from "../models"

const sortNews = (a: NewsItem, b: NewsItem) => 
  new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()

export const mapSeasonsFromSource = (source: MediaStackNewsResponse): NewsResponse => {
  const news = source.data
    .reduce((acc, item) => {
      if (item.image) {
        acc.push({
          author: item.author,
          title: item.title,
          description: item.description,
          url: item.url,
          source: item.source,
          image: item.image,
          publishDate: item.published_at,
        })
      }

      return acc
    }, [] as NewsItem[])
    .sort(sortNews)

  return {
    news,
  }
}