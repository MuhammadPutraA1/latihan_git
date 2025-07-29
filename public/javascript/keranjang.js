document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cart-container');
  const totalElem = document.getElementById('total-harga');
  const checkoutButton = document.querySelector('button');

  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

  function renderKeranjang() {
    container.innerHTML = '';
    keranjang.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'flex gap-4 border p-4 rounded shadow items-center';

      itemDiv.innerHTML = `
        <input type="checkbox" class="checkout-checkbox" data-index="${index}">
        <img src="${item.image}" alt="${item.title}" class="w-24 h-24 object-contain">
        <div class="flex-1">
          <h2 class="font-bold">${item.title}</h2>
          <p class="text-sm text-gray-600">Rp ${item.price.toLocaleString('id-ID')}</p>

          <div class="flex items-center gap-2 mt-2">
            <button data-index="${index}" class="kurang-btn px-2 py-1 bg-gray-200 rounded">−</button>
            <span class="jumlah font-semibold">${item.quantity}</span>
            <button data-index="${index}" class="tambah-btn px-2 py-1 bg-gray-200 rounded">+</button>
          </div>

          <p class="text-blue-600 font-semibold mt-2">Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</p>
        </div>
        <button data-index="${index}" class="hapus-btn bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
      `;

      container.appendChild(itemDiv);
    });

    simpanKeranjang();
    aturEventListeners();
    updateTotal();
  }

  function simpanKeranjang() {
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
  }

  function aturEventListeners() {
    document.querySelectorAll('.tambah-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.dataset.index;
        keranjang[index].quantity++;
        renderKeranjang();
      });
    });

    document.querySelectorAll('.kurang-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.dataset.index;
        if (keranjang[index].quantity > 1) {
          keranjang[index].quantity--;
        }
        renderKeranjang();
      });
    });

    document.querySelectorAll('.hapus-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.dataset.index;
        keranjang.splice(index, 1);
        renderKeranjang();
      });
    });

    document.querySelectorAll('.checkout-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', updateTotal);
    });

    checkoutButton.addEventListener('click', () => {
      const selectedItems = [];

      document.querySelectorAll('.checkout-checkbox').forEach((checkbox, index) => {
        if (checkbox.checked) {
          selectedItems.push(keranjang[index]);
        }
      });

      if (selectedItems.length === 0) {
        alert('Pilih setidaknya satu produk untuk checkout!');
        return;
      }

      // Simpan item yang dipilih ke localStorage
      localStorage.setItem('checkoutSementara', JSON.stringify(selectedItems));

      // Redirect ke halaman checkout.html (pastikan path-nya benar)
      window.location.href = 'checkout.html'; // Ganti sesuai folder jika perlu
    });
  }

  function updateTotal() {
    let total = 0;
    document.querySelectorAll('.checkout-checkbox').forEach((checkbox, index) => {
      if (checkbox.checked) {
        const item = keranjang[index];
        total += item.price * item.quantity;
      }
    });
    totalElem.textContent = `Rp ${total.toLocaleString('id-ID')}`;
  }

  renderKeranjang();
});
