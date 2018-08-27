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

          Vista.getDatastore().sendNativeQuery(`insert into users (fullname, email, password,createdAt,updatedAt,isroot) 
          values ('${req.param('fullname')}','${newEmail}','${hash}',now(),now(),'FALSE')
returning id;`,(err,data)=>{
            if(!err){
              if(data.rowCount>0){
                // Store the user's new id in their session.
                req.session.sessionId= data.rows[0].id;
               
                res.ok({ok:true,message:'Redirect to /'});
              }else{
                res.ok({ok:false,message:'Error to save user'});
              }

            }else{
              res.ok({ok:false,message:'Error to save user 2'});
            }


          });
        }else{
          //res error
          res.ok({ok:false,message:'Email in use'});
        }

      }else{
        res.ok({ok:false,message:'Error in database'});
      }


    });


  },

  login:(req,res)=>{

    let newEmail=req.param('email').toLowerCase();

    Vista.getDatastore().sendNativeQuery(`select * from users where email='${newEmail}'`,(err,data)=>{
      if(!err){
        if(data.rowCount>0){
          let hash = data.rows[0].password;
          bcrypt.compare(req.param('password'),hash,(err,isCorrect)=>{
            if(!err){
              if(isCorrect){
                req.session.sessionId= data.rows[0].id;
                res.ok({ok:true,message:'Redirect to /'});
              }else{
                res.ok({ok:false,message:'Password incorrect'});
              }
            }else{
              res.ok({ok:false,message:'Error to validate password'});
            }
          });
        }else{
          //res error
          res.ok({ok:false,message:'User not exist'});
        }

      }else{
        res.ok({ok:false,message:'Error in database'});
      }


    });


  },


};

