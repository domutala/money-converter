import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/')
  convert(
    @Query('to') to: string,
    @Query('from') from: string,
    @Query('value') value: string,
  ) {
    return this.appService.convert(value, from, to);
  }

  @Get('/api/rate')
  rate(@Query('base') base: string) {
    return this.appService.rate(base);
  }
}
