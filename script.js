
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

/*AUTHORIZATION MODAL*/

const authModal = document.getElementById("auth-modal");
const blurBackground = document.getElementById("blur-background");
const closeAuthModal = document.getElementById("close-modal");
const authForm = document.getElementById("auth-form");
const registerForm = document.getElementById("register-form");
const modalTitle = document.getElementById("modal-title");
const toggleAuthMode = document.getElementById("toggle-auth-mode");
const loginTrigger = document.getElementById("login-btn");
let isRegistering = false;

toggleAuthMode.addEventListener("click", () => {
    isRegistering = !isRegistering;

    if (isRegistering) {
        authForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        modalTitle.textContent = "Create Account";
        toggleAuthMode.innerHTML = 'Do you have an account? <strong> Log In</strong>';
    } else {
        authForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
        modalTitle.textContent = "Login";
        toggleAuthMode.innerHTML = 'New here? <strong>Create an account</strong>';
    }
});

loginTrigger.addEventListener("click", () => {
  authModal.classList.remove("hidden");
  blurBackground.classList.remove("hidden");
});

closeAuthModal.addEventListener("click", () => {
  authModal.classList.add("hidden");
  blurBackground.classList.add("hidden");
});

blurBackground.addEventListener("click", () => {
  authModal.classList.add("hidden");
  blurBackground.classList.add("hidden");
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  console.log(`Zalogowano jako: ${username}`);

  localStorage.setItem("isLoggedIn", "true");

  authModal.classList.add("hidden");
  blurBackground.classList.add("hidden");
});


/*PRODUCT'S MODALS*/

const modal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");
const closeButton = document.querySelector(".close-button");

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && ! modal.classList.contains("hidden")) {
        modal.classList.add("hidden");
    }
});

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
        const unit = product.getAttribute("data-unit") || "kg";

        modalBody.innerHTML = `
            <img src="${img}" alt="${name}" style="max-width: 100%; border-radius: 8px;">
            <h2 style="margin-top: 1rem;">${name}</h2>
            <p>${price} / ${unit}</p>
            <p style="font-size: 0.9rem; color: #555;">Lorem ipsum dolor sit amet</p>
            <label for="quantity" style="font-size: 0.9rem">Select quantity (${unit}):</label>
            <input type="number" id="quantity" name="quantity" min="0" value="1" style="width: 15%; margin-bottom: 1rem;
            padding: 0.5rem; border:1px solid #ccc; border-radius: 5px;">
            <p style="display: inline-block"></p>
            <div class="modal-buttons">
                <button class="modal-btn modal-btn-confirm">Add to cart</button>
                <button class="modal-btn modal-btn-cancel">Cancel</button>
            </div>`;


            const addButton = modalBody.querySelector(".modal-btn-confirm");
            const cancelButton = modalBody.querySelector(".modal-btn-cancel");
            const quantityInput = modalBody.querySelector("#quantity");
            const toast = document.getElementById("toast-message");

            addButton.addEventListener("click", () => {
                const quantity = parseFloat(quantityInput.value) || 1;
                toast.innerHTML = `<em>added to cart</em>`;
                toast.classList.add("show");

                setTimeout(() => {
                    toast.classList.remove("show");
                }, 1500);
            });

            cancelButton.addEventListener("click", () => {
                modal.querySelector(".modal-content").classList.add("fade-out");
                setTimeout(() => {
                    modal.classList.add("hidden");
                    modal.querySelector(".modal-content").classList.remove("fade-out");
                }, 500);
            });

            modal.classList.remove("hidden");
    });
});

});


let names = ["Ala", "Bartek", "Celina", "Damian", "Ela", "Franek", "Gosia", "Hubert", "Iga", "Jan"];

let users = Array.from({length: names.length}, (_, i) => {
    return {
        "id": i+1,
        "username": names[i],
        "online": false
    };
});

users.forEach(user => {
    if(!user.online) {
        console.log(user.username);
    }
});

users = users.map(user => {
    if (["A", "B", "C"].includes(user.username[0])) {
        return { ...user, online: true};
    }
    return user;
});