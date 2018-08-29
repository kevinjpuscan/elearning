let app = new Vue({

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    el: '#lesson',
    data: {
       lessons:{},

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
            this.lesson=SAILS_LOCALS.lesson;
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

  