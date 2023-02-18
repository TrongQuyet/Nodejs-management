import express from "express";
import apicontroller from "../controller/apicontroller"
let router = express.Router();

const initapi=(app)=>{
router.get('/users',apicontroller.getalluser)
router.post('/create-user',apicontroller.createuser)
router.put('/update-user',apicontroller.updateuser)
router.delete('/delete-user/:id',apicontroller.deleteuser)
return app.use('/api/v1/', router)

}


export default initapi;