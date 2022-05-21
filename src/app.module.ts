import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkController } from './link/link.controller';
import { LinkModule } from './link/link.module';
import { LinkService } from './link/link.service';
import { ILink } from './models/link.model';
import { LinkSchema } from './schemas/link.schema';
import { ViewController } from './view/view.controller';
import { ViewModule } from './view/view.module';
import { ViewService } from './view/view.service';

@Module({
  imports: [
    HttpModule,
    LinkModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.production.local'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ViewModule,
    MongooseModule.forFeature([{ name: ILink.name, schema: LinkSchema }]),
  ],
  controllers: [LinkController, ViewController],
  providers: [LinkService, ViewService],
})
export class AppModule { }