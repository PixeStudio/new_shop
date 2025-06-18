
document.addEventListener("DOMContentLoaded", () => {
    let cart = [];
    let cartTimeout;
    const isLoggedIn = false;

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

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "(pusty)";
        emptyMessage.style.color = "#888";
        emptyMessage.fontSize = "0.9rem";
        emptyMessage.marginTop = "0.5rem";
        emptyMessage.style.borderTop = "1px solid #ddd";
        emptyMessage.style.paddingTop = "0.5rem";
        cartList.appendChild(emptyMessage);
    }

    cart.forEach((item, index) => {
        const li = document.createElement("li");

        const leftContainer = document.createElement("div");
        leftContainer.style.display = "flex"
        leftContainer.style.flexDirection = "column";
        leftContainer.style.alignItems = "flex-start";

        const productName = document.createElement("span");
        productName.textContent = item.name;
        productName.classList.add("product-name");
        productName.style.marginBottom = "0.25rem";
        productName.style.color = "#434343";
        productName.style.fontSize = "0.9em";
        productName.style.fontWeight = "bold";
        

        const productPrice = document.createElement("span");
        productPrice.textContent = item.price;
        productPrice.classList.add("product-price");
        productPrice.style.fontSize = "0.82em";
        productPrice.style.color = "#525252";
        productPrice.style.fontWeight = "bold";


        leftContainer.appendChild(productName);
        leftContainer.appendChild(productPrice);

        const rightContainer = document.createElement("div");
        rightContainer.style.display = "flex";
        rightContainer.style.alignItems = "center";
        rightContainer.style.gap = "0.5rem";

        const infoIcon = document.createElement("i")
        infoIcon.className = "fas fa-info-circle info-icon";

        const removeButton = document.createElement("i");
        removeButton.className = "fas fa-times remove-button";
        removeButton.addEventListener("click", () =>{
            removeItem(index);
        });

        rightContainer.appendChild(infoIcon);
        rightContainer.appendChild(removeButton);

        li.appendChild(leftContainer);
        li.appendChild(rightContainer);

        cartList.appendChild(li);
    });
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

const cartIcon = document.querySelector(".cart-wrapper");
const cartContainer = document.querySelector("#cart-container");
let hideCartTimeout;
cartIcon.addEventListener("mouseenter", () => {
    cartContainer.style.display = "block";
    setTimeout(() => {
    cartContainer.classList.add("show");
}, 10);
});

cartIcon.addEventListener("mouseleave", () => {
    hideCartTimeout = setTimeout(() => {
        cartContainer.classList.remove("show");
        setTimeout(() => {
            cartContainer.style.display = "none";
        }, 300);
    }, 500);
});

cartContainer.addEventListener("mouseenter", () => {
    clearTimeout(hideCartTimeout);
});

cartContainer.addEventListener("mouseleave", () => {
    cartContainer.classList.remove("show");
    setTimeout(() => {
        cartContainer.style.display = "none";
    }, 300);
});

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
    saveCart();
}

/*PRODUCT'S MODALS*/

const modal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");
const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.classList.add("hidden");
    }
});

document.querySelectorAll(".product").forEach((product) =>{
    product.addEventListener("click", () =>{
        const name = product.querySelector("h2").textContent;
        const price = product.querySelector("p").textContent;
        const img= product.querySelector("img").getAttribute("src");

        modalBody.innerHTML = `
            <img src="${img}" alt="${name}" style="max-width: 100%; border-radius: 8px;">
            <h2 style="margin-top: 1rem;">${name}</h2>
            <p>${price}</p>
            <p style="font-size: 0.9rem; color: #555;">Lorem ipsum dolor sit amet</p>
            <div class="modal-buttons">
                <button class="modal-btn modal-btn-confirm">Add to cart</button>
                <button class="modal-btn modal-btn-cancel">Cancel</button>
            </div>`;
            modal.classList.remove("hidden");
    });
});

});