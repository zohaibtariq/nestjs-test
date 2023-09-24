###### KILL PORT

```bash
sudo lsof -i :3000
```

```bash
kill -9 PID
```

###### DOCKER NESTJS CONTAINER

navigate to nestjs docker container
```bash
docker exec -it nestjs sh
```

watch logs of nestjs docker container
```bash
docker logs -f nestjs
```

###### DOCKER ELASTICSEARCH CONTAINER

navigate to nestjs elasticsearch container
```bash
docker exec -it elasticsearch sh
```

watch logs of elasticsearch docker container
```bash
docker logs -f elasticsearch
```

###### CREATE RESOURCE

```bash
cd src && nest g resource
```

###### GENERATE TOKENS

```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```