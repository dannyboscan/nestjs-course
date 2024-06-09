import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeAPIResponse } from './interfaces/pokeapi-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {
	private readonly axios: AxiosInstance = axios;

	constructor(private readonly pokemonService: PokemonService) {}

	async seedDb() {
		const { data } = await this.axios.get<PokeAPIResponse>(
			'https://pokeapi.co/api/v2/pokemon?limit=6',
		);

		const result: CreatePokemonDto[] = data.results.map((poke) => {
			const parts = poke.url.split('/');
			const pokemonId = +parts[parts.length - 2];

			return { name: poke.name, no: pokemonId };
		});
		return result;
	}
}
