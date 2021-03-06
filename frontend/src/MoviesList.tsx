import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, SortDirection, Card, Popover } from '@material-ui/core'
import React, { ReactElement, useContext, useState } from 'react'
import { MoviesContext } from './App'
import { getComparator } from './ComparisonFunctions';
import MoviesTableHeadWithSorting from './MoviesTableHeadWithSorting';
import { IMovie } from './Types';

export default function MoviesList(): ReactElement {
    const moviesContext = useContext(MoviesContext);
    const [orderBy, setOrderBy] = useState<keyof IMovie>("id");
    const [orderDirection, setOrderDirection] = useState<SortDirection>("asc");
    const [currentMovie, setCurrentMovie] = useState<IMovie | null>(null);

    const filterFn = (movie: IMovie) => {
        if (moviesContext.selectedCategoryId === "") {
            return true;
        }

        if (moviesContext.selectedCategoryId === movie.category) {
            return true;
        }

        return false;
    };

    const handleSortRequested = (property: keyof IMovie) => {
        const isAsc = orderBy === property && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (id: string) => (event: any) => {
        const realCall = async (event: any, id: string) => {
            const res = await fetch(`${process.env["REACT_APP_API_URL"]}/movie/${id}`);

            const movie = await res.json();
                        
            setCurrentMovie(movie);
        }

        setAnchorEl(anchorEl ? null : event.currentTarget);

        realCall(event, id);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentMovie(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'transitions-popper' : undefined;

    return (
        <>
            <Typography>Movies!</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <MoviesTableHeadWithSorting orderBy={orderBy} order={orderDirection} onRequestSort={handleSortRequested} />
                    <TableBody>
                        {moviesContext.movies.filter(filterFn).sort(getComparator(orderDirection, orderBy)).map((movie) => (
                            <TableRow key={movie.id} hover={true} onClick={handleClick(movie.id)}>
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

            { currentMovie &&
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Card style={{"width": "30em"}}>
                        <Typography variant="h3">{currentMovie.title}</Typography>
                        <Typography variant="h5">Categories:</Typography>
                        <Typography>{currentMovie.genres.reduce((prev, curr) => (prev === "" ? prev: prev + ", ") + curr, "")}</Typography>
                        <Typography variant="h5">Actors:</Typography>
                        {
                            currentMovie.actors.map(actor => {
                                return <Typography>{actor}</Typography>
                            })
                        }
                        <img src={currentMovie.posterurl} alt="Movie poster"></img>
                    </Card>
                </Popover>
            }
        </>
    )
}
