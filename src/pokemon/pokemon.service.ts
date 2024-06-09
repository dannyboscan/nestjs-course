import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
	constructor(
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon>,
		private readonly configService: ConfigService,
	) {}

	async create(createPokemonDto: CreatePokemonDto) {
		createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
		try {
			const pokemon = await this.pokemonModel.create(createPokemonDto);
			return pokemon;
		} catch (error) {
			if (error.code === 11000)
				throw new BadRequestException(
					`Pokemon already exists in DB ${JSON.stringify(error.keyValue)}`,
				);
			else {
				console.error(error);
				throw new BadRequestException(error.message);
			}
		}
	}

	async seedPokemon(data: CreatePokemonDto[]): Promise<Array<Pokemon>> {
		await this.pokemonModel.deleteMany({});
		return await this.pokemonModel.insertMany(data);
	}

	async findAll(queryParams: PaginationDto) {
		const {
			limit = this.configService.get('pagination.limit', 20),
			offset = this.configService.get('pagination.offset', 0),
		} = queryParams;

		return await this.pokemonModel
			.find()
			.limit(limit)
			.skip(offset)
			.sort({ no: 'asc' })
			.select('-__v');
	}

	async findOne(q: string): Promise<Pokemon> {
		let pokemon: Pokemon;

		if (!isNaN(+q)) {
			pokemon = await this.pokemonModel.findOne({ no: q });
		} else if (isValidObjectId(q)) {
			pokemon = await this.pokemonModel.findById(q);
		} else {
			pokemon = await this.pokemonModel.findOne({ name: q });
		}

		if (!pokemon)
			throw new NotFoundException(
				`Pokemon with id, no or name "${q}" not found`,
			);

		return pokemon;
	}

	async update(id: string, updatePokemonDto: UpdatePokemonDto) {
		if (updatePokemonDto.name)
			updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

		try {
			const pokemon = await this.pokemonModel.findByIdAndUpdate(
				id,
				updatePokemonDto,
				{ new: true },
			);

			return pokemon;
		} catch (error) {
			console.error(error);
			if (error.code === 11000)
				throw new BadRequestException(
					`Duplicate key error key: ${JSON.stringify(error.keyValue)}`,
				);
			else throw new BadRequestException(error.message);
		}
	}

	async remove(id: string) {
		let documentDeleted: number;

		try {
			const { deletedCount } = await this.pokemonModel.deleteOne({
				_id: id,
			});
			documentDeleted = deletedCount;
		} catch (error) {
			throw new BadRequestException(error.message);
		} finally {
			if (documentDeleted === 0)
				throw new NotFoundException(
					`Pokemon with id '${id}' not found`,
				);
		}
	}
}
