import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Movies } from "../Movie";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const moviesJson = context.bindings.moviesBlob

    const id: string = req.params.id;

    if (id === undefined) {
        context.res = {
            status: 400,
            body: "No movie ID given"
        };

        return;
    }

    const movies = moviesJson ?? Movies;

    const movieById = movies.filter(m => m.id === id);

    if (movieById.length === 0) {
        context.res = {
            status: 404,
            body: "No movie found by ID"
        };

        return;
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: movieById[0]
    };

};

export default httpTrigger;