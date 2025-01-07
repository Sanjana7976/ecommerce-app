const express = require('express');
const colors = require('colors'); 
const dotenv = require('dotenv');
const connectDB = require('./config/db.js'); 
const authRoutes = require('./routes/authRoute.js'); 
const categoryRoutes = require('./routes/categoryRoute.js')
const productRoutes = require('./routes/productRoute.js')
const cartRoutes = require('./routes/cartRoute.js')
const cors = require('cors');

dotenv.config(); 
connectDB(); 
const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart',cartRoutes)


app.get("/", (req, res) => {
    res.send("<h1>Welcome to e-commerce app</h1>");
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`.bgMagenta);
});
