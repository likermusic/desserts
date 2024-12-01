import { getItem, getItems } from "./api";
import { renderCartItem } from "./cart";

const productList = document.querySelector(".product-list");
// eslint-disable-next-line no-unused-vars
const renderProducts = (async () => {
  const resp = await getItems("/api/products");
  if (Array.isArray(resp) && resp.length > 0) {
    // доп проверка на !пустой массив
    const productsMarkup = resp.map(
      (product) => `
      <div class="product">
              <img src="${product.image.mobile}" alt="${product.name}">
              <!--<picture>
                <source srcset="${product.image.desktop}" media="(min-width: 1024px)">
                <source srcset="${product.image.tablet}" media="(min-width: 768px)">
                <source srcset="${product.image.mobile}" media="(min-width: 320px)">
                <source srcset="${product.image.thumbnail}" media="(min-width: 0px)">
              </picture>-->
              <h2>${product.name}</h2>
              <span><i>Category: </i>${product.category}</span>
              <p>$${product.price}</p>
              <button class="add-to-cart" data-id="${product.id}">  <img src="./src/assets/icons/icon-add-to-cart.svg"> <span>Add to Cart</span></button>
          </div>
    `,
    );

    productList.insertAdjacentHTML("beforeend", productsMarkup.join(""));
  } else {
    alert(resp);
  }
})();

const prepareProduct = async (e) => {
  if (e.target.matches(".add-to-cart, .add-to-cart *")) {
    const id = e.target.closest(".product").querySelector("button").dataset.id;

    const resp = await getItem(`/api/products/${id}`, async (resp) => {
      if (!resp.ok) {
        throw new Error("Ошибка получения данных");
      }
      const data = await resp.json();
      return data;
    });

    if (resp instanceof Object) {
      return resp;
    } else {
      alert(resp);
      return false;
    }
  }
};

productList.addEventListener("click", async (e) => {
  const resp = await prepareProduct(e);
  if (resp) {
    const product = resp;
    renderCartItem(product);
  }
});
