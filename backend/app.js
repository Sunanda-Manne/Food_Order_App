import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;
  console.log(orderData);

  if (orderData === null || orderData.items === null || orderData.items == []) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer['full-name'] === null ||
    orderData.customer['full-name'].trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  try {
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    let allOrders = [];
    if (orders.trim() !== '') {
        allOrders = JSON.parse(orders);
    }
    
    const newOrder = {
        ...orderData,
        id: (Math.random() * 1000).toString(),
    };
    allOrders.push(newOrder);
    
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
    res.status(201).json({ message: 'Order created!' });
} catch (error) {
    console.error('Error handling orders:', error);
    res.status(500).json({ message: 'Internal server error' });
}
});

app.listen(3000);
