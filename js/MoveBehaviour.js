var MoveBehaviour = {
    None : function(enemy){
        
    },
    Straight: function (enemy)
    {
        enemy.moveTo(enemy.x, enemy.y +10);
    },

    Follow: function (enemy)
    {
        if (enemy.target)
        {
            var angle = Math.atan2(enemy.x - enemy.target.x, - (enemy.x - enemy.target.y));
            enemy.rotation = angle;
            enemy.moveTo(enemy.target.x, enemy.target.y);
        }
    },

};
