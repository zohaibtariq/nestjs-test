import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types, Schema as MongooseSchema } from 'mongoose';
import { User } from "../../users/schemas/user.schema";
import { Film } from "./film.schema";

export type FilmRatingDocument = FilmRating & Document;

@Schema({
    collection: 'film_ratings',
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class FilmRating {

    @Prop({ required: true })
    comment: string;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: User.name, index: true})
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: Film.name, index: true})
    filmId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    rating: number;

}

export const FilmRatingSchema = SchemaFactory.createForClass(FilmRating);