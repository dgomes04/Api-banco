import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: any) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
