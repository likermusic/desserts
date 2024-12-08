import { getItem, addItem, updateItem, getItems } from "./api";

const renderCartItem = (item) => {
  const itemMarkup = `<li class="cart-item" data-id="${item.id}">
  <img width="10%"  src="${item.image.thumbnail}" alt="item">
  <span>${item.name}</span>
  <span><label class="quantity">${item.qty}</label> x <label class="price">$${item.price.toFixed(2)}</label></span>
  <img class="remove-item" src="assets/icons/icon-remove-item.svg" alt="">
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
};

document.addEventListener("DOMContentLoaded", async () => {
  const items = await getCartItems();

  if (items) {
    items.forEach((item) => {
      renderCartItem(item);
    });
  }
});
