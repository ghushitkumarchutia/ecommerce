# Ecommerce Platform

A simple ecommerce front-end built with **HTML + CSS + JavaScript** using the public **DummyJSON** products API. It supports product listing with pagination, search with suggestions, product detail pages, and local visit/search history stored in `localStorage`.

## Features

- **Product listing** (home page)
  - Fetches products from DummyJSON
  - Displays products in a grid
  - Pagination controls
- **Search**
  - Search box on the home page
  - Redirects to a search results page
  - Search suggestions from saved search history
- **Product details**
  - Click any product card to open the product details page
- **History**
  - Stores visited products in `localStorage`
  - History page shows a list of recently visited products

## Pages

- `index.html` — Home / products listing + search box
- `search.html` — Search results for `?q=...`
- `product.html` — Product details for `?id=...`
- `history.html` — Visit history

## Tech Stack

- HTML5
- CSS3
- JavaScript
- API: https://dummyjson.com

## Project Structure

```
.
├── index.html
├── product.html
├── search.html
├── history.html
├── style.css
├── script.js
├── product.js
├── search.js
└── history.js
```

## Getting Started

### Option 1: Open directly

Because this is a static project, you can open `index.html` directly in your browser.

### Option 2 (Recommended): Run a local server

Some browsers apply stricter rules for local files. Running a local server is the most reliable.

#### Using VS Code Live Server

1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

Then open:

- http://localhost:5500/index.html

## How It Works

### API Usage

- Product list: `GET https://dummyjson.com/products`
- Product detail: `GET https://dummyjson.com/products/{id}`

### Local Storage Keys

- `searchHistory`: array of searched query strings
- `visitHistory`: array of objects like:

```json
{
  "id": 1,
  "title": "Product title",
  "time": "2026-02-01T12:34:56.789Z"
}
```

## Usage

- Browse products on the home page.
- Click a product card to open details (also saved to history).
- Use the search bar and press **Enter** or click **SEARCH**.
- Open **History** to see visited items.

## Troubleshooting

- **History shows empty**: visit a product first (click any product card), then open `history.html`.
- **Products not loading**: check your internet connection and confirm DummyJSON is reachable.
- **Search results empty**: try a different keyword (results filter by product title).

## Ideas for Improvements

- Search by category/brand and add sorting
- Add “clear history” and “clear suggestions” buttons
- Cache API responses in `localStorage` for faster reloads

## License

This project is for learning/demo purposes. You can add a license file if you plan to distribute it.
