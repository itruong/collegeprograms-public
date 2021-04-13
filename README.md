# Class Search Platform

The vision for this application was initially to provide organized information about scholarships and new grad and diversity corporate programs that are not widely known. This goal shifted to a broader scope to include all types of classes (such as fitness, recreational, educational, etc.) since we realized that there aren’t any resources that organize programs at the class level--you typically have to search for an organization first and browse their classes.

I started by translating initial page designs into functional domains, each with their own data models and responsibilities. These became the authentication, user account, and program services. To eliminate unnecessary early-stage overhead, the authentication service was implemented as a gateway to Firebase Authentication, which did the bulk of the work. The user account service handled interactions surrounding user profile information and linking authentication data. The program service dealt with the meat of the business logic and handled interactions with individual programs and user-saved programs. In addition, an Nginx proxy and an API gateway service were used to route incoming requests to the authentication service and, subsequently, to other services.

MongoDB and Mongoose were used to define the data schemas for persistent storage. In the programs service, Elasticsearch was used to provide full-text search indexes on multiple text fields. Node/Express were used in all services primarily because of familiarity and the ease of async programming.

The frontend was implemented in React/Redux and the Material UI component library. The user account pages allowed users to login and update profile information. The programs pages displayed a list of all programs that users could save and included search bar and filter components. Initially Redux wasn’t used, but as state began being shared across programs, filters, and account components, Redux provided a more robust state management solution.

## Setup and Installation

To run backend services with Docker Compose:
- ensure that a MONGO_CONNECTION connection string is specified in ```.env``` file and setup a firebase service account key in the auth service.
- run ```docker-compose up --build``` in the collegeprograms-backend directory to bring up the backend services

To run the frontend:
- run ```npm start``` in the collegeprograms-frontend directory to start the frontend

## Technologies Used
- React.js
- Node.js/Express.js
- Nginx
- MongoDB/Mongoose
- Docker/Docker Compose
- Elasticsearch
