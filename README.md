# Project Documentation

## Introduction
This project is a Single Page Application (SPA) developed using Vue.js and TypeScript. It served as a great learning experience, as it was my first time working with TypeScript. Throughout the project, I discovered new techniques and approaches, and I'm open to feedback to improve my skills further.

## Requirements
To successfully run and work on this project, please ensure you have the following software installed:

- Node.js 12.13.0 or higher
- Vue.js 2.6
- npm 6.12.0

## Technologies Used
- Vue.js: The core framework used for building the SPA.
- TypeScript: Introduced to enhance the codebase with static typing and better tooling support.
- Quasar: Leveraged for its Q-table component, which facilitated pagination and simplified data handling for posts and users.
- Vuex: Employed to manage the state of the application and utilize localStorage for persistent storage of login data.

## Components

### SPA Header
The SPA Header component was created to provide navigation functionality. It offers a clean and simple interface for users to interact with the application.

### Post and User Listing
The Quasar Q-table component was utilized to display the list of posts and users. It provided easy pagination and efficient data handling. While the goal of the project didn't require separate components for the tables, I am familiar with creating custom components, and incorporating them would not have presented any issues.

### Storage Approach
To ensure login data persistence even after page refresh, I utilized localStorage within the Vuex store. This approach allowed me to store and retrieve the login status and user information. In a real-world scenario, session cookies or tokens generated by the server would be more secure and suitable for handling authentication.

### Improvements
One area where the application could be improved is in fetching the authors of each post. This functionality could have been better handled on the server-side if needed. By retrieving the author's information from the server, we could avoid unnecessary data duplication and ensure the latest author details are displayed.

### Conclusion
Developing this SPA project using Vue.js 2 and TypeScript was a fulfilling experience. It provided me with an opportunity to work with the specified technologies and align my approach accordingly. I focused on keeping the codebase clean, simple, and easy to maintain and upgrade. It allowed me to explore the capabilities of TypeScript in a Vue.js 2 project and leverage the power of the Quasar framework for efficient data handling. I look forward to incorporating feedback and continuing to enhance my skills in future projects.

As this was my first typescript project I would appreciate any suggestions on improving my code!


## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Build the app for production

```bash
quasar build
```

