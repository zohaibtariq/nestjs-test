import { CreateCountryDto } from "./create-country.dto";

export const CountryDTOStub = (): CreateCountryDto => {
    return {
        "name": "Pakistan",
        "iso": "PK",
    };
};