# Genetic Scoring Platform Frontend Application

The Genetic Scoring Platform Frontend is a React JS based web application that provides an interface for users to interact with the genetic scoring platform. It connects to backend services via a `Backend for Frontend (BFF)` layer, ensuring secure and streamlined communication. The application also facilitates authentication by initiating the `Life Science AAI` login process through the BFF, enabling users to access platform features seamlessly.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed the appropriate version of [Node.js and npm](https://nodejs.org/). Developed & tested on version node: v21.6.1, npm: 10.2.4. 
- You have a basic understanding of JavaScript and React.
- Before you run the application make sure Backend for Frontend (BFF) & all required Microservices (file-handler, pipeline-manager & user-manager) are running on their default port.
- Additional step [optional]: You can make config changes in `.env.development` file if required.

## Getting started

Follow these steps to set up, build, and run the application:

### 1. Run the following command to clone the repository
   ```bash
   git clone https://github.com/ebi-gdp/geneticscores-platform-frontend.git
   ```
### 2. Navigate to the project's root directory
   ```bash
   cd geneticscores-platform-frontend
   ```
### 3. Install dependencies
   The project uses npm to manage dependencies. Install them by running
   ```bash
   npm install
   ```
   This will download and install all required packages specified in the `package.json` file.
### 4. Start the application
   To run the development server
   ```bash
   npm start
   ```
   By default, the application will be available at
   ```bash
   http://localhost:3000/bff/dev/ui
   ```
   However, to match the default BFF service configuration, update the URL to
   ```bash
   http://localhost:8090/bff/dev/ui
   ```
### 5. Adjust port settings if required
   The BFF service by default runs on port `8090`. The routing configuration for the frontend has been added in the `BFF`. If you have modified the `BFF` settings, update the frontend URL accordingly.

---

## Understanding `package.json`

The `package.json` file is a key configuration file for a Node.js project. It contains:

- **Project metadata** (name, version, description)
- **Dependencies** (libraries required for the application)
- **Scripts** (commands to build, test, and run the project)

### Key scripts in `package.json`

| Command            | Description                                      |
|--------------------|--------------------------------------------------|
| `npm install`     | Installs all dependencies listed in `package.json`. |
| `npm start`       | Starts the development server.                   |
| `npm run build`   | Builds the application for production.            |
| `npm test`        | Runs the test suite.                             |

---

## Building the application

For production deployment, run

```bash
npm run build
```

This generates an optimized build inside the `build/` directory. The generated files can be deployed to a web server or cloud hosting service.

## Deployments
Currently, deployment is being handled via `Gitlab` CI/CD. Details steps are defined at [Deploy using Gitlab](https://www.ebi.ac.uk/seqdb/confluence/display/GDP/Deploy+Frontend).
