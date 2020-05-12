## Tablo

#### Back End

> The backend is written in `express.js` and follows MVC pattern.
> `MySQL` is used for persistence.

Project structure:

* **controller** : This represents the controller configuration that acts as BLL of the projects.
* **migrations** : Import the sql file to setup database and tables in your `MySQL` client.
* **routes** : This folder contains the route (path) configuration of the project and maps each incoming request to corresponding controller.
* **utils** : Named by _utilities_, this contains `database.js` which is DB configuration of the project.
* **app.js** : This is the start point of this project.

Steps to setup this locally:

1. From the project root, navigate to `Backend`.
2. Run `npm install` to install dependencies.
3. Update `utils/database.js` to update connection details as per your DB configuration.
4. Run `npm start` to start server locally.

#### Front End

> The front end of this project is an `Angular` app with `bootstrap 4+` styling

Project structure:

* **error** : Global error components to be placed here.
* **navigation** : Header/footer components placed here.
* **services** : This folder contains domain specific services that conencts the application to API
* **AppRoutingModule.ts** : Routing configuration of the application  
* **http.interceptor.ts** : Application request inteceptor to have request making logic, authentication headers, token etc at one place.

Steps to setup this locally:

1. From the project root, navigate to `FrontEndClient`.
2. Run `npm install` to install dependencies.
3. Update `environments/environment.ts` file for the API endpoint URL. It is set to `http://localhost:3000` by default.
4. Run `ng serve` to start the application.

