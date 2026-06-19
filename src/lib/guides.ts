export interface GuideSection {
  heading: string;
  headingEn?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  publishedAt: string;
  readMinutes: number;
  sections: GuideSection[];
}

export const guides: Guide[] = [
  {
    slug: 'cara-sewa-beli-rumah-malaysia',
    title: 'Cara Sewa Beli Rumah di Malaysia: Panduan Lengkap 2026',
    titleEn: 'How Rent-to-Own Works in Malaysia: Complete Guide 2026',
    description:
      'Apa itu sewa beli rumah (rent-to-own)? Bagaimana ia berfungsi, siapa yang layak, kos sebenar, dan perangkap yang perlu dielakkan. Panduan lengkap untuk pembeli Malaysia.',
    descriptionEn:
      'What is rent-to-own? How it works, who qualifies, the real costs, and pitfalls to avoid. A complete guide for Malaysian property buyers.',
    publishedAt: '2026-06-12',
    readMinutes: 7,
    sections: [
      {
        heading: 'Apa Itu Sewa Beli (Rent-to-Own)?',
        paragraphs: [
          'Sewa beli ialah cara memiliki rumah tanpa perlu lulus pinjaman bank dari awal. Anda menyewa rumah tersebut untuk tempoh tertentu (biasanya 3 hingga 5 tahun), dan sebahagian daripada bayaran sewa bulanan anda dikira sebagai simpanan ke arah harga belian rumah.',
          'Pada penghujung tempoh, anda diberi pilihan untuk membeli rumah tersebut pada harga yang telah dipersetujui dari awal — dan simpanan terkumpul anda dijadikan sebahagian daripada deposit.',
        ],
      },
      {
        heading: 'Bagaimana Ia Berfungsi?',
        paragraphs: ['Proses sewa beli biasanya mengikut langkah berikut:'],
        bullets: [
          'Pilih rumah daripada senarai yang ditawarkan oleh penyedia program sewa beli',
          'Bayar deposit permulaan yang rendah — biasanya 2% hingga 5% sahaja (berbanding 10% + kos guaman untuk belian biasa)',
          'Tandatangan perjanjian yang mengunci harga belian rumah untuk 3-5 tahun akan datang',
          'Duduk di rumah tersebut dan bayar sewa bulanan — sebahagiannya masuk ke "tabung" pemilikan anda',
          'Pada penghujung tempoh, mohon loan bank untuk baki harga, atau jual balik opsyen anda',
        ],
      },
      {
        heading: 'Siapa Yang Sesuai Dengan Sewa Beli?',
        paragraphs: ['Program ini direka khas untuk mereka yang mahu memiliki rumah tetapi menghadapi halangan:'],
        bullets: [
          'Pembeli kali pertama yang belum cukup deposit 10%',
          'Mereka yang pernah ditolak loan bank kerana rekod CCRIS/CTOS',
          'Pekerja gig economy (Grab, penghantaran, freelance) tanpa slip gaji tetap',
          'Usahawan dan peniaga kecil yang pendapatannya tidak menentu di atas kertas',
          'Pasangan muda yang mahu masuk pasaran hartanah sebelum harga naik lagi',
        ],
      },
      {
        heading: 'Kos Sebenar: Apa Yang Perlu Anda Tahu',
        paragraphs: [
          'Sewa bulanan program sewa beli biasanya 10% hingga 20% lebih tinggi daripada sewa pasaran — itulah "harga" untuk mengunci harga rumah dan membina simpanan. Contohnya, jika sewa pasaran RM1,500, sewa beli mungkin RM1,700-RM1,800 sebulan.',
          'Pastikan anda tahu berapa peratus daripada sewa yang sebenarnya masuk ke tabung pemilikan anda. Program yang baik akan nyatakan ini dengan jelas dalam perjanjian — biasanya 20% hingga 30% daripada bayaran bulanan.',
        ],
      },
      {
        heading: 'Perangkap Yang Perlu Dielakkan',
        paragraphs: ['Bukan semua program sewa beli sama. Sebelum tandatangan apa-apa:'],
        bullets: [
          'Pastikan perjanjian dinyatakan secara bertulis berapa harga belian akhir — bukan "harga pasaran semasa"',
          'Semak apa berlaku kepada wang anda jika anda tidak jadi membeli — adakah ia hangus?',
          'Pastikan pemilik sebenar hartanah bersetuju dengan aturan ini (bukan hanya orang tengah)',
          'Dapatkan nasihat guaman sebelum menandatangani — kos RM300-500 boleh selamatkan puluhan ribu',
          'Elakkan program yang meminta yuran pendaftaran besar sebelum anda melihat sebarang rumah',
        ],
      },
      {
        heading: 'Langkah Seterusnya',
        paragraphs: [
          'Jika anda rasa sewa beli sesuai untuk situasi anda, mulakan dengan menyemak kelayakan anda. Di eHartanah, kami sediakan semakan kelayakan percuma 1 minit — jawab 4 soalan dan penasihat kami akan hubungi anda dengan pilihan yang sesuai.',
        ],
      },
    ],
  },
  {
    slug: 'gagal-loan-bank-pilihan-anda',
    title: 'Gagal Loan Bank? 5 Pilihan Untuk Anda Masih Miliki Rumah',
    titleEn: 'Bank Loan Rejected? 5 Real Options to Still Own a Home in Malaysia',
    description:
      'Loan rumah ditolak bank? Anda bukan jalan mati. Ini 5 pilihan sebenar untuk memiliki rumah di Malaysia walaupun CCRIS bermasalah — termasuk sewa beli, skim kerajaan, dan pembaikan kredit.',
    descriptionEn:
      'Home loan rejected by the bank? It\'s not the end of the road. Here are 5 real options to own property in Malaysia even with a bad CCRIS — including rent-to-own, government schemes, and credit repair.',
    publishedAt: '2026-06-12',
    readMinutes: 6,
    sections: [
      {
        heading: 'Kenapa Loan Anda Ditolak?',
        paragraphs: [
          'Hampir 40% permohonan loan rumah di Malaysia ditolak. Sebab paling biasa: rekod CCRIS menunjukkan bayaran lewat, komitmen hutang melebihi 60-70% pendapatan (DSR tinggi), tiada bukti pendapatan tetap, atau pernah masuk senarai AKPK.',
          'Penting untuk tahu sebab sebenar penolakan anda — minta penjelasan daripada bank atau semak laporan CCRIS anda secara percuma di laman Bank Negara Malaysia.',
        ],
      },
      {
        heading: 'Pilihan 1: Sewa Beli (Rent-to-Own)',
        paragraphs: [
          'Pilihan paling praktikal jika anda mahu masuk rumah segera. Anda tidak perlu lulus loan bank hari ini — anda duduk dulu, bina simpanan melalui sewa bulanan, dan mohon loan 3-5 tahun kemudian apabila rekod kredit anda sudah pulih.',
          'Deposit serendah 2-5%, dan harga rumah dikunci dari hari pertama. Sesuai untuk mereka yang yakin pendapatan akan stabil dalam beberapa tahun.',
        ],
      },
      {
        heading: 'Pilihan 2: Baiki CCRIS Dulu (6-12 Bulan)',
        paragraphs: ['Rekod CCRIS hanya menyimpan sejarah 12 bulan terkini. Ini bermakna anda boleh "bersihkan" rekod dengan disiplin:'],
        bullets: [
          'Bayar SEMUA komitmen tepat pada masa selama 12 bulan berturut-turut',
          'Langsaikan kad kredit tertunggak — atau tukar kepada pinjaman peribadi berstruktur',
          'Jangan mohon sebarang kredit baharu dalam tempoh ini',
          'Kurangkan DSR dengan melangsaikan hutang kecil (PTPTN, ansuran telefon)',
          'Selepas 12 bulan bersih, mohon semula — peluang lulus jauh lebih tinggi',
        ],
      },
      {
        heading: 'Pilihan 3: Skim Kerajaan',
        paragraphs: ['Beberapa skim membantu pembeli yang sukar lulus loan biasa:'],
        bullets: [
          'Skim Rumah Pertamaku (SRP) — pembiayaan sehingga 110% untuk pembeli pertama bergaji bawah RM5,000',
          'PR1MA — rumah mampu milik dengan kriteria kelayakan lebih fleksibel',
          'Rumah Selangorku / RUMAWIP — untuk penduduk Selangor dan KL',
          'Lembaga Pembiayaan Perumahan Sektor Awam (LPPSA) — untuk penjawat awam, kelulusan lebih mudah',
        ],
      },
      {
        heading: 'Pilihan 4: Pembeli Bersama (Joint Application)',
        paragraphs: [
          'Mohon bersama pasangan, adik-beradik, atau ibu bapa yang mempunyai rekod kredit bersih. Pendapatan digabungkan untuk DSR yang lebih baik. Pastikan persetujuan jelas tentang pemilikan — nama siapa di geran, siapa bayar apa.',
        ],
      },
      {
        heading: 'Pilihan 5: Rumah Lelong (Dengan Berhati-hati)',
        paragraphs: [
          'Rumah lelong dijual 20-30% bawah harga pasaran, jadi loan yang lebih kecil diperlukan — kadangkala cukup untuk lulus walaupun DSR anda ketat. Tetapi lelong ada risiko sendiri: tunggakan penyelenggaraan, penghuni enggan keluar, dan deposit 10% yang hangus jika loan tidak lulus. Buat kajian dulu.',
        ],
      },
      {
        heading: 'Kesimpulan',
        paragraphs: [
          'Ditolak loan bukan penamat — ia cuma bermakna laluan konvensional tertutup buat masa ini. Pilihan paling sesuai bergantung pada situasi anda: jika perlu rumah segera, pertimbangkan sewa beli; jika boleh tunggu setahun, baiki CCRIS dulu.',
          'Tidak pasti pilihan mana sesuai? Gunakan semakan kelayakan percuma kami atau hubungi penasihat eHartanah melalui WhatsApp.',
        ],
      },
    ],
  },
  {
    slug: 'sewa-beli-vs-sewa-biasa',
    title: 'Sewa Beli vs Sewa Biasa: Mana Lebih Berbaloi Untuk Anda?',
    titleEn: 'Rent-to-Own vs Regular Rental: Which Is Better for You?',
    description:
      'Perbandingan jujur antara sewa beli (rent-to-own) dan sewa biasa di Malaysia. Kira kos sebenar, kelebihan, kekurangan, dan situasi mana setiap satu lebih berbaloi.',
    descriptionEn:
      'An honest comparison between rent-to-own and regular rental in Malaysia. Calculate the real costs, pros, cons, and which option makes more financial sense for your situation.',
    publishedAt: '2026-06-12',
    readMinutes: 5,
    sections: [
      {
        heading: 'Perbezaan Asas',
        paragraphs: [
          'Sewa biasa: anda bayar untuk tinggal, habis bulan, duit tu hilang. Fleksibel — boleh pindah bila-bila selepas tempoh perjanjian.',
          'Sewa beli: anda bayar lebih sedikit setiap bulan, tetapi sebahagiannya terkumpul sebagai simpanan ke arah pemilikan rumah tersebut. Kurang fleksibel, tetapi setiap bulan membawa anda lebih dekat kepada memiliki aset.',
        ],
      },
      {
        heading: 'Perbandingan Kos: Contoh Sebenar',
        paragraphs: ['Ambil contoh apartmen RM300,000 di Selangor:'],
        bullets: [
          'Sewa biasa: RM1,500/bulan × 5 tahun = RM90,000 dibayar, RM0 terkumpul',
          'Sewa beli: RM1,800/bulan × 5 tahun = RM108,000 dibayar, ±RM27,000 terkumpul sebagai deposit',
          'Perbezaan bersih: anda bayar RM18,000 lebih, tetapi dapat RM27,000 deposit + harga rumah dikunci',
          'Bonus: jika nilai rumah naik ke RM340,000 dalam 5 tahun, keuntungan RM40,000 itu milik anda',
        ],
      },
      {
        heading: 'Bila Sewa Biasa Lebih Berbaloi',
        paragraphs: ['Sewa beli bukan untuk semua orang. Kekal dengan sewa biasa jika:'],
        bullets: [
          'Kerjaya anda mungkin perlukan pindah negeri dalam 2-3 tahun',
          'Anda belum pasti kawasan mana mahu menetap lama',
          'Pendapatan anda belum stabil dan komitmen tambahan RM200-300 sebulan membebankan',
          'Anda boleh lulus loan bank sekarang — terus beli lebih jimat daripada sewa beli',
        ],
      },
      {
        heading: 'Bila Sewa Beli Lebih Berbaloi',
        paragraphs: ['Sewa beli paling masuk akal jika:'],
        bullets: [
          'Anda sudah tahu mahu menetap di kawasan tersebut 5+ tahun',
          'Loan bank ditolak tetapi pendapatan anda sebenarnya mampu bayar ansuran',
          'Anda bimbang harga rumah naik lebih cepat daripada kemampuan anda menyimpan deposit',
          'Anda perlukan masa untuk bersihkan rekod CCRIS sambil sudah duduk di rumah idaman',
        ],
      },
      {
        heading: 'Soalan Untuk Tanya Sebelum Tandatangan',
        paragraphs: ['Jika anda memilih sewa beli, pastikan jawapan kepada soalan ini jelas dalam perjanjian:'],
        bullets: [
          'Berapa peratus sewa bulanan masuk ke tabung pemilikan saya?',
          'Apa berlaku kepada simpanan saya jika saya tidak jadi membeli?',
          'Bolehkah saya keluar awal? Apa penaltinya?',
          'Siapa tanggung kos penyelenggaraan sepanjang tempoh sewa?',
          'Adakah harga belian akhir tetap atau "harga pasaran semasa"?',
        ],
      },
      {
        heading: 'Kesimpulan',
        paragraphs: [
          'Sewa biasa membeli fleksibiliti. Sewa beli membeli masa — masa untuk membaiki kredit, mengumpul deposit, dan mengunci harga sebelum naik. Pilihan terbaik bergantung pada kestabilan hidup dan matlamat 5 tahun anda.',
          'Mahu tahu sama ada profil anda sesuai untuk sewa beli? Cuba semakan kelayakan percuma 1 minit di halaman Sewa Beli kami.',
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
