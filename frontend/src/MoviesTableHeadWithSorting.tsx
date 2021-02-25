import { SortDirection, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React, { ReactElement } from 'react'
import { IMovie } from './Types';

/*

	This component more or less copy-paste from MaterialUI demos.

*/

interface Props {
	orderBy: keyof IMovie,
	order: SortDirection,
	onRequestSort: (property: keyof IMovie) => void
}

interface IHeaderCell {
	id: keyof IMovie,
	label: string
}

const headerCells: IHeaderCell[] = [
	{ id: "id", label: "Id" },
	{ id: "title", label: "Title" },
	{ id: "category", label: "Category" }
];

export default function MoviesTableHeadWithSorting(props: Props): ReactElement {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property: keyof IMovie) => {
		onRequestSort(property);
	};

	return (
		<TableHead>
			<TableRow>
				{headerCells.map((headerCell) => (
					<TableCell
						key={headerCell.id}
						sortDirection={orderBy === headerCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headerCell.id}
							direction={orderBy === headerCell.id ? (order === false ? undefined : order) : 'asc'}
							onClick={() => createSortHandler(headerCell.id)}
						>
							{headerCell.label}
							{orderBy === headerCell.id ? (
								<span style={{ display: "none" }}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
