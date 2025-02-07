// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.on(("error"),(error)=>{
        console.log("erorr..",error)
        throw error
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
})



.catch((err) =>{
    console.log("mongo db connection failed",err);
})





















//  const app = express{}

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         application.on("error",(error) =>{
//             console.log("ERRR:",error);
//             throw error
//         })

//     app.listen(process.env.PORT,()=>{
//         console.log(`App is listening on port ${process.env.PORT}`)

//     })
//    }
//     catch (error) {
//         console.error("error",error)
//         throw err
//     }
// }) 