import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { ReactElement, useContext, useEffect } from 'react'
import { MoviesContext } from './App'

export default function CategoriesList(): ReactElement {
    const moviesContext = useContext(MoviesContext);

    return (
        <>
            <Typography>Categories!</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        {moviesContext.categories.map((category) => (
                            <TableRow key={category.id} hover={true}>
                                <TableCell component="th" scope="row" onClick={() => moviesContext.onSelectCategory(category.id)}>
                                    {category.friendlyName}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
