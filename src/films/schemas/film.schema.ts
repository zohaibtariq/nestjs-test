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

    // TODO:: there are two approaches we can use here one is to boost film initially assign max rating 5 and as rating
    //  arrives replace or update its avg rating, 2nd is more neutral to assign 0 and update on new rating we mix these
    @Prop({ required: false, default: 5, min: 1, max: 5 })
    rating: number;

}

export const FilmSchema = SchemaFactory.createForClass(Film);