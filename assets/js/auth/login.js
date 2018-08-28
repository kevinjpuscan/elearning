let app = new Vue({

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    el: '#login',
    data: {
       locals:{},
       email:'',
       password:'',
       repassword:'',
       message:''

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
                    url: '/auth/login',
                    data: {
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
            if( app.email!=='' && app.password!=='' ){
                if(app.email.indexOf('@')>-1){
                    app.send();
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

  