import { AzureFunction, Context, HttpRequest } from "@azure/functions"

/*

    NOTE: This is not meant to be a public-facing endpoint. This was used once to generate ID's for the movies in the JSON list.

*/

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const moviesJson = context.bindings.moviesBlob;

    const moviesWithIds = (moviesJson as any[]).map((movie, index) => {
        return {
            ...movie,
            id: index + ""
        }
    });
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "OK"
    };

    context.bindings.moviesBlobWithIds = moviesWithIds;
};

export default httpTrigger;