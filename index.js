// Get color Console Libary
require('pretty-console-colors');

// Show pretty console logs
console.log('👋 Log: Hi from NodeJS');

// Include dependences
const fs = require('fs');
const Koa = require('koa');
const serve = require('koa-static');
const Router = require('@koa/router');
const multer = require('@koa/multer');

const app = new Koa();
const router = new Router();
const upload = multer();

// Function for create file static with filename and content.
const saveFile = async (file) =>
  new Promise((resolve, reject) =>
    fs.writeFile('./src/uploads/' + file.originalname, file.buffer, (err) =>
      err ? reject('An error occurred: ' + err.message)
          : resolve({ uploaded: true })));

// Endpoint Upload.
router.post(
  '/upload',
  upload.single('photo'),
  async (ctx) => {
    // Control for get file on request.
    if (
      !ctx.request.file
    ) ctx.throw('Cannot find file on request');
    
    // Try create local file with content.
    try {
      ctx.body = await saveFile(ctx.request.file);
    } catch (err) {
      console.log(err);
      ctx.throw(err, 500);
    }
  }
);

// Declare Static Folder.
app.use(serve('./src'));

// add the router to our app
app.use(router.routes());
app.use(router.allowedMethods());
 
// Run
app.listen(8080);