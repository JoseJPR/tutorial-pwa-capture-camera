// Get color Console Libary
require('pretty-console-colors');

// Show pretty console logs
console.log('👋 Log: Hi from NodeJS');

// Include dependences
const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();

// Declare root folder static
app.use(serve('.'));
 
// Run
app.listen(8080);