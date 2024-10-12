import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreControllerV1 } from 'src/modules/v1/store/store.controller';
import { StoreSchemaV1, StoreV1 } from 'src/modules/v1/store/store.schema';
import { StoreServiceV1 } from 'src/modules/v1/store/store.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StoreV1.name, schema: StoreSchemaV1 }]),
  ],
  providers: [StoreServiceV1],
  controllers: [StoreControllerV1],
  exports: [StoreServiceV1],
})
export class StoreModule {}
