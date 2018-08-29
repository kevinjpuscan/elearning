let app = new Vue({

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    el: '#detail',
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

  