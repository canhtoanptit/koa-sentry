const Koa = require('koa');
const app = new Koa();
const Raven = require('raven');
Raven.config('https://xxxx@sentry.io/1217590').install();
const fs = require('fs');

app.use(async ctx => {
    makeError();
    ctx.body = 'hello world';
});

function makeError() {
    try {
        if (fs.existsSync('does-not-exist.txt')) {
            const stream = fs.createReadStream('does-not-exist.txt');
        } else {
            console.log('here i am');
        }
        console.log('send error: ', abc.x);
    } catch (e) {
        Raven.captureException(e);
    }
}

app.listen(3000);