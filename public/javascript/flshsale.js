
async function loadFlashSale() {
    const products = await fetchProducts();
    const flashSaleContainer = document.getElementById('flash-sale-container');

    // Display first 5 products as flash sale items
    products.slice(0, 5).forEach(product => {
        const flashSaleItem = document.createElement('div');
        flashSaleItem.className = 'relative bg-white rounded-lg shadow p-4 text-center shadow-md cursor-pointer';
        
        const discountedPrice = (product.price / 1.5).toFixed(2);

        flashSaleItem.innerHTML = `
            <div class="absolute top-2 right-2 bg-[#00171F] text-white text-xs px-2 py-0.5 rounded">-25%</div>
            <img src="${product.image}" 
                 alt="${product.title}" 
                 class="w-24 h-24 mx-auto mb-4 object-contain">
            <p class="text-base font-semibold mb-2">$${discountedPrice}</p>
            <div class="w-full bg-gray-300 h-6 rounded-full overflow-hidden">
                <div class="h-full flex items-center whitespace-nowrap justify-center text-center text-xol font-medium text-white" 
                     style="width: 60%; background-color: #1A1037;">
                    Stok Terbatas
                </div>
            </div>
        `;

        // Tambahkan harga diskon ke data yang dikirim ke halaman detail
        flashSaleItem.addEventListener('click', () => {
            const productWithDiscount = { ...product, discountedPrice };
            localStorage.setItem('selectedProduct', JSON.stringify(productWithDiscount));
            window.location.href = 'detailProduct.html';
        });

        flashSaleContainer.appendChild(flashSaleItem);
    });
}
