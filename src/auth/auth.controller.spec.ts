import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    const mockAuthService = {
        signUp: jest.fn(),
        signIn: jest.fn(),
        logout: jest.fn(),
        refreshTokens: jest.fn(),
        getRequestUser: jest.fn(),
    };

    const mockUsersService = {
        findByUsername: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                        verifyAsync: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('signup', () => {
        it('should call authService.signUp with the provided data', async () => {
            const createUserDto: CreateUserDto = { username: 'testuser', password: 'testpassword' };

            await controller.signup(createUserDto);

            expect(mockAuthService.signUp).toHaveBeenCalledWith(createUserDto);
        });
    });

    describe('signin', () => {
        it('should call authService.signIn with the provided data', async () => {
            const authDto: AuthDto = { username: 'testuser', password: 'testpassword' };

            await controller.signin(authDto);

            expect(mockAuthService.signIn).toHaveBeenCalledWith(authDto);
        });
    });
});
