require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

const routesProducts = require('./routes/routesProducts');
const routesSales = require('./routes/routesSales');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routesProducts);
app.use('/sales', routesSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
