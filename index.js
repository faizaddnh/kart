const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser= require('body-parser');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const paymentRouter = require('./routes/payment');
const port = process.env.PORT || 8000;


const app = express();
dotenv.config();


app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/payment', paymentRouter);


mongoose.connect(process.env.MONGODB_URI).then(() => {
    try {
        console.log('Database Connected')
    } catch (err) {
        console.log(err.message);
    };
});

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});



app.listen(port, () => {
    console.log('server running on port 8000 ');
});

