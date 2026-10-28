const searchInput = document.querySelector("#product-search-input");
const productGrid = document.querySelector("#product-grid");
const searchStatus = document.querySelector("#product-search-status");

if (searchInput && productGrid && searchStatus) {
  const products = Array.from(productGrid.querySelectorAll(".product-card"));
  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("fr")
      .trim();

  searchInput.addEventListener("input", () => {
    const query = normalize(searchInput.value);
    let visibleCount = 0;

    products.forEach((product) => {
      const name = normalize(product.querySelector("h2").textContent);
      const isMatch = name.includes(query);
      product.hidden = !isMatch;
      visibleCount += Number(isMatch);
    });

    searchStatus.textContent =
      visibleCount === 0
        ? `Aucune fleur ne correspond à « ${searchInput.value.trim()} ».`
        : "";
  });
}
