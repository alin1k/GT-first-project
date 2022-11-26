import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import * as dotenv from 'dotenv';

import home from "./routes/home-page.js";
import products from './routes/products.js';
import cart from './routes/cart.js';



const app = express();
dotenv.config()
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use('/', home);
app.use('/products', products);
app.use('/cart', cart);

mongoose.connect(MONGO_URL , {useNewUrlParser: true})
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`server started on port ${PORT}`);
        })
    })
    .catch(err=> console.log(err));
