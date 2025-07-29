fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('populerApi');
    container.innerHTML = '';

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'w-60 border rounded-lg p-4 shadow hover:shadow-lg transition relative cursor-pointer';

      
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="h-40 w-40 object-contain mb-4 mx-auto">
        <button class="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 add-to-cart-btn" title="Tambah ke keranjang">
          🛒
        </button>
        <p class="font-medium text-sm mb-1">${product.title.substring(0, 20)}...</p>
        <h1 class="text-xl font-bold text-green-600 mb-1">Rp ${(product.price * 16000).toLocaleString('id-ID')}</h1>
        <p class="text-sm text-gray-500">${product.rating.rate} ★ | ${product.rating.count}+ Terjual</p>
      `;

      
      productCard.addEventListener('click', e => {
        if (e.target.closest('.add-to-cart-btn')) return; 

        localStorage.setItem('detailProduk', JSON.stringify(product));
        window.location.href = '../html/detailproduk.html';
      });

      // Event klik tombol keranjang
      productCard.querySelector('.add-to-cart-btn').addEventListener('click', e => {
        e.stopPropagation(); // Mencegah klik ke detail
        const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
        const hargaFinal = product.price * 16000;

        const existingIndex = keranjang.findIndex(item => item.id === product.id);

        if (existingIndex !== -1) {
          keranjang[existingIndex].quantity += 1;
        } else {
          keranjang.push({
            id: product.id,
            title: product.title,
            price: hargaFinal,
            image: product.image,
            quantity: 1
          });
        }

        localStorage.setItem('keranjang', JSON.stringify(keranjang));
        alert('Produk ditambahkan ke keranjang!');
      });

      container.appendChild(productCard);
    });
  });