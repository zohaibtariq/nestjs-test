import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema({
    collection: 'films',
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Film {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    releaseDate: Date;

    @Prop({ required: true })
    ticketPrice: number;

    @Prop({ required: true })
    genre: string[];

}

export const FilmSchema = SchemaFactory.createForClass(Film);