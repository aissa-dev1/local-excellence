import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'products_v1' })
export class ProductV1 {
  @Prop({ required: true })
  storeId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  createdAt: number;
}

export const ProductSchemaV1 = SchemaFactory.createForClass(ProductV1);
