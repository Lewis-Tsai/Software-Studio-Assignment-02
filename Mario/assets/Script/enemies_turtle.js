cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        animator:{
            type : cc.Animation,
            default : null
        },
        animateState: null
    },

    onLoad () {
        // enable physical system
        cc.director.getPhysicsManager().enabled = true;
        // enable collision system
        cc.director.getCollisionManager().enabled = true;
        // Get component
        this.animator = this.getComponent(cc.Animation);
    },

    onDestroy () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabled = false;
    },

    start () {
        this.rebornPos = this.node.position;
        this.animateState = this.animator.play('enemies_turtle');
    },

    update (dt) {
        this.node.x += this.speed * dt;
        this.u_turn();
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(otherCollider.tag == 6)
        {
            this.node.scaleX *= -1;
            this.speed *= -1;
        }
    },

    u_turn: function () {
        //console.log(this.node.x);
        if(Math.abs(this.node.x - this.rebornPos.x) >= 100){
            this.node.scaleX *= -1;
            this.speed *= -1;
        }
    },

});
