PW funzionante:
https://github.com/docentemaurocasadei/jwt-datatabase-sql-ok
aggiungere .env-developer
# .env-developer
APP_NAME=Hamburgeria App
APP_ENV=development
APP_PORT=3000

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=15m

JWT_REFRESH_SECRET=super_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d

DB_HOST=db_jds_ok
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=hamburgeria

------ comandi docker ------

docker network create net_jds_ok

docker volume create voldb_jds_ok

docker run -d --name db_jds_ok --network net_jds_ok -p 127.0.0.1:3320:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=hamburgeria -v voldb_jds_ok:/var/lib/mysql -v "$(pwd)/db/db.sql:/docker-entrypoint-initdb.d/01-db.sql:ro" mysql:8.4

docker build -t app_jds_ok .

docker run -d --name app_jds_ok --network net_jds_ok -p 3000:3000 app_jds_ok

--------------------- docker compose
docker-compose.yml
services:
  db_jds_ok:
    image: mysql:8.4
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: hamburgeria
    ports:
      - "127.0.0.1:3320:3306"
    volumes:
      - voldb_jds_ok:/var/lib/mysql
      - ./db/db.sql:/docker-entrypoint-initdb.d/01-db.sql:ro
    networks:
      - net_jds_ok
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1", "-P", "3306", "-uroot", "-proot"]
      interval: 5s
      timeout: 5s
      retries: 20
      start_period: 20s


  app:
    build: .
    restart: unless-stopped
    ports:
      - "3000:3000"
    env_file:
      - .env-developer
    networks:
      - net_jds_ok
    depends_on:
      db_jds_ok:
        condition: service_healthy

volumes:
  voldb_jds_ok:
    external: true
    name: jwt-database-sql-ok_voldb_jds_ok

networks:
  net_jds_ok:


per avviare:
docker compose up -d --build

per distruggere e riavviare:
docker compose down
docker compose up -d --build
docker compose logs -f app

