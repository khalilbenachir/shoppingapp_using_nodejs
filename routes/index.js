var express = require('express');
var router = express.Router();

var csurf = require('csurf');
var csrfProtection=csurf();

var Product=require('../models/product');
var Cart =require('../models/cart');


router.use(csrfProtection);


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("test");
  let products=[];
  let product=Product.find(function(err,docs){
    products.push(docs);
    res.render('shop/index', { title: 'Express' ,products:products[0]});

  });


});

router.get('/add-to-cart/:id',function (req,res,next) {
  var productId=req.params.id;
  var cart =new Cart(req.session.cart ? req.session.cart:{});
  console.log(cart.totalPrice);

  Product.findById(productId,function (err,product) {
    if(err)
      return res.redirect('/');
    cart.add(product,product.id);
    req.session.cart=cart;
    console.log(req.session.cart);
    res.redirect('/');
  })
});


module.exports = router;




/*

*/
