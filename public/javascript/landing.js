fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('landingApi');
    container.innerHTML = '';

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = `
         w-full max-w-[200px] border rounded-lg p-3 shadow hover:scale-105 transition
        transform transition-transform duration-300 
        hover:scale-105 hover:shadow-lg 
        relative cursor-pointer bg-white
      `;

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="h-40 w-40 object-contain mb-4 mx-auto">
        <button class="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 add-to-cart-btn" title="Tambah ke keranjang">
          🛒
        </button>
        <p class="font-medium text-sm mb-1">${product.title.substring(0, 20)}...</p>
        <h1 class="text-xl font-bold text-green-600 mb-1">Rp ${(product.price * 16000).toLocaleString('id-ID')}</h1>
        <p class="text-sm text-gray-500">${product.rating.rate} ★ | ${product.rating.count}+ Terjual</p>
      `;

    
      productCard.addEventListener('click', (e) => {
        const isCartBtn = e.target.closest('.add-to-cart-btn');
        if (!isCartBtn) {
          const isLoggedIn = localStorage.getItem('isLoggedIn');
          if (isLoggedIn === 'true') {
            window.location.href = `detail.html?id=${product.id}`;
          } else {
            window.location.href = 'login.html';
          }
        }
      });

      container.appendChild(productCard);
    });
  })
  .catch(error => {
    console.error('Gagal fetch produk:', error);
  });
