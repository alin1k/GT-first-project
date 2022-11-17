import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import * as dotenv from 'dotenv';

import home from "./routes/home-page.js";
import products from './routes/products.js';
import cart from './routes/cart.js';



const app = express();
dotenv.config();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.DB_PASSWORD;

app.use('/', home);
app.use('/products', products);
app.use('/cart', cart);

mongoose.connect('mongodb+srv://alin-olt:'+ PASSWORD +'@cluster0.hb213d0.mongodb.net/storeDB', {useNewUrlParser: true})
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`server started on port ${PORT}`);
        })
    })
    .catch(err=> console.log(err));
