import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'sponsors_v1' })
export class SponsorV1 extends Document {
  @Prop({ required: true })
  storeId: string;

  @Prop({ required: true })
  backgroundColor: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  description: string;
}

export const SponsorSchemaV1 = SchemaFactory.createForClass(SponsorV1);
