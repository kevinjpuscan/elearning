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
        saveImage:()=>{
            var formData = new FormData();

            formData.append('image', app.course.image);
            formData.append('course_id', app.course.id);

        
            axios.post('/api/v1/course/uploadimage', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then(function (response) {
                
            })
            .catch(function (error) {
               
            });
        },
        processFile:(event)=>{
            let imgname=event.target.files[0].name;
            var reader = new FileReader();

            function dataURLtoFile(dataurl) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], imgname, {type:mime});
            }

            reader.onloadend = function (e) {
                var base64image = e.target.result;
                $("body").append("<canvas id='tempCanvas' width='800' height='800' style='display:none'></canvas>");
                var canvas=document.getElementById("tempCanvas");
                var ctx=canvas.getContext("2d");
                var cw=canvas.width;
                var ch=canvas.height;
                var maxW=800;
                var maxH=800;
                var img = new Image;
                img.src=this.result;
                img.onload = function(){
                    var iw=img.width;
                    var ih=img.height;
                    var scale=Math.min((maxW/iw),(maxH/ih));
                    var iwScaled=iw*scale;
                    var ihScaled=ih*scale;
                    canvas.width=iwScaled;
                    canvas.height=ihScaled;
                    ctx.drawImage(img,0,0,iwScaled,ihScaled);
                    base64image = canvas.toDataURL("image/jpeg");
                    $("#tempCanvas").remove();
                    app.course.image_url=base64image;
                    app.course.image=dataURLtoFile(base64image);
                }
                console.log(img);

            };
            reader.readAsDataURL(event.target.files[0]);

            
    
          },
        createLesson:()=>{
            $("#loader").hide();
            axios({
                method: 'get',
                url: `/lesson/createlesson?ordinal=${app.ordinalLesson}&course_id=${app.course.id}`,
                responseType:'json'
            })
            .then(function (response) {
                console.log(response);
               app.lessons.push(response.data.lesson);
               $("#loader").show();
            })
            .catch(function (error) {
               
            });
        },
        updateCourse:(parameter,value)=>{
        
            if(parameter==="active"){
                app.course.active=value;
            }

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

  