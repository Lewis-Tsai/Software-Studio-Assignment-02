cc.Class({
    extends: cc.Component,

    properties: {
        curr_user_name: '',
        curr_user_email: '',
        user_info: cc.Node,
    },

    onLoad () {
        
    },

    start () {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                Global.user_email = user.email;
                curr_user_email = user.email;
                
                profile_path = curr_user_email.replace('.', '_');
                Global.profile_path = 'profile/' + profile_path;
                
                //profile_path = profile_path.replace('.', '_');
                console.log(curr_user_email)
            //--------------------
                var ProfileRef = firebase.database().ref('profile/' + profile_path);
                ProfileRef.once('value', function(snapshot) {
                    if(snapshot.val() == null){
                        console.log('data is missing');
                    }  
                    else{
                        //console.log(snapshot.val());
                        Global.user_name = snapshot.val().user_name;
                        Global.points = snapshot.val().points;
                        Global.health = snapshot.val().life;
                        if(Global.health == 0){
                            alert('☠☠☠ Your previous life is 0. Your life is reset to 5. ☠☠☠');
                            Global.health = 5;
                        }
                    }
                });
            } else {
                // No user is signed in.
                //user = null;
                curr_user_email = '';
                console.log("login failed");
            }
        });
        //Global.health = 5,
        Global.score = 0
    },

    // update (dt) {},

    GoStage1 : function(){
        if(curr_user_email == '')
            cc.director.loadScene("login_signin");
        else
            cc.director.loadScene("Stage 1");
    },

    GoStage2 : function(){
        if(curr_user_email == '')
            cc.director.loadScene("login_signin");
        else
            cc.director.loadScene("Stage 2");
    },

    LogOut : function(){
        if(curr_user_email == ''){
            alert('How dare you log out when you are not logged in! DUMB ASS!');
        }  
        else{
            firebase.auth().signOut().then(function() {
                alert("User log out success!");
                after_logout = true;
            }).catch(function(error) {
                alert("User log out failed!", error);
            })
        }
    },

    GoLeaderboard: function(){
        if(curr_user_email == ''){
            alert('Please login first');
            cc.director.loadScene("login_signin");
        }  
        else{
            cc.director.loadScene("Leaderboard");
        }
            
    }

});
