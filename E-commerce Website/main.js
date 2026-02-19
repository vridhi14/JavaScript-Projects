
// ================= CART OPEN / CLOSE =================
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));


// ================= ADD TO CART =================
const cartContent = document.querySelector(".cart-content");

// Correct function (must be BEFORE event listeners)
function addToCart(productBox) {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    // Check duplicates
    const cartItems = document.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This product is already in the cart");
            return;
        }
    }

    // Create cart box
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increement">+</button>
            </div>
        </div>
        <i class="fa-solid fa-circle-minus cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);
//delete from the cart
    cartBox.querySelector(".cart-remove").addEventListener("click" , ()=>{
        cartBox.remove();
        UpdatedCartCount(-1);
        UpdatedTotalPrice();
    });

     cartBox.querySelector(".cart-quantity").addEventListener("click" , event=>{
        const numberElemet = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElemet.textContent;

        if(event.target.id === "decrement" && quantity >1){
            quantity-- ; 
            if(quantity === 1){
                decrementButton.style.color = "#999";
            } 
        }else if( event.target.id === "increement"){
                quantity++ ;
                decrementButton.style.color = "#333";
            }
          numberElemet.textContent = quantity ;  
          UpdatedTotalPrice();
    });
    UpdatedCartCount(1);
    UpdatedTotalPrice();
}


// ================= ADD-CART BUTTON LOGIC =================
const addCartButton = document.querySelectorAll(".add-cart");

addCartButton.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

// total price 
const UpdatedTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = document.querySelectorAll(".cart-box"); // FIX 1

    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");

        const price = Number(priceElement.textContent.replace("$",""));
        const quantity = Number(quantityElement.textContent); // FIX 2

        total += price * quantity;
    });

    totalPriceElement.textContent = "$" + total;
};


let cartItemCount = 0 ; 
const UpdatedCartCount = change =>{
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount +=change ;
    if(cartItemCount > 0){
        cartItemCountBadge.style.visibility = "visible"
;
cartItemCountBadge.textContent = cartItemCount;
    }
    else {
        cartItemCountBadge.style.visibility ="hidden";
        cartItemCountBadge.textContent ="" ;
    }
};
const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", ()=>{
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if(cartBoxes.length === 0){
        alert("Your cart is empty.Please add items to your cart before buying");
        return;
    }
    cartBoxes.forEach(cartBox => cartBox.remove());
    cartItemCount = 0 ; 
    UpdatedCartCount(0);
    UpdatedTotalPrice();
    alert("thank uh for ur purchase");
})