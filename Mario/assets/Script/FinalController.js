cc.Class({
    extends: cc.Component,

    properties: {
        text:{
            type: cc.Node,
            default: null
        },
    },

    start () {
        var scene = cc.director.getScene();
        if(scene.name == "Stage 4"){
            this.text.getComponent(cc.Label).string = 'YOU LOSE!'
            + '\n' + '\n' + '🧑🏿 ' + Global.user_name
            + '\n' + '\n' + " 💲 " + Global.points;
        }
        else{
            var total_points = Global.points + Global.time_left * 50;
            this.text.getComponent(cc.Label).string= 'YOU WIN!'
            + '\n' + '\n' + '🧑🏿 ' + Global.user_name
            + '\n' + '\n' + " 💲 " + Global.points + " + " + Global.time_left + " X 50 = " + total_points;

            Global.points = total_points;
            var ProfileRef = firebase.database().ref(Global.profile_path);
            ProfileRef.update({
                points: total_points,
            })
            .then(function () {
                console.log("profile data upload success");
            }).catch(function (error) {
                alert(error);
            });
        }
    },

    Backtomenu: function(){
        //window.open("https://www.facebook.com/");
        cc.director.loadScene("Menu");
    }
});
