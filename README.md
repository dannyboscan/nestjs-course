<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Pokedex

## Ejecutar en desarrollo
1. Clonar el repositorio
2. ejecutar el siguiente comando para instalar las dependencias
```shell
yarn install
```

3. Tener Nest CLI instalado
```shell
npm i -g @nestjs/cli
```

4. Levantar la Base de datos (mongodb)
```shell
docker-compose up -d
```

5. Copiar el archivo ```.env.template``` a ```.env```
```shell
cp .env.template .env
```

6. Completar las variables de entornos definidas en el archivo ```.env```

7. Levantar proyecto en modo desarrollo
```shell
yarn start:dev
```

8. Llenar Base de Datos por medio del seed
```shell
curl -o /dev/null http://localhost:9000/api/seed/
```

## Stack utilizado
* MongoDB
* NestJS


### License

Nest is [MIT licensed](LICENSE).
