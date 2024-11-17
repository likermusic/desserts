export const getItems = async (url) => {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("Ошибка получения данных");
    }
    const data = await resp.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const printItem = (item, parent, position) => {
  document.querySelector(parent).insertAdjacentHTML(position, item);
};

const productsHandler = (products) => {
  console.log(products);

  if (products.length > 0) {
    products.forEach((product) => {
      const productMockup = `<div class="product">
              <!--<img src="${product.image.desktop}" alt="${product.name}">-->
              <picture>
                <source srcset="${product.image.desktop}" media="(min-width: 1024px)">
                <source srcset="${product.image.tablet}" media="(min-width: 768px)">
                <source srcset="${product.image.mobile}" media="(min-width: 320px)">
                <source srcset="${product.image.thumbnail}" media="(min-width: 0px)">
              </picture>
              <h2>${product.name}</h2>
              <p>$${product.price}</p>
              <button data-id="${product.id}">  <img src="./src/assets/icons/icon-add-to-cart.svg" class="add-to-cart"> <span>Add to Cart</span></button>
          </div>`;
      printItem(productMockup, ".product-list", "beforeend");
    });
  } else {
    alert("Ошибка получения товаров");
  }
};

const asyncWrapper = async () => {
  const products = await getItems("http://localhost:3001/products");
  productsHandler(products);
};
asyncWrapper();

// getItems("http://localhost:3001/products").then((products) =>
//   productsHandler(products),
// );