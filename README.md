<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest JS Test](https://github.com/zohaibtariq/nestjs-test) is a test repository to showcase skills related to
framework NestJs, MongoDB and ElasticSearch.

## Installation

```bash
git clone https://github.com/zohaibtariq/nestjs-test nestjs_test_zohaibtariq
```

```bash
cd nestjs_test_zohaibtariq
```
First make sure that you are now inside cloned repo and that docker have installed, follow for [MAC](https://docs.
docker.com/desktop/install/mac-install/) & [WINDOWS](https://docs.docker.com/desktop/install/windows-install/)

```bash
docker compose build
```

```bash
docker compose up -d
```

This command will only show mongo and elasticsearch container (No nestjs container you have to execute it locally)
```bash
docker ps
```


#### Run Nest JS (Locally)

```bash
npm install
```

```bash
npm run start
```
OR
```bash
npm run start:dev
```
check tests
```bash
npm run test:e2e
```
```bash
npm run test
```

##### .env file and some images with task detail has been shared over email, while postman collection is attached below. for elasticsearch please execute in sequence of (1,2,3,4,5) create index, create docs, search, delete index

## Postman Collection

****[POSTMAN COLLECTION FILE (Avrioc.postman_collection.json)](https://github.com/zohaibtariq/nestjs-test/blob/development/Avrioc.postman_collection.json)****



#### You can also watch `command.md` file for some other helpful command

## Stay in touch

- Author - [Zohaib Tariq](https://www.linkedin.com/in/zohaib-tariq/)
- Website - [https://www.linkedin.com/in/zohaib-tariq/](https://www.linkedin.com/in/zohaib-tariq/)

## Credits

- [Zohaib Tariq](https://github.com/zohaibtariq)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.