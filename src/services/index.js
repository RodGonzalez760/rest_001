// 5.-Exportamos

module.exports = {
    HomeService: require('./home.service'),         //6
    UserService: require('./user.service'),         //31
    IdeaService: require('./idea.service'),         //31
    CommentService: require('./comment.service'),    //31
    AuthService: require('./auth.service')          // 41
}

// 6.- vamos a container.js

//31, 41.-completamos el apartado service en el archivo container.js