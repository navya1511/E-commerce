require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()


//security 
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const path=require("path")
const connectDB = require("./db/connect")
const userRouter = require("./routes/user")
const categoryRouter = require("./routes/category")
const uploadRouter = require("./routes/upload")
const productRouter = require("./routes/product")
const paymentRouter = require("./routes/payments")


app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))
app.use("/user" , userRouter)
app.use("/api" , categoryRouter)
app.use("/api" , uploadRouter)
app.use("/api" , productRouter)
app.use("/api" , paymentRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

const start = async ()=>{
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port , console.log(`server is listening on ${port} ...`))
    } catch (error) {
        console.log(error);
    }
}
start()
