import express from "express";
import data from './data.js';

const app = express();

//--Route:
// app.get('/', ()=>{
//   console.log('Hi Master');;
// });

//--List Products
app.get('/api/products', (req, res)=>{
    res.send(data.products);
    // console.log(data.products);
})

//--Product Detail
app.get('/api/products/slug/:slug', (req, res)=>{
    const product = data.products.find(x=> x.slug === req.params.slug);
    if(product){
        res.send(product);
    }else{
        res.status(404).send.apply({message: 'Product not found'});
    }
})

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log('Great!!,...Server running at http://localhost:'+port);
})