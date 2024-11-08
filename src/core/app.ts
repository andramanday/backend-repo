import express from 'express'
import UserRoute from '../routes/user.route';
import AuthRoute from '../routes/auth.route';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())

app.get('/',(req, res)=>{
    res.status(200).send({
        err: false,
        msg: 'welcome to andra apps',
        data: null
    })
})

app.use('/user', UserRoute)
app.use('/auth', AuthRoute)

app.listen(PORT, ()=> console.log(`🚀 App Running On :${PORT}`))