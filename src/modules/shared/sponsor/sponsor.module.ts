import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SponsorControllerV1 } from 'src/modules/v1/sponsor/sponsor.controller';
import {
  SponsorSchemaV1,
  SponsorV1,
} from 'src/modules/v1/sponsor/sponsor.schema';
import { SponsorServiceV1 } from 'src/modules/v1/sponsor/sponsor.service';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SponsorV1.name, schema: SponsorSchemaV1 },
    ]),
    StoreModule,
  ],
  providers: [SponsorServiceV1],
  controllers: [SponsorControllerV1],
})
export class SponsorModule {}
