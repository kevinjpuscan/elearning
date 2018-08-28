/**
 * CourseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
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
    
}

};

