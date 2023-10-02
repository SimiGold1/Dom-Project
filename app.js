let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products=[
    {
        id: 1,
        name:  'CUSTOM NIKE AIRFORCE1',
        image:  'Af1.white.jpg',
        price:  30000
    
    },
    {
        id: 2,
        name:  'AIR JORDAN 7 CITRUS',
        image:  'AirJordan.jpg',
        price: 60000
    },
    {
        id: 3,
        name:  'ALEXANDER MCQUEEN BLACK',
        image:  '3.png',
        price:  50000
    },
    {
        id: 4,
        name:  'LOUIS VUITON SNEAKERS',
        image:  '4.jpg',
        price:  100000
    },
    {
        id: 5,
        name:  'NAKED WOLFE',
        image:  '5.jpeg',
        price: 80000
    },
    {
        id: 6,
        name:  'CHRISTIAN LOUBOUTIN',
        image:  '6.jpg',
        price: 50000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}"><span class="material-symbols-outlined">favorite</span>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
function toggleHeartIcon(element) {
    element.classList.toggle('active');
  }
initApp();
function addToCart(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}