
document.addEventListener("DOMContentLoaded", () => {
let cart = [];
let cartTimeout;

const storedCart = localStorage.getItem("cart");
if(storedCart) {
    cart = JSON.parse(storedCart);
    updateCartCount();
    renderCart();
}

const addToCartButtons = document.querySelectorAll(".product-button");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productElement = button.parentElement;
        const productName = productElement.querySelector("h2").innerText;
        const productPrice = productElement.querySelector("p").innerText;

        cart.push({name: productName, price: productPrice});
        console.log("Aktualny koszyk: ", cart);
        updateCartCount();
        renderCart();
        saveCart();
    });
});

function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cart.length;
}

function renderCart() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    // Lewa strona: info + nazwa + cena
    const leftContainer = document.createElement("div");
    leftContainer.style.display = "flex";
    leftContainer.style.alignItems = "center";
    leftContainer.style.gap = "0.5rem";

    const infoIcon = document.createElement("i");
    infoIcon.className = "fas fa-info-circle info-icon";

    const productText = document.createElement("span");
    productText.textContent = `${item.name} - ${item.price}`;

    leftContainer.appendChild(infoIcon);
    leftContainer.appendChild(productText);

    // Prawa strona: X
    const removeButton = document.createElement("i");
    removeButton.className = "fas fa-times remove-button";
    removeButton.addEventListener("click", () => {
      removeItem(index);
    });

    // Dodaj do li
    li.appendChild(leftContainer);
    li.appendChild(removeButton);

    cartList.appendChild(li);
  });
}


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

const cartIcon = document.querySelector(".cart-wrapper");
const cartContainer = document.querySelector("#cart-container");
cartIcon.addEventListener("mouseenter", () => {
    clearTimeout(cartTimeout);
    cartContainer.style.display = "block"; 
});

cartIcon.addEventListener("mouseleave", () => {
    cartTimeout = setTimeout(() => {
        cartContainer.style.display = "none";
    }, 300);
});

});