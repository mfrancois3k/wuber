import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

const app = express();
const formId = process.env.CONVERTKIT_FORM_ID;
const apiUrl = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(`__dirname`+ './public'));
const __dirname = new URL('.', import.meta.url).pathname;

dotenv.config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });



app.post('/subscribe', async (req, res) => {
  const { email, name } = req.body;
  try {
    const response = await axios.post(apiUrl, {
      api_key: process.env.CONVERTKIT_API_KEY,
      email_address: email,
      first_name: name,
      status: 'subscribed',
    });
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error subscribing' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



if (process.env.NODE_ENV) {
    dotenv.config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
   });
   
   } else {
    dotenv.config();
   }
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} and listening on port ${port}`);
});
