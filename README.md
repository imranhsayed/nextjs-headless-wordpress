# Backend
Run this from root
```bash
docker-compose -f backend/docker-compose.yml up -d 
```

# Frontend
Run this from root for the first time.
```bash
cd frontend; npm i && npm run dev
```

During development
```bash
cd frontend; npm run dev
```

### Evironment vars. 
rename .env-example to .env and add your WordPress Site URL

## Development ( Developers only )

1. When we change the composer.json, run from root
```shell script
docker-compose -f backend/docker-compose.yml down && \
docker-compose -f backend/docker-compose.yml up -d 
```

First line command will stops and removes all the docker containers and second line command will restart all containers. 

2. Check the logs
While the above command is running in detached mode ( -d ), you can run this command in a new terminal tab to see the live logs.
```shell script
docker logs -f container-name
```

e.g.
```bash
docker conatiner ls
```

#### result
```shell script
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                  NAMES
d0b4a3b0074f        wordpress:latest    "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:8000->80/tcp   backend_wordpress_1
aad078ebe131        mysql:5.7           "docker-entrypoint.s…"   About a minute ago   Up About a minute   3306/tcp, 33060/tcp    backend_db_1
```
Here container-name is `backend_db_1` or `backend_wordpress_1`

3. If you make changes to docker-compose.yml file, run the following:

If you happend to change the port in `docker-compose.yml` make sure to delete the `db` directory and then run below.

```shell script
docker-compose -f backend/docker-compose.yml down && \
docker-compose -f backend/docker-compose.yml up -d
```
