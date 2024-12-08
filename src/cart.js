import { showNotification } from "./alerts";
import {
  getItem,
  addItem,
  updateItem,
  getItems,
  removeOrUpdateItem,
  removeItem,
} from "./api";

const renderCartItem = (item) => {
  const itemMarkup = `<li class="cart-item" data-id="${item.id}">
  <img width="10%"  src="${item.image.thumbnail}" alt="item">
  <span>${item.name}</span>
  <span><label class="quantity">${item.qty}</label> x <label class="price">$${item.price.toFixed(2)}</label></span>
  <img class="remove-item" src="./src/assets/icons/icon-remove-item.svg" alt="">
</li>
`;
  document
    .querySelector(".cart-items")
    .insertAdjacentHTML("beforeend", itemMarkup);
};

const getCartItems = async () => {
  const resp = await getItems(`/api/cart`);
  if (Array.isArray(resp) && resp.length > 0) {
    return resp;
  } else if (!Array.isArray(resp)) {
    alert(resp);
  }
};

const updateTotals = async () => {
  const cart = await getCartItems();
  const cartCount = document.querySelector(".cart-count");
  const totalPrice = document.querySelector(".total-price");

  if (cart) {
    cartCount.textContent = cart.reduce((count, item) => {
      return count + item.qty;
    }, 0);

    totalPrice.textContent =
      "$" +
      cart
        .reduce((sum, item) => {
          return sum + item.qty * item.price;
        }, 0)
        .toFixed(2);
  } else {
    cartCount.textContent = "0";
    totalPrice.textContent = "$0.00";
  }
};

const updateCartItemQty = async (resp, item) => {
  resp.qty += 1;
  //Path запрос на обновление qty у этого товара в тбл
  const respUpdate = await updateItem(`/api/cart/${item.id}`, {
    qty: resp.qty,
  });

  if (respUpdate instanceof Object) {
    document.querySelector(
      `.cart-item[data-id="${item.id}"] .quantity`,
    ).textContent = resp.qty;
  } else {
    alert(respUpdate);
  }
};

export const addCartItem = async (item) => {
  const resp = await getItem(`/api/cart/${item.id}`, async (resp) => {
    if (!resp.ok) {
      return null;
    } else {
      const data = await resp.json();
      return data;
    }
  });

  if (resp !== null) {
    updateCartItemQty(resp, item);
  } else {
    item.qty = 1;
    const respAdd = await addItem("/api/cart", item);

    if (respAdd instanceof Object) {
      renderCartItem(item);
    } else {
      alert(respAdd);
    }
  }
  updateTotals();
};

const removeCartItem = async (e) => {
  if (e.target.matches(".remove-item")) {
    const cartItem = e.target.closest(".cart-item");
    const id = cartItem.dataset.id;
    const updatedItem = await removeOrUpdateItem(`/api/cart/${id}`);

    if (updatedItem && updatedItem.action === "update") {
      cartItem.querySelector(".quantity").textContent = updatedItem.item.qty;
    } else if (updatedItem && updatedItem.action === "remove") {
      e.target.closest(".cart-item").remove();
    }

    updateTotals();
  }
};

document.querySelector(".cart-items").addEventListener("click", (e) => {
  removeCartItem(e);

  showNotification("Товар удален");
});

document.querySelector(".confirm-order").addEventListener("click", async () => {
  const cart = await getCartItems();
  if (cart) {
    cart.forEach(async (item) => await removeItem(`/api/cart/${item.id}`));

    document.querySelector(".cart-items").innerHTML = "";
    updateTotals();
    alert("Спасибо, заказ оформлен!");
  } else {
    alert("Ваша корзина пуста!");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const items = await getCartItems();

  if (items) {
    items.forEach((item) => {
      renderCartItem(item);
    });
    updateTotals();
  }
});
