const container = document.getElementById("product-container");
const inputBox = document.getElementById("inputBox");
const btn = document.getElementById("btn");
const suggestionBox = document.getElementById("suggestions");

let allProducts = [];
let currentPage = 1;
let itemsPerPage = 8;

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data.products;
    renderPaginatedProducts();
  })
  .catch((err) => console.error("Error fetching products:", err));

function renderProducts(products) {
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.thumbnail;

    const title = document.createElement("h3");
    title.innerText = product.title;

    const desc = document.createElement("p");
    desc.innerText = product.description.slice(0, 60) + "...";

    const price = document.createElement("p");
    price.className = "price";
    price.innerText = "₹ " + product.price;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(price);

    card.addEventListener("click", () => {
      saveVisit(product);
      window.location.href = `product.html?id=${product.id}`;
    });

    container.appendChild(card);
  });
}

function saveSearch(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  if (!history.includes(query)) {
    history.push(query);
  }

  localStorage.setItem("searchHistory", JSON.stringify(history));
}

function showSuggestions(text = "") {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  suggestionBox.innerHTML = "";

  const filtered = history.filter((item) =>
    item.toLowerCase().includes(text.toLowerCase()),
  );

  if (filtered.length === 0) {
    suggestionBox.style.display = "none";
    return;
  }

  filtered.forEach((item) => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerText = item;

    div.addEventListener("click", () => {
      inputBox.value = item;
      suggestionBox.style.display = "none";
    });

    suggestionBox.appendChild(div);
  });

  suggestionBox.style.display = "block";
}

inputBox.addEventListener("input", () => {
  const text = inputBox.value.trim();
  showSuggestions(text);
});

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

btn.addEventListener("click", () => {
  const query = inputBox.value.trim();
  if (!query) return;
  saveSearch(query);
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-box")) {
    suggestionBox.style.display = "none";
  }
});

function saveVisit(product) {
  let visits = JSON.parse(localStorage.getItem("visitHistory")) || [];

  const visitData = {
    id: product.id,
    title: product.title,
    time: new Date().toISOString(), // timestamp
  };

  visits.push(visitData);

  localStorage.setItem("visitHistory", JSON.stringify(visits));
}

function renderPaginationButtons() {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    if (i === currentPage) {
      btn.className = "active-page";
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      renderPaginatedProducts();
    });

    paginationDiv.appendChild(btn);
  }
}

function renderPaginatedProducts() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedProducts = allProducts.slice(start, end);

  renderProducts(paginatedProducts);
  renderPaginationButtons();
}
