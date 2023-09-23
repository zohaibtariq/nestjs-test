
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilmRating, FilmRatingDocument} from "./schemas/film-rating.schema";
import { Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";

@Injectable()
export class FilmsRatingRepository extends EntityRepository<FilmRatingDocument> {

    constructor(@InjectModel(FilmRating.name) filmRatingModel: Model<FilmRatingDocument>) {
        super(filmRatingModel)
    }

}