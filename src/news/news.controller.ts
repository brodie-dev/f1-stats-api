import { Controller, Get, Version } from "@nestjs/common";
import { NewsService } from "./news.service";

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

    @Version('1')
    @Get("/") 
    getDriversStandingsCurrent() {
      return this.newsService.getDriversStandingsCurrent()
    
  }
}