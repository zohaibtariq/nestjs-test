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

This command must show nest
```bash
docker ps
```

you can execute any command inside docker container from outside use below command and pass commands at end

docker exec -it CONTAINER_NAME_OR_ID bash -c "npm install ; npm test ; "

```bash
docker exec -it nestjs sh -c "npm install ; npm run test:e2e ; "
```

#### You also can execute below commands but it will serve from your local setup not from docker (not recommended)

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Zohaib Tariq](https://www.linkedin.com/in/zohaib-tariq/)
- Website - [https://www.linkedin.com/in/zohaib-tariq/](https://www.linkedin.com/in/zohaib-tariq/)

## Credits

- [Zohaib Tariq](https://github.com/zohaibtariq)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.