const express = require('express');
const bodyParser = require('body-parser');
const configRoutes = require('./routes/config');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/config', configRoutes);
app.use(express.static('client/public'));

app.listen(port, () => {
  console.log(`Server manager listening on port ${port}`);
});
