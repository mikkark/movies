export interface IMovie {
	id: string,
	title: string,
	category: string
}

export interface ICategory {
	id: string,
	friendlyName: string
}

export interface IMoviesContext {
	movies: IMovie[],
	categories: ICategory[],
	selectedCategoryId: string,
	onSelectCategory: (id: string) => void
};