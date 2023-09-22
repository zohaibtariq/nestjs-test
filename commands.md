###### KILL PORT

```bash
sudo lsof -i :3000
```

```bash
kill -9 PID
```

###### DOCKER

```bash
docker exec -it nestjs sh
```

```bash
docker logs -f nestjs
```

###### CREATE RESOURCE

```bash
cd src && nest g resource
```