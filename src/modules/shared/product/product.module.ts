import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductControllerV1 } from 'src/modules/v1/product/product.controller';
import {
  ProductSchemaV1,
  ProductV1,
} from 'src/modules/v1/product/product.schema';
import { ProductServiceV1 } from 'src/modules/v1/product/product.service';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductV1.name, schema: ProductSchemaV1 },
    ]),
    StoreModule,
  ],
  providers: [ProductServiceV1],
  controllers: [ProductControllerV1],
})
export class ProductModule {}
