import express from "express";
import homecontroller from "../controller/homecontroller"

let router = express.Router();
const initwebroute=(app)=>{
router.get('/',homecontroller.gethomepage)
router.get('/detail/:id', homecontroller.detailuser)
router.post('/createuser',homecontroller.createnewuser)
router.post('/updateuser',homecontroller.updateuser)
router.get('/delete/:id',homecontroller.deleteuser)
router.get('/edituser/:id',homecontroller.edituser)
router.get('/upload',homecontroller.uploadfile)
return app.use('/', router)

}


export default initwebroute;