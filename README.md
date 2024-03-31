#  Layered Architecture

<p>Saya mengimplementasikan Layered Architecture untuk memisahakan tiap tugas dan tanggung jawab dari masing-masing layer tersebut. </p>

<strong>Controller</strong>

<ul>
  <li>Sebagai Handler request dan response untuk tiap logic yang didapat dari service.</li>
  <li>Bisa juga sebagai handler validasi.</li>
</ul>

<strong>Service</strong>

<ul>
  <li>Mengurus bussiness logic.</li>
  <li>Memisahkan function sehingga dapat reuseable.</li>
</ul>

<strong>Repository </strong>

<ul>
  <li>Tugas dari layer ini adalah, untuk berkomunikasi dengan database.</li>
</ul>

<p>Dengan menerapkan layered architecture, saya dapat dengan mudah mengontrol dan mengatur fungsi dari masing-masing logic jika diperlukan perubahan pada bagian tertentu.</p>
