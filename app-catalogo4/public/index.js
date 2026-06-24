function loadProducts() {
  fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById('product-list');
      const template = document.getElementById('product-template');

      products.forEach(product => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.product-name').textContent = product.name;
        clone.querySelector('.product-description').textContent = product.description;
        clone.querySelector('.product-base_price').textContent = `€${product.base_price}`;
        clone.querySelector('.product-image').src = product.image_path;
        productList.appendChild(clone);
      });
    });
}

document.addEventListener('DOMContentLoaded', loadProducts);