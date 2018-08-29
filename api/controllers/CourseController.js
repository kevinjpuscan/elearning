/**
 * CourseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  view_course:(req,res)=>{
    //buscar por tag
    let course={};
    let lessons=[];
    Vista.getDatastore().sendNativeQuery(`select * from courses where id=${req.param('course_id')} and deletedat is null and active = true;`,(err,data)=>{
      if(!err){
        if(data.rowCount>0){
          course=data.rows[0];
          
          Vista.getDatastore().sendNativeQuery(`select * from lessons where course_id=${course.id} and deletedat is null;`,(err2,data2)=>{
            if(!err2){
              if(data2.rowCount>0){
                lessons=data2.rows;
                res.view('pages/course/detail',{error:false,course:course,lessons:lessons});
              }else{
                res.view('pages/course/detail',{error:true,course:{},lessons:[],message:'algo salio mal'});
              }
            }else{
              console.log('error2:'+err2);
              res.view('pages/course/detail',{error:true,course:{},lessons:[],message:'algo salio mal'});
            }
          });
        }else{
          res.view('pages/course/detail',{error:true,course:{},lessons:[],message:'algo salio mal'});
        }
      }else{
        console.log('err1'+err);
        res.view('pages/course/detail',{error:true,course:{},lessons:[],message:'algo salio mal'});
      }
    });
    
  },
  updatecourse:(req,res)=>{
      let query=`update courses set ${req.param('parameter')}='${req.param('value')}',updatedAt=now() where id=${req.param('course_id')};`;
      console.log(query);
      Vista.getDatastore().sendNativeQuery(query,(err,data)=>{
        if(!err){
            res.ok();
        }else{
            console.log(err);
        }
    })
  },
  deletecourse:(req,res)=>{
    if(req.param('course_id')){
      Vista.getDatastore().sendNativeQuery(`update courses set deletedAt=now() where id=${req.param('course_id')};update lessons set deletedAt=now() where course_id=${req.param('course_id')};`,(err,data)=>{
        if(!err){
          res.redirect('/admin/courses');
        }else{
          console.log(err);
          res.redirect('/admin/courses',{error:'ocurrió un error'});
        }
      });

    }
  },

  getcourses:(req,res)=>{
    Vista.getDatastore().sendNativeQuery(`select * from courses where active=true and deletedat is null;`,(err,data)=>{
      if(!err){
        res.ok({error:false,courses:data.rows});
      }else{
        res.ok({error:true,message:'Error al obtener cursos'});
      }
    });
  },

  uploadimage:(req,res)=>{
    
  
    req.file('image').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/images/courses')
    },function whenDone(err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }
      
     let url=uploadedFiles[0].fd.split('/');
     let name=url[url.length-1];

     let query=`update courses set image_url ='${name}' where id=${req.param('course_id')};`;
      Vista.getDatastore().sendNativeQuery(query,(err,data)=>{
        if(!err){
          return res.ok();
        }else{
          return res.badRequest('Error update database');
        }
      });

    });
  }

};

