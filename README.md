# CMarket (FE)
A fantasy-like item for e-commerce web application

## Introduction
CMarket is a one of my project-learn where I implement all of my knowledge using following tech stack. I plan to make this project as big as it can get along with what I've learned in software engineering as a full stack developer.

## 💻 Tech Stack
- Vue v3
- Vuetify
- Axios
- Postgre
- Pinia State Management

## 💡 Main Feature
- Advanced filtering & queries
- Catalog Browsing
  - Lazy load of catalog
  - Catalog Detail
- Auth
  - Email Confirmation
  - Role 
  - JWT Auth Guard & Refresh
  - Logout
  - Reset Password ***(To be implemented)***
- Item Purchase ***(To be implemented)***
- Payment Gateway ***(To be implemented)***
- Mail Notification ***(To be implemented)***
- User
  - Profile ***(To be implemented)***
  - Dashboard ***(To be implemented)***

## Pre requisite
- node v20.11.1 or above
- working .env file (see [below](###env))

### .env
As of the time of writing, env needed for this file follos :
```
VITE_API_URL = "API_URL" 
```
For reference, check the BE repo [here](https://github.com/Clovinlee/cmarket_backend_nest)

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

### Starting the Development Server

To start the development server, simply run this command
```
npm run dev
```

*As a side note, UI haven't been polished fully. Will do later*

---

## Reference Link
| CMarket Backend                                            | Link                                                | Note              |
|------------------------------------------------------------|-----------------------------------------------------|-------------------|
| [NestJS](https://github.com/Clovinlee/cmarket_backend_nest)              | `NestJS`                                      | Main backend with *full feature*                  |
| [Java Spring](https://github.com/Clovinlee/cmarket_backend_spring) | `Java Spring JPA`                                      | All feature *excluding authentication*                  |
| [Go Gin](https://github.com/Clovinlee/cmarket_backend)                     | `Go Gin`                                      | All feature *excluding authentication*                  |

# Application Diagram
Some reference to the project feature complexity

## User Login Sequence Diagram
![CMarket Login Sequence Diagram](https://raw.githubusercontent.com/Clovinlee/cportofolio/main/public/images/projects/cmarket_login_sequence_diagram.png)

## User Register Sequence Diagram
![CMarket Register Sequence Diagram](https://raw.githubusercontent.com/Clovinlee/cportofolio/main/public/images/projects/cmarket_register_sequence_diagram.png)

## User JWT Sequence Diagram
![CMarket JWT Sequence Diagram](https://raw.githubusercontent.com/Clovinlee/cportofolio/main/public/images/projects/cmarket_jwt_sequence_diagram.png)