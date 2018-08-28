let app = new Vue({

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    el: '#register',
    data: {
       locals:{},
       fullname:'',
       email:'',
       password:'',
       repassword:'',
       message:'',
       validate:false,
       path:'' 

    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
        // Attach any initial data from the server.
        //this.extend(this, SAILS_LOCALS);
        //console.log(SAILS_LOCALS)
        this.locals=SAILS_LOCALS;


        //Get base path
        //app.path='http://'+window.location.host;
    },
    mounted: function () {

    },


    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods:{
        send:()=>{
                //Send information
                axios({
                    method: 'post',
                    url: '/auth/singup',
                    data: {
                        fullname: app.fullname,
                        email: app.email,
                        password: app.password,
                    },
                    responseType:'json'
                })
                .then(function (response) {
                    if(response.data.ok){
                        location.href='/';
                    }else{
                        app.message=response.data.message;
                    }
                })
                .catch(function (error) {
                    app.message='Error in request database';
                });
           
            

        
        },
        validateinput:()=>{
            if(app.fullname!=='' && app.email!=='' && app.password!=='' && app.repassword!==''){
                if(app.email.indexOf('@')>-1){
                    if(app.password === app.repassword){
                
                        app.send();
                        
                    }else{
                        
                        app.password='';
                        app.repassword='';
                        app.message='Passwords not match';
                        
                    }s
                }else{
                    app.email='';
                    app.password='';
                    app.repassword='';
                    app.message='Email invalid';
                }
            }else{
             
                app.message='Fields Empty';
            }
        }

    },



    //  ╔═╗╔═╗╔╗╔╗╦═╗╦ ╦╔╦╗╔═╗╦═╗
    //  ║  ║ ║║║║║║═╝║ ║ ║ ║╣ ║ ║
    //  ╚═╝╚═╝╩╚╝╩╩  ╚═╝ ╩ ╚═╝╩═╝
  
    computed:{

    },

    //  ╔═╗╦╦ ╔╦╗╔═╗╦═╗╔═╗
    //  ╠╣ ║║  ║ ║╣ ╠╦╝╚═╗
    //  ╩  ╩╚═╝╩ ╚═╝╩╚═╚═╝
    filters:{
     
    }
})

  