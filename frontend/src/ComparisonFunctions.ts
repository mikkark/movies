import { SortDirection } from "@material-ui/core";
import { IMovie } from "./Types";

/* start copy-paste from MaterialUI demos */
export const descendingComparator = (a: IMovie, b: IMovie, orderBy: keyof IMovie) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export const getComparator = (orderDirection: SortDirection, orderBy: keyof IMovie) => {
    return orderDirection === 'desc'
        ? (a: IMovie, b: IMovie) => descendingComparator(a, b, orderBy)
        : (a: IMovie, b: IMovie) => -descendingComparator(a, b, orderBy);
}

/* end copy-paste from MaterialUI demos */ 