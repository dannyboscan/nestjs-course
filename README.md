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

5. Llenar Base de Datos por medio del seed
```shell
curl -o /dev/null http://localhost:9000/api/seed/
```

## Stack utilizado
* MongoDB (mongodb://localhost:27018/nest-pokemon)
* NestJS


### License

Nest is [MIT licensed](LICENSE).
