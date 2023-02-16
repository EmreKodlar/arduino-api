var express = require("express"); // Express npm ile kur hepsini
var mongoose = require('mongoose'); // mongoDB
var dotenv = require('dotenv'); // dış çevre ile bağlantı
var userRouter = require('./Routers/userRouter.js'); // yönlendirme işlemleri User için
var workRouter = require('./Routers/workRouter.js'); // yönlendirme işlemleri work için
var degerlerRouter = require('./Routers/degerlerRouter.js'); // yönlendirme işlemleri work için
var odemeRouter = require('./Routers/odemeRouter.js'); // yönlendirme işlemleri work için
var cors = require('cors'); // api koruma
var bodyparser = require('body-parser'); // api koruma

dotenv.config(); // oluşturduğumuz DB'nin çalışabilmesi için gerekli

const app = express();

app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use(express.json());
app.use("/users", userRouter); //impor ettikten sonra, expres ile kullanmak lazım
app.use("/works", workRouter); //impor ettikten sonra, expres ile kullanmak lazım
app.use("/odeme", odemeRouter); //impor ettikten sonra, expres ile kullanmak lazım
app.use("/degerler", degerlerRouter); //impor ettikten sonra, expres ile kullanmak lazım



app.get("/", (req,res)=>{
  res.send('Hello World!');
});
app.listen(5000, () => {
  // connect to database
  mongoose
    .set("strictQuery", false) // bunu eklemezsek bağlanıyordu ama yine de bu kodu eklememizi istedi VS Code IDE'si
    .connect(process.env.DB_CONNECTION_STRING) // .env içinde verilen string'in adı yazılacak...
    .then(() => console.log("connected to db"))
    .catch((error) => console.log(error));
});