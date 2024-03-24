const express=require('express');
const app=express();
const dotenv=require('dotenv');
const morgan=require('morgan');
const connectDB=require('./config/db');
const authRouter=require('./routes/authRoutes');
const categoryRouter=require('./routes/categoryRoutes');
const productRouter=require('./routes/productRoutes');
const brandRouter= require('./routes/brandRoutes');
const orderRouter = require('./routes/orderRoutes');
const path = require("path");
const cors=require('cors');
// Load config
dotenv.config();

// Connect to database
connectDB();

// Dev logging middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build"))); // put this line of code in app.js

// Mount routers
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/brand',brandRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/order',orderRouter);
app.get('/',(req,res)=>{
    res.send('Hello World');
}
)



const port=process.env.PORT || 8080;

app.listen(port,()=>console.log(`Listening on ${process.env.DEV_MODE} mode on port ${port}...`));
