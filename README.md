# Backend
```bash
docker-compose -f backend/docker-compose.yml up -d 
```

# Frontend
```bash
docker-compose -f frontend/docker-compose.yml up --build
# for detached mode
docker-compose -f frontend/docker-compose.yml up -d --build
```
