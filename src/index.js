
const express = require('express')
const app = express()

const port = 3000

app.use(function(req, res, next) {
    if (!req.headers["x-forwarded-user"]) {
      return res.status(403).json({ error: 'No credentials sent!' });
    }
    next();
  });

app.get('/r/:formID', (req, res) => {
  res.redirect(`https://forms.gatrobe.de/s/${req.params.formID}?userId=${req.headers["x-forwarded-user"]}`);
})

app.get('/redirect', (req, res) => {

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})