import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class User {

    @Prop({ required: true, unique: true, dropDupes: true })
    username: string;

    @Prop({ required: true })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);