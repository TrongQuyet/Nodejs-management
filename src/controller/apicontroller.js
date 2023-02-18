import connectionpromise from '../configs/connectDB'
let getalluser = async(req,res)=>{
    const [rows,fields] = await connectionpromise.query( 'SELECT * FROM `users`');
    return res.status(200).json({
        rows
    });
}
let createuser = async(req,res) => {
    
    let {firstname, lastname,email,address} = req.body;
    if(!firstname || !lastname || !email || !address){
        return res.json({message:'fail'})
    }
    await connectionpromise.query(`insert into users (firstname,lastname,email,address) values (?,?,?,?)`,[firstname,lastname,email,address]);
    
    
    return res.status(200).json({
        message:'nice'
    });
}
let updateuser=async(req,res)=>{
    let {firstname,lastname,email,address,id} = req.body;
    if(!firstname || !lastname || !email || !address || !id){
        return res.json({message:'fail'})
    }
    await connectionpromise.query(`update users set firstname = ?, lastname = ?, email = ?, address = ? WHERE id =? `,[firstname, lastname,email,address,id]);
    return res.status(200).json({
        message:'nice'
    });
}
let deleteuser=async(req,res)=>{
    let id = req.params.id;
    if(!id){
        return res.json({message:'fail'})
    }
    await connectionpromise.query(`delete from users where id=?`,[id]);
    return res.status(200).json({
        message:'delete success'
    });
}

module.exports={
    getalluser,
    createuser,
    deleteuser,
    updateuser
}