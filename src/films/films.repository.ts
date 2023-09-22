
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Film, FilmDocument } from "./schemas/film.schema";
import { Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";

@Injectable()
export class FilmsRepository extends EntityRepository<FilmDocument> {

    constructor(@InjectModel(Film.name) filmModel: Model<FilmDocument>) {
        super(filmModel)
    }

}