// Penerapan OOP dengan class Pendaftar
class Pendaftar {
    constructor(nama, umur, uangSangu) {
        this.nama = nama;
        this.umur = umur;
        this.uangSangu = uangSangu;
    }
}

// Array untuk menyimpan pendaftar
const pendaftarList = [];

// Fungsi asynchronous untuk menambah pendaftar
async function addPendaftar(nama, umur, uangSangu) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const pendaftar = new Pendaftar(nama, umur, uangSangu);
            pendaftarList.push(pendaftar);
            resolve(pendaftar);
        }, 500);
    });
}

// Fungsi untuk menghitung rata-rata
function hitungRataRata(data, key) {
    const total = data.reduce((sum, item) => sum + item[key], 0);
    return (total / data.length).toFixed(2);
}

// Fungsi untuk menampilkan resume
function tampilkanResume() {
    if (pendaftarList.length === 0) {
        document.getElementById('resume').innerHTML = 'Belum ada pendaftar.';
        return;
    }

    const rataRataUmur = hitungRataRata(pendaftarList, 'umur');
    const rataRataUangSangu = hitungRataRata(pendaftarList, 'uangSangu');

    document.getElementById('resume').innerHTML =
        `Rata-rata pendaftar memiliki uang sangu sebesar Rp${rataRataUangSangu} dengan rata-rata umur ${rataRataUmur} tahun.`;
}

// Fungsi untuk menambahkan pendaftar ke tabel
function tampilkanPendaftar() {
    const tbody = document.getElementById('pendaftarList');
    tbody.innerHTML = '';

    pendaftarList.forEach((pendaftar, index) => {
        const row = tbody.insertRow(index);
        row.insertCell(0).textContent = pendaftar.nama;
        row.insertCell(1).textContent = pendaftar.umur;
        row.insertCell(2).textContent = `Rp${pendaftar.uangSangu}`;
    });
}

// Event listener untuk form submit
document.getElementById('registrasiForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const umur = parseInt(document.getElementById('umur').value);
    const uangSangu = parseInt(document.getElementById('uangSangu').value);

    if (nama.length < 10) {
        document.getElementById('errorMessage').textContent = 'Nama harus minimal 10 karakter.';
        return;
    }
    if (umur < 25) {
        document.getElementById('errorMessage').textContent = 'Umur harus minimal 25 tahun.';
        return;
    }
    if (uangSangu < 100000 || uangSangu > 1000000) {
        document.getElementById('errorMessage').textContent = 'Uang sangu harus antara 100 ribu dan 1 juta.';
        return;
    }

    // Clear error message
    document.getElementById('errorMessage').textContent = '';

    // Menambah pendaftar secara asynchronous
    await addPendaftar(nama, umur, uangSangu);

    tampilkanPendaftar();
    tampilkanResume();

    // Tampilkan modal pop-up
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    // Reset form setelah modal ditutup
    successModal._element.addEventListener('hidden.bs.modal', function () {
        document.getElementById('registrasiForm').reset();
    });
});
