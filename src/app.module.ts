import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { connectDBForRootAsync } from './db';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/shared/user/user.module';
import { AuthModule } from './modules/shared/auth/auth.module';
import { StoreModule } from './modules/shared/store/store.module';
import { SponsorModule } from './modules/shared/sponsor/sponsor.module';
import { ProductModule } from './modules/shared/product/product.module';
import { TranslationModule } from './modules/common/translations/translation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      ...connectDBForRootAsync(),
    }),
    AuthModule,
    UserModule,
    StoreModule,
    ProductModule,
    SponsorModule,
    TranslationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
