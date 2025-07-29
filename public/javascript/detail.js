window.addEventListener('DOMContentLoaded', () => {
  function potongPenjelasan(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  let data = null;
  try {
    const stored = localStorage.getItem('detailProduk');
    if (stored && stored !== 'undefined') {
      data = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Gagal parsing detailProduk:', error);
  }

  if (data) {
    document.querySelector('#detailApi .produk-img').src = data.image;
    document.querySelector('#detailApi .produk-title').textContent = data.title;
    document.querySelector('#detailApi .sold').textContent = 'Terjual 220+';
    document.querySelector('#detailApi .price').textContent = `Rp ${Math.round(data.price * 16000).toLocaleString('id-ID')}`;
    document.querySelector('#detailApi .desc').innerHTML = potongPenjelasan(data.description, 100);
  } else {
    document.querySelector('#detailApi').innerHTML = '<p>Data produk tidak ditemukan.</p>';
  }

  console.log('DATA DI LOCALSTORAGE:', localStorage.getItem('detailProduk'));

  const jumlahElem = document.querySelector('.totalJum p:nth-child(2)');
  const plusBtn = document.querySelector('.totalJum p:nth-child(1)');
  const minusBtn = document.querySelector('.totalJum p:nth-child(3)');

  let jumlah = 1;
  jumlahElem.textContent = jumlah;

  plusBtn.addEventListener('click', () => {
    jumlah++;
    jumlahElem.textContent = jumlah;
  });

  minusBtn.addEventListener('click', () => {
    if (jumlah > 1) {
      jumlah--;
      jumlahElem.textContent = jumlah;
    }
  });

  function potongtext(teks, maxlength) {
    return teks.length > maxlength ? teks.slice(0, maxlength) + '...' : teks;
  }

  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById('kamuApi');
      const batasProduk = products.slice(0, 10);

      batasProduk.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'w-60 shadow-md p-4 bg-white flex flex-col justify-between hover:scale-105 transform transition duration-300';

        const potonganJudul = potongtext(product.title, 20);

        productCard.innerHTML = `
          <div>
            <img src="${product.image}" alt="${product.title}" class="h-40 w-40 object-contain mb-4 mx-auto">
            <p class="font-medium text-sm mb-1">${potonganJudul}</p>
            <h1 class="text-xl font-bold text-green-600 mb-1">Rp ${(product.price * 16000).toLocaleString('id-ID')}</h1>
            <p class="text-sm text-gray-500">${product.rating.rate} ★ | ${product.rating.count}+ Penjualan</p>
          </div>
        `;

        productCard.addEventListener('click', () => {
          localStorage.setItem('detailProduk', JSON.stringify(product));
          setTimeout(() => {
            window.location.href = '../html/detailproduk.html';
          }, 100);
        });

        container.appendChild(productCard);
      });
    })
    .catch(err => {
      console.error('Gagal mengambil data:', err);
    });

  const keranjangBtn = document.getElementById('beliBtn');

  keranjangBtn.addEventListener('click', () => {
    if (!data) {
      alert("Produk tidak ditemukan.");
      return;
    }

    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

    const existingItem = keranjang.find(item => item.id === data.id);

    if (existingItem) {
      existingItem.quantity += jumlah;
    } else {
      keranjang.push({
        id: data.id,
        title: data.title,
        price: Math.round(data.price * 16000),
        image: data.image,
        quantity: jumlah
      });
    }

    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    alert("Produk berhasil ditambahkan ke keranjang!");
  });

  const checkoutBtn = document.getElementById('checkoutBtn');

  checkoutBtn.addEventListener('click', () => {
    if (!data) {
      alert("Produk tidak ditemukan.");
      return;
    }

    localStorage.setItem('checkoutSementara', JSON.stringify([{
      id: data.id,
      title: data.title,
      price: Math.round(data.price * 16000),
      image: data.image,
      quantity: jumlah
    }]));

    window.location.href = '../html/checkout.html';
  });
});