/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let bcrypt = require('bcryptjs');
module.exports = {

  singup:(req,res)=>{

    let newEmail=req.param('email').toLowerCase();

    Vista.getDatastore().sendNativeQuery(`select * from users where email='${newEmail}'`,(err,data)=>{
      if(!err){
        if(data.rowCount===0){
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(req.param('password'), salt);

          Vista.getDatastore().sendNativeQuery(`insert into users (fullname, email, password) values ('${req.param('fullname')}','${newEmail}','${hash}')
returning id;`,(err,data)=>{
            if(!err){
              console.log(data);
              if(data.rowCount>0){
                // Store the user's new id in their session.
                this.req.session.userId = data.rows[0].id;
                res.ok({ok:true,message:'Redirect to /'});
              }
              res.ok({ok:false,message:'Error to save user'});
            }
            res.ok({ok:false,message:'Error to save user'});
            console.log(err);
          })
        }
        //res error
        res.ok({ok:false,message:'Email in use'});
      }
      console.log(err);
      res.ok({ok:false,message:'Error in database'});
    });





  }

};

