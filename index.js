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

// Function for create file static with filename and content.
const upload = async (fileName, fileContent) =>
  new Promise((resolve, reject) =>
    fs.writeFile('./src/uploads/' + fileName, fileContent, (err) =>
      err ? reject('An error occurred: ' + err.message)
          : resolve({ uploaded: true })));

// Endpoint Upload.
app.use(Route.post('/upload', async (ctx) => {

  // Control for get fileName and fileContent props of body object.
  if (
    !ctx.request.body
    || !ctx.request.body.fileName
    || !ctx.request.body.fileContent
  ) ctx.throw('Cannot find fileName or fileContent props of body object.', 404);
  
  // Try create local file with content.
  try {
    console.info('/upload', ctx.request.body);
    ctx.body = await upload(ctx.request.body.fileName, ctx.request.body.fileContent);
  } catch (err) {
    ctx.throw(err, 500);
  }
}));

// Declare Static Folder.
app.use(serve('./src'));
 
// Run
app.listen(8080);