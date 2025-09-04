import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

 @Get('test-cron')
getTestCron() {
  const timestamp = new Date().toISOString();
  console.log('🔄 Cron job manually triggered at', timestamp);
  
  return { 
    message: 'Dummy cron executed successfully!',
    timestamp,
    status: 'ok'
  };
}
}
