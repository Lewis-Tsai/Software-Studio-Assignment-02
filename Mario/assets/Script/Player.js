cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0,
        jumpDuration: 0,
        walkLength: 0,
        walkDuration: 0,
        speed: 0,
        onGround: true,
        isDead:false,
        power_down: false,
        rebornPos : cc.v2(0,0),
        jumpaudio:{
            type : cc.AudioClip,
            default : null
        },
        deathaudio:{
            type : cc.AudioClip,
            default : null
        },
        flagaudio:{
            type : cc.AudioClip,
            default : null
        },
        successaudio:{
            type : cc.AudioClip,
            default : null
        },
        coinaudio:{
            type : cc.AudioClip,
            default : null
        },
        powerupaudio:{
            type : cc.AudioClip,
            default : null
        },
        powerdownaudio:{
            type : cc.AudioClip,
            default : null
        },
        animator:{
            type : cc.Animation,
            default : null
        },
        animateState: null,
        camera:{
            type : cc.Node,
            default : null
        },
        healthtext:{
            type: cc.Node,
            default: null
        },
        health : 0,
        background:{
            type: cc.Node,
            default: null
        },
        time: 35,
        points: 0,
    },

    onLoad () {
        // Add keydown event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // Add keyup event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // enable physical system
        cc.director.getPhysicsManager().enabled = true;
        // Get player animator component
        this.animator = this.getComponent(cc.Animation);
    },

    //onDestroy () {
    //    // Close physical system & collision system manager
    //    cc.director.getCollisionManager().enabled = false;
    //    cc.director.getCollisionManager().enabled = false;
    //    // Close key control event trigger
    //    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    //    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    //},

    start () {
        // enable collision system
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        // Record initial reborn position
        this.rebornPos = this.node.position;
        
        // Play player default animation
        this.animator.pause();
        this.animateState = this.animator.play();
        //Get player health
        this.health = Global.health;
        
        this.time = 35;
        this.points = Global.points;
        this.counting();
    },

    update (dt) {
        // Player Move
        this.move(dt);
        // Camera follow
        this.camerafollow();
        // Animation Update
        this.PlayerAnimation();
        // UI Update
        this.UpdateUI();
    },

    counting: function(){
        var scene = cc.director.getScene();

        this.schedule(function(){
            if(scene.name == "Stage 1" || scene.name == "Stage 2"){
                //console.log('counting');
                this.time-=1;
                this.check_time_limit();
            }
        }, 1);
    },

    check_time_limit: function(){
        if(this.time == 1){
            this.isDead = true;
            this.Gameover();
        }
    },

    onKeyDown: function (event) {
        //console.log(this.node.position);
        var macro = cc.macro;
        if(!this.isDead){   // Player only can move when it isn't dead
            switch(event.keyCode) {
                case macro.KEY.a:
                case macro.KEY.left:
                    this.turnLeft();
                    break;
                case macro.KEY.d:
                case macro.KEY.right:
                    this.turnRight();
                    break;
                
                case macro.KEY.space:
                    if(this.onGround == true){
                        this.Jump();
                    }
                    break;
            }
        }
    },

    onKeyUp: function (event) {
        
        var macro = cc.macro;
        switch(event.keyCode) {
            // Reset player speed
            case macro.KEY.a:
            case macro.KEY.left:
            case macro.KEY.d:
            case macro.KEY.right:
                this.speed = 0;
                break;
        }
    },

    turnLeft () {
        var scene = cc.director.getScene();
        //console.log(this.node.position.x);
        if(scene.name != "Stage 3"){
            this.speed = -200;
            this.node.scaleX = -2;
        }
        else{
            if(this.node.position.x >= -476){
                this.speed = -200;
                this.node.scaleX = -2;
            }
        }
    },

    turnRight () {
        var scene = cc.director.getScene();
        //console.log(this.node.position.x);
        if(scene.name != "Stage 3"){
            this.speed = 200;
            this.node.scaleX = 2;
        }
        else{
            if(this.node.position.x <= 130){
                this.speed = 200;
                this.node.scaleX = 2;
            }
        }
    },
   
    Reborn: function(){
        //update database
        var ProfileRef = firebase.database().ref(Global.profile_path);
        ProfileRef.update({
            points: this.points,
            life: this.health,
        })
        .then(function () {
            console.log("profile data upload success");
        }).catch(function (error) {
            alert(error);
        });

        // Return to reborn position
        this.node.x = this.rebornPos.x;
        this.node.y = this.rebornPos.y;
        // Init animation
        this.animator.pause();
        this.animateState = this.animator.play('PlayerIdle');
    },

    Gameover: function(){
        var ProfileRef = firebase.database().ref(Global.profile_path);
        ProfileRef.update({
            points: this.points,
            life: this.health,
        })
        .then(function () {
            console.log("profile data upload success");
        }).catch(function (error) {
            alert(error);
        });
        this.schedule(function() {  
            cc.director.loadScene("Stage 4");
        }, 2, 0);
    },

    GameComplete: function(){
        Global.health = this.health;
        Global.points = this.points;
        Global.time_left = this.time;

        var ProfileRef = firebase.database().ref(Global.profile_path);
        ProfileRef.update({
            points: this.points,
            life: this.health,
        })
        .then(function () {
            console.log("profile data upload success");
        }).catch(function (error) {
            alert(error);
        });
    },

    Jump: function () {

        var scene = cc.director.getScene();
        
        if(scene.name != "Stage 3"){
            this.onGround = false;
            // audio
            cc.audioEngine.play(this.jumpaudio, false, 1);
            // animator
            this.animator.pause();
            this.animateState = this.animator.play('PlayerJump');
            // action
            var jumpAction = cc.jumpBy(this.jumpDuration, cc.v2(0, 0), this.jumpHeight, 1);
            var finishAction = cc.callFunc(() => {
            this.onGround = true;
            this.animator.pause();
            this.animateState = this.animator.play('PlayerIdle');
        });
            this.node.runAction(cc.sequence(jumpAction,finishAction));
        }
    },

    move(dt){
        if(!this.isDead){
            if(this.power_down == false)
                this.node.x += this.speed * dt;
            else
                this.node.x += this.speed * dt * 0.15;
        }
    },

    camerafollow:function(){
        var scene = cc.director.getScene();
        
        if(scene.name == "Stage 1"){
            if(this.node.x < -580)
                this.camera.x = -580;   
            else if(this.node.x > 1580)
                this.camera.x = 1580;
            else
                this.camera.x = this.node.x;
        }
        else if(scene.name == "Stage 2"){
            if(this.node.x < -580)
                this.camera.x = -580;
            else if(this.node.x > 700)
                this.camera.x = 700;
            else
                this.camera.x = this.node.x;
        }
    },

    PlayerAnimation: function(){
        if(this.isDead){
            if(this.health > 0 && this.animateState.name != 'PlayerDamage'){
                this.animator.pause();
                this.animateState = this.animator.play('PlayerDamage');
            }else if(this.health == 0 && this.animateState.name != 'PlayerDead'){
                this.animator.pause();
                this.animateState = this.animator.play('PlayerDead');
            }   
        }else{
            if(this.speed != 0){
                if(this.animateState.name == 'PlayerIdle'){
                    this.animator.pause();
                    this.animateState = this.animator.play('PlayerRun');
                }
            }else if(this.onGround != false && this.speed == 0){
                this.animator.pause();
                this.animateState = this.animator.play('PlayerIdle');
            }
        }
    },

    UpdateUI: function(){
        var scene = cc.director.getScene();
        
        if(scene.name != "Stage 3"){
            this.healthtext.getComponent(cc.Label).string= "❤ " + this.health + " 🕐 " + this.time
             + " 💲 " + this.points
             + '\n' + '\n' + '🧑🏿 ' + Global.user_name;
        }
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        // console.log(otherCollider.node.name);
        // "otherCollider.node" can get collider's node 

        // Contact to check point
        if(otherCollider.node.name == "check_point"){
            console.log("Touch check point");
            
            Global.points = this.points;
            var ProfileRef = firebase.database().ref(Global.profile_path);
            ProfileRef.update({
                points: this.points,
                life: this.health,
            })
            .then(function () {
                console.log("profile data upload success");
            }).catch(function (error) {
                alert(error);
            });
            if(otherCollider.node.position.x > this.rebornPos.x){
                // audio
                cc.audioEngine.play(this.flagaudio, false, 1);
                this.rebornPos = otherCollider.node.position;
                //console.log(this.rebornPos, otherCollider.node.position);
                this.points += 10;
            }
        }
        if(otherCollider.node.name == "enemies_goomba"){
            if(contact.getWorldManifold().normal.x == 0 && contact.getWorldManifold().normal.y == -1
                && contact.getWorldManifold().normal.z == 0)
                otherCollider.node.destroy();

            if(this.health > 1 && this.isDead == false){    // Reborn
                cc.audioEngine.play(this.deathaudio, false, 1);     // audio
                this.health -= 1;
                this.isDead = true;
                Global.points = this.points;
                this.schedule(function() {  
                    this.Reborn();
                    this.isDead = false;
                }, 3, 0);
            }else if(this.health == 1 && this.isDead == false){ // Game over
                cc.audioEngine.play(this.deathaudio, false, 1);     // audio
                this.health -= 1;
                this.isDead = true;
                Global.points = this.points;
                this.Gameover();
            }
        }
        if(otherCollider.node.name == "enemies_turtle"){
            if(contact.getWorldManifold().normal.x == 0 && contact.getWorldManifold().normal.y == -1
                && contact.getWorldManifold().normal.z == 0)
                otherCollider.node.destroy();

            cc.audioEngine.play(this.powerdownaudio, false, 1);
            this.points -= 70;
            this.power_down = true;
            this.schedule(function() {
                this.power_down = false;
            }, 5, 0);
        }
        // Contact to destination
        if(otherCollider.tag == 5){
            var scene = cc.director.getScene();
            this.GameComplete();
            if(scene.name == "Stage 1"){
                cc.director.loadScene("Stage 2");
            }else if(scene.name == "Stage 2"){
                cc.director.loadScene("Stage 3");
            }
        }
        if(otherCollider.node.name == "question_block"){
            //console.log(otherCollider.node.name);
            if(contact.getWorldManifold().normal.x == 0 && contact.getWorldManifold().normal.y == 1
                && contact.getWorldManifold().normal.z == 0)
                return;
                
            this.points += 20;
            cc.audioEngine.play(this.coinaudio, false, 0.3);
            
        }
        if(otherCollider.node.name == "cloud_block"){
            //console.log('touch cloud block');
            if(contact.getWorldManifold().normal.x == 0 && contact.getWorldManifold().normal.y == 1
                && contact.getWorldManifold().normal.z == 0)
                return;

            cc.audioEngine.play(this.powerupaudio, false, 0.3);
            this.jumpHeight = 200 + 150;
            this.schedule(function() {
                this.jumpHeight = 200;
            }, 5, 0);
        }
    },
});
