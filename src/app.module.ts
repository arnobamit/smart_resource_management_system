import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsService } from './admins/admins.service';
import { AdminsController } from './admins/admins.controller';


@Module({
  imports: [],
  controllers: [AppController, AdminsController],
  providers: [AppService, AdminsService],
})
export class AppModule {}