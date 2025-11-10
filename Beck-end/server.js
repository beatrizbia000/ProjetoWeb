require('dotenv').config();
const express = require('express');
const cors = require('cors');
const allRoutes = require('./routes'); 

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors()); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', allRoutes);


app.get('/', (req, res) => {
  res.send('API de Agendamento está no ar!');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na URL http://localhost:${PORT}`);
});