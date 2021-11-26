let carts = document.querySelectorAll('.add-button');

let products = [ 
    {
        name: 'Bitcoin for Dummies',
        tag: 'book1',
        price: 71,
        inCart: 0
    },
    {
        name: 'Begin Programming with Python For Dummies',
        tag: 'book2',
        price: 117,
        inCart: 0
    },
    {
        name: 'Blockchain Revolution',
        tag: 'book3',
        price: 79,
        inCart: 0
    },
    {
        name: 'C++ All-in-One For Dummies, 3rd Edition',
        tag: 'book4',
        price: 134,
        inCart: 0
    },
    {
        name: 'Coding All-in-One For Dummies',
        tag: 'book5',
        price: 134,
        inCart: 0
    },
    {
        name: 'Getting Started With Coding, 2nd Edition',
        tag: 'book6',
        price: 100,
        inCart: 0
    },
    {
        name: 'Coding For Dummies',
        tag: 'book7',
        price: 34,
        inCart: 0
    },
    {
        name: 'HTML & CSS',
        tag: 'book8',
        price: 127,
        inCart: 0
    },
    {
        name: 'Java All-in-One For Dummies',
        tag: 'book9',
        price: 127,
        inCart: 0
    },
    {
        name: 'Javascript And Jquery: Interactive Front-End Web Development',
        tag: 'book10',
        price: 134,
        inCart: 0
    },
    {
        name: 'Raspberry Pi For Dummies, 3rd Edition',
        tag: 'book11',
        price: 92,
        inCart: 0
    }
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNum(products[i]);
        total_cost(products[i]);
    });
}

function loadcartNum() {
    let productNumbers = localStorage.getItem('cartNum');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNum(product, action) {
    let productNumbers = localStorage.getItem('cartNum');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( productNumbers ) {
        localStorage.setItem("cartNum", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNum", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNum');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function total_cost( product) {
    let cart = localStorage.getItem("total_cost");

    if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("total_cost", cart + product.price);
    
    } else {
        localStorage.setItem("total_cost", product.price);
    }
}

function showCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("total_cost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product">
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">RM ${item.price}.00</div>
            <div class="quantity">
                    <span>${item.inCart}</span>      
            </div>
            <div class="total">RM${item.inCart * item.price}.00</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">RM${cart}.00</h4>
            </div>`
    }

    
}

function discount(){
    let productNumbers = localStorage.getItem('cartNum'); //getting total item count
    productNumbers = parseInt(productNumbers); //changing to int

    let total = localStorage.getItem("total_cost");
    total = parseInt(total);

    var discount = 0;
    

    if(productNumbers >= 5 && productNumbers <= 10) {
    
        discount = total - (total*0.05);
        document.getElementById("discount").innerHTML= discount;
        
    
    } else if ( productNumbers > 10) {
        discount = total - (total*0.15);
        document.getElementById("discount").innerHTML= discount;
        
    }else {
        document.getElementById("discount").innerHTML= "00.00";
    }

    
}

function postage()
{

    let productNumbers = localStorage.getItem('total_cost'); //getting total item count
    productNumbers = parseInt(productNumbers);

    if(productNumbers > 100) {
        document.getElementById("postage").innerHTML= "00.00";
        
    } else {
        productNumbers+10;
        document.getElementById("postage").innerHTML= "10.00";
    }
    
}
    




loadcartNum();
showCart();

discount();
postage();