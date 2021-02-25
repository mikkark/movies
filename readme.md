Read me first - running instructions
====================================
1 Pre-requisites
-----------------

* Azure Functions tools (crossplat)
* Node and NPM
* The following settings files:

  * Frontend: 
    * File: .env.local
    * Contents: REACT_APP_API_URL=http://localhost:7071/api

  * Backend:
    * File: local.settings.json
    * Contents:
	> {
	>	"IsEncrypted": false,
	>	"Host": {
	>		"CORS": "*"
	>	},
	>	"Values": {
	>		"FUNCTIONS_WORKER_RUNTIME": "node",
	>		"AzureWebJobsStorage": ""
	>	}
	> }

2 With VS Code
---------------
There is a workspace file in the root directory. Open the root directory in VS Code and it should pick up the workspace file and ask to open it for you. Open it. 

Running the app now should be as simple as pressing F5 (your shortcuts may vary) which (should) start the workspace launch configuration. To be safe, select the workspace launch configuration from the VS Code Run menu and run it. This will run frontend (with NPM) and backend (with Azure Functions CLI)

3 Without VS Code
------------------
You can run the frontend with your usual "npm run start" (or yarn) command.

The backend needs Azure Functions tools and can be run with the usual "func start" command.
