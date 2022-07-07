import { getProducts, getProduct} from "./firebase.js";

const cart = []

let total = 0;

const Empty = document.querySelector('.Empty');

const Checkout = document.querySelector('.Checkout');

const emptyCart = () => {

    total = 0;

    document.querySelector('.visualTotal').textContent = total;

    cart.length = 0;

    document.querySelector('.innerCart').innerHTML = '';

}

Empty.addEventListener('click', emptyCart);

Checkout.addEventListener('click', emptyCart);

const renderCart = () => {

    const innerCart = document.querySelector('.innerCart');

    innerCart.innerHTML = '';
    
    cart.forEach(product => {

        const card = document.createElement('div');

        card.className = 'card mb-3';

        card.innerHTML = `
        <div class="row g-0">
         <div class="col-md-4">
            <img src=${product.data().image} class="img-fluid rounded-start" alt=${product.data().name}>
         </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${product.data().name}</h5>
                    <p class="card-text">${product.data().price}</p>
                </div>
            </div>
        </div>
        `;

        innerCart.append(card);

    });
}

const checkCart = (id) => cart.some(product => product.id === id);

const updateTotal = (price) => {

    const visualTotal = document.querySelector('.visualTotal');

    total += price;

    visualTotal.textContent = total;

}

const addToCart = async (e) => {

    if (checkCart(e.target.id)) {
        return false;
    }
    else {

        const productToCart = await getProduct(e.target.id);

        updateTotal(productToCart.data().price);
    
        cart.push(productToCart);
    
        renderCart();

    }


}

const addEvent = () => {

    const buyBtns = document.querySelectorAll('.buyBtn');
    
    buyBtns.forEach(btn=> btn.addEventListener('click', addToCart));
    
}

const renderCards = async (productsArr) => {

    const products = await productsArr;

    const cards = document.querySelector('.cards')

    products.forEach (product => {

        const card = document.createElement('div'); 
        
        card.className = 'card col-12 col-sm-10 col-md-6 col-lg-3 col-xl-2';
        
        card.innerHTML = `
        
        <img src=${product.data().image} class="card-img-top productImg" alt=${product.data().name}>

        <div class="card-body">
          <h5 class="card-title">${product.data().name}</h5>
          <p class="card-text text-success">${product.data().price} </p>
          <a href="#" class="btn btn-warning buyBtn" id=${product.id}>Comprar</a>
        </div>
        
        `;

        cards.append(card);
        
    });

    addEvent();

}

renderCards(getProducts());