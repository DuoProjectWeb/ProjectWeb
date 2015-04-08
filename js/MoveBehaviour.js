var MoveBehaviour = {
    None : function(enemy, tpf){
        enemy.moveTo(enemy.x, enemy.y + Scene.BACKGROUND_SPEED * tpf);
    },
    Straight: function (enemy, tpf)
    {
        enemy.moveTo(enemy.x, enemy.y + 10);
    },

    Follow: function (enemy, tpf)
    {
        if (enemy.target)
        {
            var angle = Math.atan2(enemy.x - enemy.target.x, - (enemy.y - enemy.target.y));
            enemy.rotation = angle;
            enemy.moveTo(enemy.target.x, enemy.target.y);
        }
    },

};
