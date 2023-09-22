import { IsString, IsNotEmpty, IsNumber, IsDateString, IsUrl, ArrayMinSize } from 'class-validator';

export class CreateFilmDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: Date;

    @IsNotEmpty()
    @IsNumber()
    readonly ticketPrice: number;

    // @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Country' }] })
    // country_id: Country[]; // Reference to the Country model

    @IsNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    genre: string[];

    // @IsNotEmpty()
    // @FileInterceptor('photo')
    // photo: Multer.File;

}
