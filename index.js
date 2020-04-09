// Get color Console Libary
require('pretty-console-colors');

// Show pretty console logs
console.log('👋 Log: Hi from NodeJS');

// Include dependences
const fs = require('fs');
const Koa = require('koa');
const serve = require('koa-static');
const Route = require('koa-route');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

// Use bodyParser Middleware.
app.use(bodyParser());

const upload = async (filename, image) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, image, (err) => {
      if (err) {
        console.error('Error: ', err);
        reject('An error occurred: ' + err.message);
      } else {
        resolve({
          uploaded: true
        });
      }
    });
  });
}

// Upload endpoint.
app.use(Route.post('/upload', async (ctx) => {
  if (
    !ctx.request.body
    || !ctx.request.body.image
  ) return ctx.throw('Cannot find image into body object.', 404);
  
  console.info('/upload', ctx.request.body);
  try {
    ctx.body = await upload(ctx.request.body.filename, ctx.request.body.image);
  } catch (err) {
    return ctx.throw('An error occurred: ' + err, 500);
  }
}));

// Declare root folder static.
app.use(serve('./src'));
 
// Run
app.listen(8080);