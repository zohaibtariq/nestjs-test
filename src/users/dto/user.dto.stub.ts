import { CreateUserDto } from "./create-user.dto";

export const UserDTOStub = (): CreateUserDto => {
    return {
        "name": "User Display Name",
        "username": "user@username",
        "password": "user@password",
    };
};