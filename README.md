# cms-api

cms-api is web application that lets users perform registration/login as well as manage (BREAD operations) their data and data dates. 

##### This is one of my Hacktiv8's project using:
- Node.js v6+
- Express
- MongoDB
- Mongoose
- JQuery and Ajax
- Passport and passport-local

## Installation
- Clone the repo: `git clone https://github.com/tevinstein/cms-api.git`
- Install packages: `npm install`
- Start the server: `npm start`

## Restful APIs

| URL       | Method | Description     |
|-----------|--------|-----------------|
| / | GET | Shows index page  |
| /login    | GET    | Shows login page |
| /login     | POST   | Logs in user |
| /signup | GET    | Shows sign up page  |
| /signup | POST | Creates user |
| /api/home | GET | Shows home page |
| /api/logout | GET | Logs out user  |

| URL       | Method | Description     |
|-----------|--------|-----------------|
| /api/datas    | GET    | Shows all data |
| /api/datas     | POST   | Creates a data  |
| /api/datas/:id | GET    | Shows a data    |
| /api/datas/:id | PUT | Deletes a data  |
| /api/datas/:id | DELETE | Deletes a data  |

| URL       | Method | Description     |
|-----------|--------|-----------------|
| /api/datadates    | GET    | Shows all date data |
| /api/datadates     | POST   | Creates a date data  |
| /api/datadates/:id | GET    | Shows a date data    |
| /api/datadates/:id | PUT | Deletes a date data  |
| /api/datadates/:id | DELETE | Deletes a date data  |

## Screenshots

[![index](http://i.imgur.com/yHt3xcw.png "index")](http://i.imgur.com/yHt3xcw.png "index")

[![sign up/login](http://i.imgur.com/Xp57G1i.png "sign up/login")](http://i.imgur.com/Xp57G1i.png "sign up/login")

[![homepage](http://i.imgur.com/hlZhQMv.png "homepage")](http://i.imgur.com/hlZhQMv.png "homepage")