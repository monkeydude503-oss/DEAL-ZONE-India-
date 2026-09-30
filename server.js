const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const products = [
  {id:1,name:"Wireless Headphones",category:"Electronics",price:1499,oldPrice:2999,discount:50,seller:"Amazon",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",url:"https://www.amazon.in/"},
  {id:2,name:"Smart Watch",category:"Mobiles & Accessories",price:1999,oldPrice:3999,discount:50,seller:"Flipkart",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",url:"https://www.flipkart.com/"},
  {id:3,name:"Running Shoes",category:"Fashion",price:1299,oldPrice:2499,discount:48,seller:"Meesho",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",url:"https://www.meesho.com/"},
  {id:4,name:"Kitchen Essentials Set",category:"Home & Kitchen",price:799,oldPrice:1599,discount:50,seller:"Amazon",image:"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80",url:"https://www.amazon.in/"}
];

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.get("/api/products",(req,res)=>{
  const q=(req.query.q||"").toLowerCase();
  const category=req.query.category||"All";
  res.json(products.filter(p=>(!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) && (category==="All" || p.category===category)));
});

app.get("/go/:id",(req,res)=>{
  const p=products.find(x=>x.id===Number(req.params.id));
  if(!p) return res.status(404).send("Deal not found");
  res.redirect(p.url);
});

app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`DEAL ZONE INDIA running on ${PORT}`));