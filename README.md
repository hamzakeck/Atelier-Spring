# Atelier Docker - SpringBoot - MySQL

Application full-stack : **React** + **Spring Boot** + **MySQL**, dockerisée.

## Lancer l'application

```bash
git clone https://github.com/hamzakeck/Atelier-Spring.git
cd Atelier-Spring
docker-compose up -d --build
```

Attendez ~30 secondes le temps que MySQL démarre, puis accédez à :

| Service        | URL                                |
|----------------|------------------------------------|
| Frontend React | http://localhost:3000               |
| API REST       | http://localhost:9090/api           |
| Voitures API   | http://localhost:9090/api/voitures  |

## Arrêter l'application

```bash
docker-compose down
```

Pour supprimer aussi les données MySQL :

```bash
docker-compose down -v
```
