import express from "express";
import data from './data.js';

const app = express();

//--Route:
app.get('/', ()=>{
  console.log('Hi Master');;
});
app.get('/api/products', (req, res)=>{
    res.send(data.products);
})

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log('Great!!,...Server running at http://localhost:'+port);
})