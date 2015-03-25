var MoveBehaviour = {
    Straight: function (enemy)
    {
        enemy.moveTo(enemy.x, enemy.y +10);
    },

    Follow: function (enemy)
    {
        if (enemy.target)
        {
            enemy.moveTo(enemy.target.x, enemy.target.y);
        }
    },

};
