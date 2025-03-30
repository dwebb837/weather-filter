# Weather Filtering Application
```
Build a full-stack weather app with filtering
Frontend (React, Typescript)
⠀⠀◦ Create a filter form with inputs for city (required) and country (optional)
⠀⠀◦ Send form data to the backend on submit and retrieve relevant data
⠀⠀◦ Display weather information including temperature, humidity, and condition icon
⠀⠀◦ Show filter history retrieved from the backend
Backend (Node, Express, Typescript or any other backend framework)
⠀⠀◦ Create a /weather endpoint that accepts city and country query parameters
⠀⠀◦ Call a public weather API (OpenWeatherMap or WeatherAPI) with the received filters
⠀⠀◦ Parse and return relevant weather data to the frontend
⠀⠀◦ Store submitted filters in an in-memory array (no database)
⠀⠀◦ Create a /history endpoint that returns the in-memory filter history
DevOps
⠀⠀◦ Create Dockerfile for both frontend and backend for local development
⠀⠀◦ Use docker-compose to run the full stack locally
```
## Tasks
1. **API Endpoints:**
   - **Get Weatjer Data:** An endpoint to get weather information for city. (temperature, humidity, icon)
     - **Endpoint:** `GET /api/weather`
     - **Response:** 200 OK on success with a JSON response containing weather data.
   - **Filter History Data:** An endpoint to retrieve the history of filters being applied.
     - **Endpoint:** `GET /api/history`
     - **Response:** 200 OK on success with a JSON resopnse containig history filter data.
2. **UI:**
   - Two input box for city (required) and country (optional)
   - Weather Information. (temperature, humidity, icon)
   - Show city and country historical filters being applied.

## Environment
- OS: Windows 10
- Node: v20.10.0

## Tech Stacks
- Vite + Express
- TypeScript
- TailwindCSS
- React Json Viewer

## Steps to setup development environment
- Install node modules
  ```shell
  npm install
  ```
- Run the project
  ```shell
    npm run dev
  ```

  This will host the project on http://localhost:3000
