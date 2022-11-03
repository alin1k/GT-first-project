import express from 'express';
import bodyParser from 'body-parser';

import home from "./routes/home-page.js";
import products from './routes/products.js';
import cart from './routes/cart.js';

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
const PORT = 3000;

app.use('/', home);
app.use('/products', products);
app.use('/cart', cart);

app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`);
});