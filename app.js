const products = [
    { id: 1, name: "Remera Negra", price: 15000, description: "Producto A Descripción", image: "/assets/negra-21-b1c72bbcebc7feb9b816405376283015-1024-1024.jpg" },
    { id: 2, name: "Remera Blanca", price: 20000, description: "Producto B Descripción", image: "/assets/remera-adulto-unisex-blanca-sublimable.jpg" },
];

const filteredProducts = products.filter(product => product.price > 150);
const productNames = products.map(product => product.name);
const totalPrice = products.reduce((total, product) => total + product.price, 0);

function displayProducts(productList) {
    const content = document.getElementById('content');
    content.innerHTML = ''; 

    productList.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');


        card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
<button data-id="${product.id}">
                <img src="assets/png-transparent-shopping-cart-icon-shopping-cart-black-design-trade-thumbnail.png" alt="Agregar al Carrito" style="width: 16px; vertical-align: middle;">
                Agregar al Carrito
            </button>
        `
        card.querySelector('button').addEventListener('click', (event) => {
            addToCart(event.target.dataset.id);
        });

        content.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    if (product) {
        alert(`${product.name} ha sido agregado al carrito.`);
    } else {
        alert('Producto no encontrado.');
    }
}

function loadLocalData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

function loadExternalData() {
    axios.get('https://api.example.com/products')
        .then(response => {
            displayProducts(response.data);
        })
        .catch(error => console.error('Error al cargar datos de la API:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadLocalData();
});


