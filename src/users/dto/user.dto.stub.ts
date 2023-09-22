import { CreateUserDto } from "./create-user.dto";

export const UserDTOStub = (): CreateUserDto => {
    return {
        "username": "hellousername",
        "password": "helloupassword",
    };
};