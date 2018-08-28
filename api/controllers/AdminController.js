/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  view_index:(req,res)=>{
    res.locals.layout = 'layouts/admin';
    res.view('pages/admin/index');
  },

  view_course:(req,res)=>{
    res.locals.layout = 'layouts/admin';
    let course={};

    if(req.param('course_id')){
      let lessons=[];
      Vista.getDatastore().sendNativeQuery(`select * from courses where id=${req.param('course_id')}`,(err,data)=>{
        if(!err){
          if(data.rowCount>0){
            course=data.rows[0];
            Vista.getDatastore().sendNativeQuery(`select * from lessons where course_id=${req.param('course_id')}`,(err_l,lessons)=>{
              if(!err_l){

                  lessons=lessons.rows;
                  res.view('pages/admin/course',{
                    course:course,
                    lessons:lessons
                  });
                
              }else{
                res.ok({type:'failed',message:'Error al consultar la base de datos'})
              }
            });
          }else{
            res.ok({type:'failed',message:'Curso no encontrado'})
          }
        }else{
          res.ok({type:'failed',message:'Error al onsultar la base de datos'})
        }
      })
    }else{
      Vista.getDatastore().sendNativeQuery(`insert into courses (active,createdAt,updatedAt) values ('false',now(),now()) returning id;`,(err,data)=>{
        if(!err){
          if(data.rowCount>0){
            course.id=data.rows[0].id;
            res.view('pages/admin/course',{
              course:course
            });
          }else{
            res.ok({type:'failed',message:'Error al crear nuevo curso'})
          }
        }else{
          console.log(err);
          res.ok({type:'failed',message:'Error al consultar a la base de datos'})
        }
      })
    }
    
    
  },





};
