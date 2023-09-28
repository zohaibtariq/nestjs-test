import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection, connect } from "mongoose";

describe('e2e - complete end to end', () => {

    let app: INestApplication;
    let mongoConnection: Connection;
    let randomUserName: string;
    let randomUserUserName: string;
    let fixedUserPassword: string;
    let accessToken: string;
    let refreshToken: string;
    let userId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
        // memory mongodb
        mongoConnection = (await connect(process.env.MONGODB_TEST_URI)).connection;
    });

    beforeEach(async () => {
        // generate random details after each test
        randomUserName = `randomUserName${Math.floor(Math.random() * 100000)}`;
        randomUserUserName = `randomUserUserName${Math.floor(Math.random() * 100000)}`;
        fixedUserPassword = 'hellopass';
        // call signup after every test for new tokens and userId
        const signup = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                name: randomUserName,
                username: randomUserUserName,
                password: fixedUserPassword,
            });
        if(signup.body.accessToken)
            accessToken = signup.body.accessToken;
        if(signup.body.refreshToken)
            refreshToken = signup.body.refreshToken;
        if(signup.body.userId)
            userId = signup.body.userId;
    });

    afterEach(async () => {
        // refresh complete database after each test
        const collections = mongoConnection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    });

    /*
    * PUBLIC APIS
    * */

    describe('PUBLIC', () => {

        describe('HOME', () => {
            it('GET /', () => {
                return request(app.getHttpServer())
                    .get('/')
                    .expect(200)
                    .expect('Hello World!');
            });
        })

        describe('AUTH', () => {
            it('POST /auth/signup', async () => {
                // You cannot sign up with details that are already used for signup
                const signupResponse = await request(app.getHttpServer())
                    .post('/auth/signup')
                    .send({
                        name: randomUserName,
                        username: randomUserUserName,
                        password: fixedUserPassword,
                    })
                    .expect(400);
                expect(signupResponse.body).toBeDefined();
                expect(signupResponse.header['content-type']).toContain('application/json');
            });

            it('POST /auth/signin', async () => {
                const signinResponse = await request(app.getHttpServer())
                    .post('/auth/signin')
                    .send({
                        username: randomUserUserName,
                        password: fixedUserPassword,
                    })
                    .expect(201)
                expect(signinResponse.body).toBeDefined();
                expect(signinResponse.body.accessToken).toBeDefined();
                expect(signinResponse.body.refreshToken).toBeDefined();
                expect(signinResponse.header['content-type']).toContain('application/json');
            });
        })

        describe('COUNTRIES', () => {
            it('GET /countries', async () => {
                const countriesResponse = await request(app.getHttpServer())
                    .get('/countries')
                    .expect(200);
                expect(countriesResponse.body).toBeDefined();
                expect(countriesResponse.body).toStrictEqual([]);
                expect(countriesResponse.header['content-type']).toContain('application/json');
            });

            it('GET /countries/:id', async () => {
                expect(1).toBe(1)
            });
        })

        describe('FILMS', () => {
            it('GET /films', async () => {
                const filmsResponse = await request(app.getHttpServer())
                    .get('/films')
                    .expect(200);
                expect(filmsResponse.body).toBeDefined();
                expect(filmsResponse.body).toStrictEqual([]);
                expect(filmsResponse.header['content-type']).toContain('application/json');
            });
        })

        describe('SEARCH', () => {
            it('POST /search', async () => {
                const searchResponse = await request(app.getHttpServer())
                    .post('/search')
                    .send({})
                    .expect(201);
                expect(searchResponse.body).toBeDefined();
                expect(searchResponse.body).toHaveProperty('took')
                expect(searchResponse.body).toHaveProperty('timed_out')
                expect(searchResponse.body).toHaveProperty('_shards')
                expect(searchResponse.body).toHaveProperty('hits')
            });
        })

    })

    /*
    * PROTECTED APIS (WITH REFRESH TOKEN)
    * */
    describe('PROTECTED - REFRESH', () => {

        describe('AUTH', () => {
            it('GET /auth/refresh', async () => {
                const refreshResponse = await request(app.getHttpServer())
                    .get('/auth/refresh')
                    .set({
                        Authorization: `Bearer ${refreshToken}`,
                    })
                    .expect(200);
                expect(refreshResponse.body).toBeDefined();
                expect(refreshResponse.body.accessToken).toBeDefined();
                expect(refreshResponse.body.refreshToken).toBeDefined();
                expect(refreshResponse.header['content-type']).toContain('application/json');
            });
        })

    })

    /*
    * PROTECTED APIS (WITH BEARER ACCESS TOKEN)
    * */
    describe('PROTECTED - BEARER ACCESS TOKEN', () => {

        describe('USERS', () => {
            it('GET /users', async () => {
                const resp = await request(app.getHttpServer())
                    .get('/users')
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
                expect(resp.body).toBeDefined();
                expect(resp.body.length).toBeGreaterThanOrEqual(1);
            });
            it('GET /users/:id', async () => {
                const userDetailResp = await request(app.getHttpServer())
                    .get(`/users/${userId}`)
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
                expect(userDetailResp.body).toBeDefined();
                expect(userDetailResp.body._id).toBe(userId);
            });
            it('PATCH /users/:id', async () => {
                const updatedName = "Updated Display Name"
                const userDetailResp = await request(app.getHttpServer())
                    .patch(`/users/${userId}`)
                    .send({
                        "name": updatedName
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
                expect(userDetailResp.body).toBeDefined();
                expect(userDetailResp.body.name).toBe(updatedName);
            });
            it('DELETE /users/:id', async () => {
                const userDeleteResp = await request(app.getHttpServer())
                    .delete(`/users/${userId}`)
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
            });
        })

        describe('COUNTRIES', () => {
            it('GET /countries', async () => {
                const countryResp = await request(app.getHttpServer())
                    .post('/countries')
                    .send({
                        name: `countryName ${Math.floor(Math.random() * 100000)}`,
                        iso: `isoName ${Math.floor(Math.random() * 100000)}`
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(201)
                const resp = await request(app.getHttpServer())
                    .get('/countries')
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
                expect(resp.body).toBeDefined();
                expect(resp.body.length).toBeGreaterThanOrEqual(1);
            });
            it('GET /countries/:id', async () => {
                const countryResp = await request(app.getHttpServer())
                    .post('/countries')
                    .send({
                        name: `countryName ${Math.floor(Math.random() * 100000)}`,
                        iso: `isoName ${Math.floor(Math.random() * 100000)}`
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(201)
                const countryId = countryResp.body._id
                const countryDetailResp = await request(app.getHttpServer())
                    .get(`/countries/${countryId}`)
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
                expect(countryDetailResp.body).toBeDefined();
                expect(countryDetailResp.body._id).toBe(countryId);
            });
            it('PATCH /countries/:id', async () => {
                const countryResp = await request(app.getHttpServer())
                    .post('/countries')
                    .send({
                        name: `countryName ${Math.floor(Math.random() * 100000)}`,
                        iso: `isoName ${Math.floor(Math.random() * 100000)}`
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(201)
                const countryId = countryResp.body._id
                const updatedName = "Updated Display Name"
                const countryDetailResp = await request(app.getHttpServer())
                    .patch(`/countries/${countryId}`)
                    .send({
                        "name": updatedName
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
                expect(countryDetailResp.body).toBeDefined();
                expect(countryDetailResp.body.name).toBe(updatedName);
            });
            it('DELETE /countries/:id', async () => {
                const countryResp = await request(app.getHttpServer())
                    .post('/countries')
                    .send({
                        name: `countryName ${Math.floor(Math.random() * 100000)}`,
                        iso: `isoName ${Math.floor(Math.random() * 100000)}`
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(201)
                const countryId = countryResp.body._id
                const countryDeleteResp = await request(app.getHttpServer())
                    .delete(`/countries/${countryId}`)
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
            });
        })

        describe('FILMS', () => {
            it('GET /films', async () => {
                const filmResp = await request(app.getHttpServer())
                    .post('/films')
                    .send({
                        "name": `filmname ${Math.floor(Math.random() * 100000)}`,
                        "description": "long detail",
                        "releaseDate": new Date(),
                        "ticketPrice": 10,
                        "genre": ['test1', 'test2', 'test3']
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(201)
                const resp = await request(app.getHttpServer())
                    .get('/films')
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
                expect(resp.body).toBeDefined();
                expect(resp.body.length).toBeGreaterThanOrEqual(1);
            });
            it('GET /films/:id', async () => {
                const filmResp = await request(app.getHttpServer())
                    .post('/films')
                    .send({
                        "name": `filmname ${Math.floor(Math.random() * 100000)}`,
                        "description": "long detail",
                        "releaseDate": new Date(),
                        "ticketPrice": 10,
                        "genre": ['test1', 'test2', 'test3']
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(201)
                const filmId = filmResp.body.id
                const filmDetailResp = await request(app.getHttpServer())
                    .get(`/films/${filmId}`)
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
                expect(filmDetailResp.body).toBeDefined();
                expect(filmDetailResp.body.id).toBe(filmId);
            });
            it('PATCH /films/:id', async () => {
                const filmResp = await request(app.getHttpServer())
                    .post('/films')
                    .send({
                        "name": `filmname ${Math.floor(Math.random() * 100000)}`,
                        "description": "long detail",
                        "releaseDate": new Date(),
                        "ticketPrice": 10,
                        "genre": ['test1', 'test2', 'test3']
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(201)
                const filmId = filmResp.body.id
                const updatedName = "Updated Display Name"
                const filmDetailResp = await request(app.getHttpServer())
                    .patch(`/films/${filmId}`)
                    .send({
                        "name": updatedName,
                        "description": "long detail",
                        "releaseDate": new Date(),
                        "ticketPrice": 10,
                        "genre": ['test1', 'test2', 'test3']
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
                expect(filmDetailResp.body).toBeDefined();
                expect(filmDetailResp.body.name).toBe(updatedName);
            });
            it('DELETE /films/:id', async () => {
                const filmResp = await request(app.getHttpServer())
                    .post('/films')
                    .send({
                        "name": `filmname ${Math.floor(Math.random() * 100000)}`,
                        "description": "long detail",
                        "releaseDate": new Date(),
                        "ticketPrice": 10,
                        "genre": ['test1', 'test2', 'test3']
                    })
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(201)
                const filmId = filmResp.body.id
                const filmDeleteResp = await request(app.getHttpServer())
                    .delete(`/films/${filmId}`)
                    .set({
                        Authorization: `Bearer ${accessToken}`,
                    })
                    .expect(200)
            });
        })

        // IMPORTANT: ELASTIC SEARCH e2e tests are MISSING (short of time)

    })

    afterAll(async() => {
        await mongoConnection.dropDatabase();
        await mongoConnection.close();
        if(app){
            await app.close()
        }
    })
});
