import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Movies } from "../Movie";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const moviesJson = context.bindings.moviesBlob;

    const moviesWithCategory = (moviesJson as any[]).map(movie => {
        return {
            id: movie.id,
            title: movie.title,
            category: movie.genres[0].toLowerCase()
        };
    });

    if (moviesWithCategory !== undefined) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: moviesWithCategory
        };
    }
    else {
        // Fallback to hard-coded data if no blob found
        context.log("Falling back to hardcoded movie data")

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: Movies
        };
    }
};

export default httpTrigger;