import { Controller, Get, Header, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  async get(@Req() req: Request): Promise<string> {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    return await this.appService.getHello(url);
  }
}
