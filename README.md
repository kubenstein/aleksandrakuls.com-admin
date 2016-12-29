# aleksandrakuls.com Admin Panel
The Admin Panel for Aleksandra Kuls Home Page.

Related Project: [Aleksandra Kuls Home Page](https://github.com/kubenstein/aleksandrakuls.com).

### Installation & Development:
* npm i
* npm run dev

### Tests:
* npm run tests:e2e

### Deployment (local):
* npm run build

### Deployment (heroku):
* normal git push

# Interesting aspects of the Project
- Simplified way of setting all external services (webpack, mongoDB, express server, linter) as a [single dev console](https://twitter.com/j_niewczas/status/811337345769279488).
- The Project is a React-Redux based web app.
- Server uses a MongoDb as a underlaying database.
- Part of the app uses WebSockets as communication channel.
- Server does Heroku git redeployment using NodeGit lib.