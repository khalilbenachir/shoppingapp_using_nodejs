let Product=require('../models/product');

let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping', { useNewUrlParser: true });



const products=[
    new Product({
        imagePath: 'https://wooop.fr/24313/t-shirt-daddy-cool.jpg',
        title:'Awesome Game',
        description:'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        price:12
    }),
    new Product({
        imagePath: 'https://wooop.fr/24313/t-shirt-daddy-cool.jpg',
        title:'Awesome Game',
        description:'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        price:12
    }),
    new Product({
        imagePath: 'https://wooop.fr/24313/t-shirt-daddy-cool.jpg',
        title:'Awesome Game',
        description:'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        price:12
    }),
    new Product({
        imagePath: 'https://wooop.fr/24313/t-shirt-daddy-cool.jpg',
        title:'Awesome Game',
        description:'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        price:12
    }),
    new Product({
        imagePath: 'https://wooop.fr/24313/t-shirt-daddy-cool.jpg',
        title:'Awesome Game',
        description:'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        price:12
    }),
    new Product({
        imagePath: 'https://wooop.fr/24313/t-shirt-daddy-cool.jpg',
        title:'Awesome Game',
        description:'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        price:12
    })
];

let done=0;
for (let i=0;i<products.length;i++){
    console.log(products[i]);
    console.log("product");
    products[i].save((reslt,response)=>{
        done++;
        if(done === products.length){
            mongoose.disconnect();
        }
    });
}


