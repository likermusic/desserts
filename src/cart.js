import { getItem, addItem } from "./api";

export const renderCartItem = async (item) => {
  const resp = await getItem(`/api/cart/${item.id}`);

  if (resp !== null) {
    item.qty += 1;
    document.querySelector(
      `.cart-item[data-id="${item.id}"] .quantity`,
    ).textContent = item.qty;

    //Path запрос на обновление qty у этого товара в тбл
  } else {
    item.qty = 1;
    const resp = await addItem("/api/cart", item);
    const item = `<li class="cart-item" data-id="${item.id}">
        <img width="10%"  src="${resp.image.thumbnail}" alt="item">
        <span>${resp.name}</span>
        <span><label class="quantity">${resp.quantity}</label> x <label class="price">$${resp.price.toFixed(2)}</label></span>
        <img class="remove-item" src="assets/icons/icon-remove-item.svg" alt="">
    </li>
    `;
    document.querySelector(".cart-items").insertAdjacentHTML("beforeend", item);
  }

  // if (resp instanceof Object) {
  // } else {
  //   alert(resp);
  // }
};
