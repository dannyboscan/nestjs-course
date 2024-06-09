import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration, envValidationSchema } from './config/app.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfiguration],
			validationSchema: envValidationSchema,
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),
		MongooseModule.forRoot(process.env.MONGODB_HOST, {
			dbName: process.env.MONGODB_NAME,
		}),
		PokemonModule,
		CommonModule,
		SeedModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
