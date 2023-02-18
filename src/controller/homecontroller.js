import connectionpromise from '../configs/connectDB'

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
module.exports ={
    gethomepage,
    detailuser,
    createnewuser,
    deleteuser,
    edituser,
    updateuser,
    uploadfile
}