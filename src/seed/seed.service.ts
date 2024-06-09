import { Injectable } from '@nestjs/common';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeAPIResponse } from './interfaces/pokeapi-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
	constructor(
		private readonly pokemonService: PokemonService,
		private readonly http: AxiosAdapter,
	) {}

	async seedDb() {
		const data = await this.http.get<PokeAPIResponse>(
			'https://pokeapi.co/api/v2/pokemon?limit=600',
		);

		const createData: CreatePokemonDto[] = data.results.map((poke) => {
			const parts = poke.url.split('/');
			const pokemonId = +parts[parts.length - 2];

			return { name: poke.name, no: pokemonId };
		});

		const pokemonDb = await this.pokemonService.seedPokemon(createData);

		return pokemonDb;
	}
}
