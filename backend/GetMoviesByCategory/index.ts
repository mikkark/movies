import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Movies } from "../Movie";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const category: string = req.query.category;

    if (category === undefined) {
        context.res = {
            status: 400,
            body: "No movie category given"
        };

        return;
    }

    const movies = Movies;

    const moviesByCategory = movies.filter(m => m.category === category);

    if (moviesByCategory.length === 0) {
        context.res = {
            status: 404,
            body: `No movie found in category ${category}`
        };

        return;
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: moviesByCategory
    };
};

export default httpTrigger;