import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema({
    collection: 'countries',
})
export class Country extends Document{

    @Prop({ required: true, unique: true, dropDupes: true })
    name: string;

    @Prop({ required: true, unique: true, dropDupes: true })
    iso: string;

}

export const CountrySchema = SchemaFactory.createForClass(Country);