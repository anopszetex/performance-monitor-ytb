# performance-monitor-ytb
An application to monitor Web APIs performance using the JS Decorators proposal with no frameworks.
### ref: [**youtube video**](https://youtu.be/CS03W_YSdJc)

## Project Setup

- [Node.js v16.17.0+](https://nodejs.org/en/download/)
- [NPM 8.15.0+](https://docs.npmjs.com/cli/v8/commands/npm-install)

### Yarn
```sh
# install dependencies
$ yarn install

# server without hot-reload
$ yarn start

# server with hot-reload at localhost:5000
$ yarn dev
```

### NPM
```sh
# install dependencies
$ npm install

# server without hot-reload
$ npm run start

# server with hot-reload at localhost:5000
$ npm run dev
```
For more details, check out the `package.json`

## With Ui, After Initialize Server
```sh
# to sent data
$ npm run curl:post

# spot data and measure performance of code
$ npm run curl:get
```
> or
```sh
# to sent data
$ yarn curl:post

# spot data and measure performance of code
$ yarn curl:get
```
### You should see results similar to:
![image](https://user-images.githubusercontent.com/31970167/191798334-846aba30-1d4a-47d2-a655-2aa95a1ae5e7.png)


## Without Ui, Before Initialize Server
```sh
# start server
$ npm run start:noui

# to sent data
$ npm run curl:post

# spot data and measure performance of code
$ npm run curl:get
```
> or
```sh
# start server
$ yarn start:noui

# to sent data
$ yarn curl:post

# spot data and measure performance of code
$ yarn curl:get
```

### You should see results similar to:
![image](https://user-images.githubusercontent.com/31970167/191798235-59c38fb2-c711-4fb0-bdd5-742f0970a11d.png)

