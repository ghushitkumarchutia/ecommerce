const container = document.getElementById("history-container");

let visits = JSON.parse(localStorage.getItem("visitHistory")) || [];

visits.sort((a, b) => new Date(b.time) - new Date(a.time));

function saveVisit(id, title) {
  let current = JSON.parse(localStorage.getItem("visitHistory")) || [];

  const visitData = {
    id,
    title,
    time: new Date().toISOString(),
  };

  current.push(visitData);
  localStorage.setItem("visitHistory", JSON.stringify(current));
}

if (visits.length === 0) {
  container.innerHTML = "<p>No history found 😢</p>";
}

visits.forEach((item) => {
  const div = document.createElement("div");
  div.className = "history-item";

  const date = new Date(item.time).toLocaleString();

  div.innerHTML = `
    <h3>${item.title}</h3>
    <p>Visited at: ${date}</p>
  `;

  div.addEventListener("click", () => {
    saveVisit(item.id, item.title);
    window.location.href = `product.html?id=${item.id}`;
  });

  container.appendChild(div);
});
