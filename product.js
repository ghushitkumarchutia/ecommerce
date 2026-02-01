const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("product-detail");

if (!id) {
  container.innerHTML = "<p>Invalid product id</p>";
  throw new Error("Missing product id");
}

fetch(`https://dummyjson.com/products/${id}`)
  .then((res) => res.json())
  .then((product) => {
    container.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.thumbnail}" width="200">
      <p>${product.description}</p>
      <h3>₹ ${product.price}</h3>
    `;
  })
  .catch(() => {
    container.innerHTML = "<p>Unable to load product</p>";
  });
