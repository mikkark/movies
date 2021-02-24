import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { ReactElement, useContext } from 'react'
import { MoviesContext } from './App'
import { IMovie } from './Types';

export default function MoviesList(): ReactElement {
    const moviesContext = useContext(MoviesContext);

    const filterFn = (movie: IMovie) => {
        if (moviesContext.selectedCategoryId === "") {
            return true;
        }

        if (moviesContext.selectedCategoryId === movie.category) {
            return true;
        }

        return false;
    };

    return (
        <>
            <Typography>Movies!</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {moviesContext.movies.filter(filterFn).map((movie) => (
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
