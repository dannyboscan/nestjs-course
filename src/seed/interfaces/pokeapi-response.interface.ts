export interface PokeAPIResponse {
	count: number;
	next: string;
	previous: null;
	results: ResultData[];
}

export interface ResultData {
	name: string;
	url: string;
}
