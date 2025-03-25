
const express = require('express')
const app = express()

const port = 3000

app.use(function(req, res, next) {
    if (!req.headers["x-forwarded-user"]) {
      return res.status(403).json({ error: 'No credentials sent!' });
    }
    next();
  });
//#app.get('/r/:formID', (req, res) => {
//  res.redirect(`https://forms.gatrobe.de/s/${req.params.formID}?userId=${req.headers["x-forwarded-user"]}`);
//})

app.get('/r/:surveyId', async (req, res) => {
  const surveyId = req.params.surveyId;
  const uid = req.query.uid || 'default_uid';

  try {
    const surveyResponse = await axios.get(`https://forms.gatrobe.de/s/${surveyId}`);
    const surveyHtml = surveyResponse.data;

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Formbricks Survey - ${surveyId}</title>
          <style>
              body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f4f4f9; }
              .survey-container { width: 80%; height: 80vh; overflow-y: auto; box-shadow: 0px 4px 8px rgba(0,0,0,0.1); border-radius: 10px; padding: 20px; background-color: white; }
          </style>
          <script src="https://forms.gatrobe.de/js/sdk.js"></script>
      </head>
      <body>
          <div class="survey-container">
              ${surveyHtml}
          </div>
          <script>
              // Set the user ID using the Formbricks SDK
              const uid = '${req.headers["x-forwarded-user"]}';
              formbricks.setUserId(uid);
              console.log("User ID set via Formbricks SDK:", uid);
          </script>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error fetching the survey.');
  }
});

app.get('/redirect', (req, res) => {

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})