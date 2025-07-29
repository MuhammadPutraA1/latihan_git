window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('checkout-produk');
  const totalElem = document.getElementById('checkout-total');

  
  let data = JSON.parse(localStorage.getItem('checkoutSementara'));

 
  if (!data || data.length === 0) {
    data = JSON.parse(localStorage.getItem('keranjang')) || [];
  }

  if (data.length === 0) {
    container.innerHTML = '<p class="text-gray-500">Tidak ada produk untuk checkout.</p>';
    totalElem.textContent = 'Rp 0';
    return;
  }

  let total = 0;

  data.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const productEl = document.createElement('div');
    productEl.className = 'flex items-center gap-4 p-4 border rounded';

    productEl.innerHTML = `
  <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain" />
  <div class="flex-1">
    <h2 class="font-bold">${item.title}</h2>
    <p>Qty: ${item.quantity}</p>
    <p>Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</p>
  </div>
`;

    container.appendChild(productEl);
  });

  totalElem.textContent = `Rp ${total.toLocaleString('id-ID')}`;

  const bayarBtn = document.getElementById('bayarBtn');
bayarBtn.addEventListener('click', () => {
  const nama = document.getElementById('nama').value.trim();
  const alamat = document.getElementById('alamat').value.trim();
  const metode = document.getElementById('metode').value;

  if (!nama || !alamat || !metode) {
    alert('Mohon lengkapi semua informasi pengiriman dan pilih metode pembayaran.');
    return;
  }

  
  const checkoutData = {
    nama,
    alamat,
    metode,
    waktu: new Date().toLocaleString(),
  };

  
  localStorage.removeItem('checkoutSementara');

  
const riwayat = JSON.parse(localStorage.getItem('riwayatPembelian')) || [];


const checkoutFinal = {
  produk: data,
  total,
  infoPengiriman: checkoutData,
};


riwayat.push(checkoutFinal);
localStorage.setItem('riwayatPembelian', JSON.stringify(riwayat));
  
  window.location.href = 'feedback.html';
});

});