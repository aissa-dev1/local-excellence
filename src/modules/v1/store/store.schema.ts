import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'stores_v1' })
export class StoreV1 {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  createdAt: number;
}

export const StoreSchemaV1 = SchemaFactory.createForClass(StoreV1);
