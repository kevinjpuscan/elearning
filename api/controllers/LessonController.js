/**
 * LessonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    view_lesson:(req,res)=>{
        Vista.getDatastore().sendNativeQuery(`select * from lessons where id=${req.param('lesson_id')} and deletedat is null;`,(err,data)=>{
            if(!err){
                if(data.rowCount>0){
                    let lesson=data.rows[0];
                    res.view('pages/course/lesson',{error:false,lesson:lesson});
                }else{
                    res.view('pages/course/lesson',{error:true});
                }
            }else{
                console.log(err);
                res.view('pages/course/lesson',{error:true});
            }
        })
        
    },
    updatelesson:(req,res)=>{
        Vista.getDatastore().sendNativeQuery(`update lessons set ${req.param('parameter')}='${req.param('value')}',updatedAt=now() where id=${req.param('lesson_id')};`,(err,data)=>{
            if(!err){
                res.ok();
            }
        })
      },

    createlesson:(req,res)=>{
        Vista.getDatastore().sendNativeQuery(`insert into lessons (course_id,createdAt,updatedAt,ordinal) values(${req.param('course_id')},now(),now(),${req.param('ordinal')}) returning *;`,(err,data)=>{
            if(!err){
                if(data.rowCount>0){
                    let lesson=data.rows[0];
                    res.ok({lesson:lesson});
                }
            }
        }) 
    }


};

