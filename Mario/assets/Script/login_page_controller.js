cc.Class({
    extends: cc.Component,

    properties: {
        Email_Edit_Box: cc.EditBox,
        Password_Edit_Box: cc.EditBox,
        UserName_Edit_Box: cc.EditBox,
        Login_Button: cc.Button,
        Signup_Button: cc.Button,
        curr_email: '',
        curr_password: '',
        curr_user_name: '',
    },

    onLoad () {
        this.Login_Button.node.on('click', this.login_handler, this);
        this.Signup_Button.node.on('click', this.signup_handler, this);
    },

    start () {
    },

    email_type_finish(){
        if(this.Email_Edit_Box.string == "")
            alert("email can't be blank");
        else
            curr_email = this.Email_Edit_Box.string;
    },

    password_type_finish(){
        if(this.Password_Edit_Box.string == "")
            alert("password can't be blank");
        else
            curr_password = this.Password_Edit_Box.string;
    },
    
    username_type_finish(){
        if(this.UserName_Edit_Box.string == "")
            alert("user name can't be blank");
        else{
            curr_user_name = this.UserName_Edit_Box.string;
            //console.log(curr_user_name);
        }  
    },

    login_handler: function (event) {
        //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 Button 组件
        var button = event.detail;
        //do whatever you want with button
        //另外，注意这种方式注册的事件，也无法传递 customEventData
        //alert(button)
        firebase.auth().signInWithEmailAndPassword(curr_email, curr_password)
        .then(function(result) {
            //cc.director.loadScene("Menu");
            profile_path = curr_email.replace('.', '_');
            var ProfileRef = firebase.database().ref('profile/' + profile_path);
            ProfileRef.update({
                email: curr_email,
                user_name: curr_user_name,
            })
            .then(function () {
                console.log("profile data upload success");
                cc.director.loadScene("Menu");
            }).catch(function (error) {
                alert(error);
            });
        }).catch(function(error) {
            alert(error);
        });
    },

    signup_handler: function (event) {
        //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 Button 组件
        var button = event.detail;
        //do whatever you want with button
        //另外，注意这种方式注册的事件，也无法传递 customEventData
        //alert('here')
        firebase.auth().createUserWithEmailAndPassword(curr_email, curr_password)
        .then(function(result) {
            //cc.director.loadScene("Menu");
            profile_path = curr_email.replace('.', '_');
            var ProfileRef = firebase.database().ref('profile/' + profile_path);
            ProfileRef.once('value', function(snapshot) {
                if(snapshot.val() == null){
                    console.log('no data');
                    ProfileRef.update({
                        email: curr_email,
                        user_name: curr_user_name,
                        life: 5,
                        score: 0,
                        points: 0,
                    })
                    .then(function () {
                        console.log("profile data upload success");
                        cc.director.loadScene("Menu");
                    }).catch(function (error) {
                        alert(error);
                    });
                }  
                else{
                    console.log('data exist');
                    cc.director.loadScene("Menu");
                }
            });
        }).catch(function(error) {
            alert(error);
        });
    }
});