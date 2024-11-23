# IGS4EU - Genetic Scoring Platform Frontend Application

## Description

INTERVENE genetic scoring platform frontend application developed in ReactJS.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed the appropriate version of [Node.js and npm](https://nodejs.org/). Developed & tested on version node: v21.6.1, npm: 10.2.4. 
- You have a basic understanding of JavaScript and React.
- Before you run the application make sure Backend for Frontend (BFF) & all required Microservices (file-handler, pipeline-manager & user-manager) are running on their default port.
- Additional step [optional]: You can make config changes in .env.development file if required.

## Run application

To run application, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ebi-gdp/igs4eu-platform-frontend.git
2. Before you run the application, Navigate to project's root directory:
   ```bash
   npm start
   ```
3. By default application will launch at
   ```bash
   http://localhost:3000/bff/dev/ui
   ```
   change this url to
   ```bash
   http://localhost:8090/bff/dev/ui
   ```
   port 8090 is the default port of BFF service, routing configuration for frontend has been added in BFF; 
   we are accessing frontend via BFF. Change port according to BFF config if default settings has been changed.
