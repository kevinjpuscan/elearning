let app = new Vue({

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    el: '#course',
    data: {
       course:{},
       lessons:[],
       message:''

    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
        // Attach any initial data from the server.
        //this.extend(this, SAILS_LOCALS);
        //console.log(SAILS_LOCALS)
        
        //app.path='http://'+window.location.host;
    },
    mounted: function () {
        console.log(SAILS_LOCALS);
        if(SAILS_LOCALS.course){
            this.course=SAILS_LOCALS.course;
        }

        if(SAILS_LOCALS.lessons){
            this.lessons=SAILS_LOCALS.lessons;
        }

    },
  


    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods:{
        createLesson:()=>{
            console.log("createlesson");
            axios({
                method: 'get',
                url: `/lesson/createlesson?ordinal=${app.ordinalLesson}&course_id=${app.course.id}`,
                responseType:'json'
            })
            .then(function (response) {
                console.log(response);
               app.lessons.push(response.data.lesson);
            })
            .catch(function (error) {
               
            });
        },
        updateCourse:(parameter,value)=>{
        

            axios({
                method: 'get',
                url: `/course/updatecourse?parameter=${parameter}&value=${value}&course_id=${app.course.id}`,
                responseType:'json'
            })
            .then(function (response) {
               
            })
            .catch(function (error) {
               
            });

        },

        updateLesson:(lesson_id,parameter,value)=>{
            
            axios({
                method: 'get',
                url: `/lesson/updatelesson?parameter=${parameter}&value=${value}&lesson_id=${lesson_id}`,
                responseType:'json'
            })
            .then(function (response) {
               
            })
            .catch(function (error) {
               
            });
        },

        deleteLesson:(lesson_id)=>{
            axios({
                method: 'get',
                url: `/lesson/deletelesson?lesson_id=${lesson_id}`,
                responseType:'json'
            })
            .then(function (response) {
               
            })
            .catch(function (error) {
               
            });
        },
        deletecourse:()=>{
            axios({
                method: 'get',
                url: `/course/deletecourse?course_id=${app.course.id}`,
                responseType:'json'
            })
            .then(function (response) {
               
            })
            .catch(function (error) {
               
            });
        },
        getLessons:()=>{
            axios({
                method: 'get',
                url: `/lesson/getlessons?course_id=${app.course.id}`,
                responseType:'json'
            })
            .then(function (response) {
               
            })
            .catch(function (error) {
               
            });
        }

    },



    //  ╔═╗╔═╗╔╗╔╗╦═╗╦ ╦╔╦╗╔═╗╦═╗
    //  ║  ║ ║║║║║║═╝║ ║ ║ ║╣ ║ ║
    //  ╚═╝╚═╝╩╚╝╩╩  ╚═╝ ╩ ╚═╝╩═╝
  
    computed:{
        ordinalLesson:()=>{
            let major=1;
            app.lessons.forEach(element => {
                if(element.ordinal>major){
                    major=element.ordinal;
                }
            });
            return major;
        }
    },

    //  ╔═╗╦╦ ╔╦╗╔═╗╦═╗╔═╗
    //  ╠╣ ║║  ║ ║╣ ╠╦╝╚═╗
    //  ╩  ╩╚═╝╩ ╚═╝╩╚═╚═╝
    filters:{
     
    }
})

  