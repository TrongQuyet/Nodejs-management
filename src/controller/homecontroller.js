import connectionpromise from '../configs/connectDB'
const multer  = require('multer')

let gethomepage = async(req,res)=>{
    const [rows,fields] = await connectionpromise.query( 'SELECT * FROM `users`');
    return res.render('index.ejs',{'datauser':(rows)})
};
let detailuser =async(req,res)=>{
    let id = req.params.id;
    let [users] = await connectionpromise.query(`select * from users where id=?`,id);
    return res.render('detailuser.ejs',{'details':(users[0])})
};
let createnewuser = async(req,res)=>{
    let {firstname, lastname,email,address} = req.body;
    console.log(firstname);
    await connectionpromise.query(`insert into users (firstname,lastname,email,address) values (?,?,?,?)`,[firstname,lastname,email,address]);
    return res.redirect('/');
}
let deleteuser = async(req,res)=>{
    let id = req.params.id;
    await connectionpromise.query(`delete from users where id=?`,id);
    return res.redirect('/');
    
    
}
let edituser = async(req,res)=>{
    let id = req.params.id;
    let [users] = await connectionpromise.query(`select * from users where id=?`,id);
    return res.render('edituser.ejs',{'edit':(users[0])})
}
let updateuser =async(req,res)=>{
    let {firstname, lastname,email,address,id} = req.body;
    await connectionpromise.query(`update users set firstname = ?, lastname = ?, email = ?, address = ? WHERE id =? `,[firstname, lastname,email,address,id]);
    return res.redirect('/');
}

let uploadfile =(req,res) => {
    return res.render('upload.ejs');
}
let profile = async(req,res) => {
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
}
const upload =multer().single('profile_pic')
const uploadmutil = multer().array('multiple_images' );
let uploadmultiple =async(req, res) => {
    uploadmutil(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="./">Upload more images</a>';
        res.send(result);
    });
}
module.exports ={
    gethomepage,
    detailuser,
    createnewuser,
    deleteuser,
    edituser,
    updateuser,
    uploadfile,
    profile,
    uploadmultiple
}