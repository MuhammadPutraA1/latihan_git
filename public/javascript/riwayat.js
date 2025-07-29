window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('riwayat-container');
  const riwayat = JSON.parse(localStorage.getItem('riwayatPembelian')) || [];

  if (riwayat.length === 0) {
    container.innerHTML = '<p class="text-gray-500">Belum ada riwayat pembelian.</p>';
    return;
  }

  riwayat.reverse().forEach((transaksi, indexReversed) => {
    const item = document.createElement('div');
    item.className = 'border p-4 rounded shadow-sm bg-white';

    let produkHTML = '';
    transaksi.produk.forEach((prod, indexProduk) => {
      produkHTML += `
        <div class="flex items-start gap-4 mb-4 border p-2 rounded">
          <img src="${prod.image}" alt="${prod.title}" class="w-16 h-16 object-contain" />
          <div class="flex-1">
            <h2 class="font-semibold">${prod.title}</h2>
            <p>Qty: ${prod.quantity}</p>
            <p>Subtotal: Rp ${(prod.price * prod.quantity).toLocaleString('id-ID')}</p>
            <p class="text-green-600 font-medium">Status: Selesai</p>
            <button onclick="hapusProduk(${riwayat.length - 1 - indexReversed}, ${indexProduk})"
              class="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Hapus Produk Ini
            </button>
          </div>
        </div>
      `;
    });

    item.innerHTML = `
      <h2 class="font-bold text-lg mb-2">Pesanan #${riwayat.length - indexReversed}</h2>
      <p><strong>Nama:</strong> ${transaksi.infoPengiriman.nama}</p>
      <p><strong>Alamat:</strong> ${transaksi.infoPengiriman.alamat}</p>
      <p><strong>Metode:</strong> ${transaksi.infoPengiriman.metode}</p>
      <p><strong>Waktu:</strong> ${transaksi.infoPengiriman.waktu}</p>
      <div class="mt-4 space-y-2">${produkHTML}</div>
      <p class="text-right mt-4 font-bold text-green-600">Total: Rp ${transaksi.total.toLocaleString('id-ID')}</p>
      
    `;

    container.appendChild(item);
  });
});

function hapusRiwayat(index) {
  let riwayat = JSON.parse(localStorage.getItem('riwayatPembelian')) || [];
  riwayat.splice(index, 1);
  localStorage.setItem('riwayatPembelian', JSON.stringify(riwayat));
  location.reload();
}

function hapusProduk(indexTransaksi, indexProduk) {
  let riwayat = JSON.parse(localStorage.getItem('riwayatPembelian')) || [];

  // Hapus produk
  riwayat[indexTransaksi].produk.splice(indexProduk, 1);

  // Jika tidak ada produk tersisa, hapus seluruh transaksi
  if (riwayat[indexTransaksi].produk.length === 0) {
    riwayat.splice(indexTransaksi, 1);
  }

  localStorage.setItem('riwayatPembelian', JSON.stringify(riwayat));
  location.reload();
}
