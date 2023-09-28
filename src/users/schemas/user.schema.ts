import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    collection: 'users',
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, dropDupes: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema }