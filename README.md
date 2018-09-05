# SnapshotJS - Website Screencapture Tool

SnapshotJS is a Vue.js full stack web application which allows users to input a URL
to any website, and it will generate a screenshot of the website.

## Features
- Works with most Vue.js, React.js, and Angular.js SPA sites.
- Works with most lazy-loaded sites (ex: www.latimes.com).
- Works in full screen (viewport) or full page mode screenshots.
- Multiple sizes to choose from (this also determines the full page mode's width dimension).
- Currently exports as a .jpeg file since .jpeg is smaller and no transparency is needed for such websites.
If you need a .png export, you'll have to find a tool online to convert the .jpeg to .png.

## Author

Eric Liang
- [Website](https://www.eric-liang.com)
- [Github](https://www.github.com/ewliang)

## Requirements

Here are the requirements to get this project running.
1. Node v7.6.0 or higher
2. NPM Package Manager
3. If you are a developer, it is preferable you understand Vue.js, Node.js, SCSS, and Express.js

## Setup and Installation

Here is the process to setup the project.
1. Clone the repository from [https://github.com/ewliang/SnapshotJS-Website-Screencapture-Tool.git](https://github.com/ewliang/SnapshotJS-Website-Screencapture-Tool.git)
2. Run "npm install" in snapshotjs-server folder via your command prompt.
3. Run "npm install" in snapshotjs-client folder via your command prompt.
4. Run "npm run dev" in snapshotjs-server folder to start the server at localhost:4000.
5. Run "npm run dev" in snapshotjs-client folder to start the client at localhost:3000.
6. Navigate to your browser and go to localhost:3000 and you can start using the webapp.

NOTE - You must have both the client and the server running at the same time. All changes made are automatically updated since the server's command "npm run dev" is powered by nodemon.

## Deployment

### Heroku Deployment Notes
- Make sure to have the following:
#### Environment Variables
- HOST 0.0.0.0
- NODE_ENV production
#### Buildpacks
- https://github.com/jontewks/puppeteer-heroku-buildpack.git (must be listed first)
- heroku/nodejs

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2018 © [Eric Liang](https://www.eric-liang.com).
