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

    // IMPORTANT: there are two approaches we can use here one is to boost film initially assign max rating 5 and as rating arrives replace or update its average rating, 2nd is more neutral to
    //  assign 0 and update on new rating we mix these means on new film assign full rating and as soon as we have rating we will assign proper valid average rating
    @Prop({ required: false, default: 5, min: 1, max: 5 })
    rating: number;

}

const FilmSchema = SchemaFactory.createForClass(Film);
FilmSchema.methods.toJSON = function () {
    const obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    return obj;
};
export { FilmSchema }
