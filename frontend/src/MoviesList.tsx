import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, SortDirection } from '@material-ui/core'
import React, { ReactElement, useContext, useState } from 'react'
import { MoviesContext } from './App'
import MoviesTableHeadWithSorting from './MoviesTableHeadWithSorting';
import { IMovie } from './Types';

export default function MoviesList(): ReactElement {
    const moviesContext = useContext(MoviesContext);
    const [orderBy, setOrderBy] = useState<keyof IMovie>("id");
    const [orderDirection, setOrderDirection] = useState<SortDirection>("asc");

    const filterFn = (movie: IMovie) => {
        if (moviesContext.selectedCategoryId === "") {
            return true;
        }

        if (moviesContext.selectedCategoryId === movie.category) {
            return true;
        }

        return false;
    };

    /* start copy-paste from MaterialUI demos */
    function descendingComparator(a: IMovie, b: IMovie, orderBy: keyof IMovie) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(orderDirection: SortDirection, orderBy: keyof IMovie) {
        return orderDirection === 'desc'
            ? (a: IMovie, b: IMovie) => descendingComparator(a, b, orderBy)
            : (a: IMovie, b: IMovie) => -descendingComparator(a, b, orderBy);
    }
    
    const handleSortRequested = (property: keyof IMovie) => {
        const isAsc = orderBy === property && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    /* end copy-paste from MaterialUI demos */
    
    return (
        <>
            <Typography>Movies!</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <MoviesTableHeadWithSorting orderBy={orderBy} order={orderDirection} onRequestSort={handleSortRequested} />
                    <TableBody>
                        {moviesContext.movies.filter(filterFn).sort(getComparator(orderDirection, orderBy)).map((movie) => (
                            <TableRow key={movie.id} hover={true}>
                                <TableCell component="th" scope="row">
                                    {movie.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {movie.title}
                                </TableCell>
                                <TableCell>{movie.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
