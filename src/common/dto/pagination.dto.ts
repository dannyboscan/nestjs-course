import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
	@IsOptional()
	@Min(1)
	@IsInt()
	limit?: number;

	@IsOptional()
	@Min(0)
	@IsInt()
	offset?: number;
}
