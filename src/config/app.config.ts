import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
	NODE_ENV: Joi.string()
		.required()
		.valid('dev', 'prod', 'test')
		.default('env'),
	MONGODB_HOST: Joi.string().required(),
	MONGODB_NAME: Joi.string().default('pokemons'),
	PORT: Joi.number().default(9000),
	PAGINATION_LIMIT: Joi.number().default(20),
	PAGINATION_OFFSET: Joi.number().default(0),
});

export const envConfiguration = () => ({
	environment: process.env.NODE_ENV,
	port: process.env.PORT,
	database: {
		host: process.env.MONGODB_HOST,
		dbname: process.env.MONGODB_NAME,
	},
	pagination: {
		limit: process.env.PAGINATION_LIMIT,
		offset: process.env.PAGINATION_OFFSET,
	},
});
