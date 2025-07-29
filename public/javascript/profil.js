 function startEdit(field) {
      const textEl   = document.getElementById(`${field}-text`);
      // hindari membuka editor ganda
      if (!textEl) return;
      const current  = textEl.textContent.trim();

      // 1. buat elemen input
      const input = document.createElement('input');
      input.type        = 'text';
      input.value       = current;
      input.className   = 'border rounded px-2 py-1 text-sm flex-1';
      input.id          = `${field}-input`;

      // 2. tombol Simpan
      const btnSave = document.createElement('button');
      btnSave.textContent  = 'Simpan';
      btnSave.className    = 'ml-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded';
      btnSave.onclick      = () => saveEdit(field);

      // 3. tombol Batal
      const btnCancel = document.createElement('button');
      btnCancel.textContent = 'Batal';
      btnCancel.className   = 'ml-2 px-3 py-1 text-sm bg-gray-200 rounded';
      btnCancel.onclick     = () => cancelEdit(field, current);

      // 4. ganti span <-> input + tombol
      const parent  = textEl.parentElement;
      parent.replaceChild(input, textEl);
      parent.appendChild(btnSave);
      parent.appendChild(btnCancel);

      // auto‑focus input
      input.focus();
    }

    function saveEdit(field) {
      const inputEl = document.getElementById(`${field}-input`);
      if (!inputEl) return;
      const newVal  = inputEl.value.trim() || '(kosong)';

      // buat kembali span teks
      const span = document.createElement('span');
      span.textContent = newVal;
      span.id          = `${field}-text`;
      span.className   = 'text-gray-800';

      // ganti input + tombol -> span
      const parent = inputEl.parentElement;
      // hapus tombol simpan & batal (posisi di akhir)
      parent.removeChild(parent.lastChild); // batal
      parent.removeChild(parent.lastChild); // simpan
      parent.replaceChild(span, inputEl);
    }

    function cancelEdit(field, original) {
      const inputEl = document.getElementById(`${field}-input`);
      if (!inputEl) return;

      const span = document.createElement('span');
      span.textContent = original;
      span.id          = `${field}-text`;
      span.className   = 'text-gray-800';

      const parent = inputEl.parentElement;
      parent.removeChild(parent.lastChild); // batal
      parent.removeChild(parent.lastChild); // simpan
      parent.replaceChild(span, inputEl);
    }