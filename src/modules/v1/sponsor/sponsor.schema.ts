import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'sponsors_v1' })
export class SponsorV1 extends Document {
  @Prop({ required: true })
  backgroundColor: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  ownerStoreName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  href: string;

  @Prop({ required: true })
  btnText: string;

  @Prop({ required: true })
  dynamicLink: boolean;
}

export const SponsorSchemaV1 = SchemaFactory.createForClass(SponsorV1);
