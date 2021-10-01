var connect = require('connect');
var http = require('http');
var bodyParserJson = require('body-parser').json;

var app = connect();

app.use((req, res, next) => {
    req.pause()
    req.resume()
    next()
});

const Router = require("router");
const router = new Router();

const innerRouter = new Router();

innerRouter.use((req, res, next) => {
    next();
})

// Comment this line to prevent the issue from happening
router.use(innerRouter);

var bodyParserJson = require("body-parser").json();

router.use(bodyParserJson)

router.use((req, res, next) => {
    if (req.url !== "/api/foo" || req.method !== "POST") {
        next();
    } else {
        console.log(req.body);
        res.end(JSON.stringify({"ok": true}));
    }
});

app.use(router);

http.createServer(app).listen(3000, async () => {
    console.log("Server listening on 3000");

    const fetch = require("node-fetch");

    const response = await fetch('http://localhost:3000/api/foo', {
        method: 'post',
        body: JSON.stringify({a: 1}),
        headers: {'Content-Type': 'application/json'}
    });
    console.log(await response.json());

    process.exit(0);
});
