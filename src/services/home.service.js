// 4.- después de \startup\container.js

class HomeService{
    index() {
        return {
            message: "Hello World!"
        };
    };
}

module.exports = HomeService;

// 5.- vamos a \services\index.js