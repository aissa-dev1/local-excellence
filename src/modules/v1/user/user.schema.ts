import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users_v1' })
export class UserV1 extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  joinedAt: number;
}

export const UserSchemaV1 = SchemaFactory.createForClass(UserV1);
