const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Vulnerability routes
const xss = require('./routes/cross-site-scripting');
const sqli = require('./routes/sql-injection');
const ci = require('./routes/command-injection');
const insecureDeserialization = require('./routes/insecure-deserialization');
const pathTraversal = require('./routes/path-traversal');
const ssrf = require('./routes/ssrf');
const unvalidatedRedirect = require('./routes/unvalidated-redirect');
const prototypePollution = require('./routes/prototype-pollution');
const nosqlInjection = require('./routes/nosql-injection');
const insecureRandomness = require('./routes/insecure-randomness');
const brokenAccessControl = require('./routes/broken-access-control');
const appFeatures = require('./routes/app-features');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Mount vulnerability routes
app.use(xss);
app.use(sqli);
app.use(ci);
app.use(insecureDeserialization);
app.use(pathTraversal);
app.use(ssrf);
app.use(unvalidatedRedirect);
app.use(prototypePollution);
app.use(nosqlInjection);
app.use(insecureRandomness);
app.use(brokenAccessControl);
app.use(appFeatures);

app.get('/', (req, res) => {
  res.render('index', { title: 'Workshop App Demo' });
});

app.listen(port, () => {
  console.log(`Workshop App Demo listening at http://localhost:${port}`);
});
