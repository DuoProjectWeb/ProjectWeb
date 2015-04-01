var MoveBehaviour = {
    Straight: function (enemy)
    {
        enemy.moveTo(enemy.x, enemy.y +10);
    },

    Follow: function (enemy)
    {
        if (enemy.target)
        {
            var angle = Math.atan2(enemy.target.x - enemy.x, - (enemy.target.y - enemy.x))*(180/Math.PI);
            enemy.moveTo(c, enemy.target.y);
            enemy.rotation = angle;
        }
    },

};
