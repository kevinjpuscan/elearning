let app = new Vue({

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    el: '#home-main',
    data: {
       courses:[],
       message:'',

    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {

    },
    mounted: function () {
        this.getCourses();
    },


    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods:{
        getCourses:()=>{
                //Send information
                axios({
                    method: 'get',
                    url: 'api/v1/courses',
                    responseType:'json'
                })
                .then(function (response) {
                    if(!response.data.error){
                        app.courses=response.data.courses;
                    }else{
                        app.message=res.data.message;
                    }
                })
                .catch(function (error) {
                    app.message='Error in request database';
                });
        
        },

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

  