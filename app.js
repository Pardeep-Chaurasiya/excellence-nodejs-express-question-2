const express = require('express');
require('dotenv').config();
require('./config/db')();
const expressFileUpload = require('express-fileupload');

const app = express();

app.use(express.json());

require('./models/userSchema');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const addressRoute = require('./routes/addressRoutes');

app.use('/', userRoute);
app.use('/', authRoute);
app.use('/', addressRoute);

app.use(
  expressFileUpload({
    useTempFiles: true,
  }),
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.info(`Server started on port ${PORT}`);
});
