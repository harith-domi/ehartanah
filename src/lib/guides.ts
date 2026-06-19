export interface GuideSection {
  heading: string;
  headingEn?: string;
  paragraphs: string[];
  paragraphsEn?: string[];
  bullets?: string[];
  bulletsEn?: string[];
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
        headingEn: 'What Is Rent-to-Own?',
        paragraphs: [
          'Sewa beli ialah cara memiliki rumah tanpa perlu lulus pinjaman bank dari awal. Anda menyewa rumah tersebut untuk tempoh tertentu (biasanya 3 hingga 5 tahun), dan sebahagian daripada bayaran sewa bulanan anda dikira sebagai simpanan ke arah harga belian rumah.',
          'Pada penghujung tempoh, anda diberi pilihan untuk membeli rumah tersebut pada harga yang telah dipersetujui dari awal — dan simpanan terkumpul anda dijadikan sebahagian daripada deposit.',
        ],
        paragraphsEn: [
          'Rent-to-own is a way to own a home without needing to pass a bank loan from day one. You rent the property for a set period (usually 3 to 5 years), and a portion of your monthly rent payment counts as savings toward the purchase price of the home.',
          'At the end of the period, you have the option to buy the property at a price agreed upon from the start — and your accumulated savings become part of the deposit.',
        ],
      },
      {
        heading: 'Bagaimana Ia Berfungsi?',
        headingEn: 'How Does It Work?',
        paragraphs: ['Proses sewa beli biasanya mengikut langkah berikut:'],
        paragraphsEn: ['The rent-to-own process typically follows these steps:'],
        bullets: [
          'Pilih rumah daripada senarai yang ditawarkan oleh penyedia program sewa beli',
          'Bayar deposit permulaan yang rendah — biasanya 2% hingga 5% sahaja (berbanding 10% + kos guaman untuk belian biasa)',
          'Tandatangan perjanjian yang mengunci harga belian rumah untuk 3-5 tahun akan datang',
          'Duduk di rumah tersebut dan bayar sewa bulanan — sebahagiannya masuk ke "tabung" pemilikan anda',
          'Pada penghujung tempoh, mohon loan bank untuk baki harga, atau jual balik opsyen anda',
        ],
        bulletsEn: [
          'Choose a home from listings offered by rent-to-own program providers',
          'Pay a low initial deposit — usually just 2% to 5% (compared to 10% + legal fees for a regular purchase)',
          'Sign an agreement that locks in the purchase price for the next 3–5 years',
          'Live in the home and pay monthly rent — a portion goes into your ownership fund',
          'At the end of the period, apply for a bank loan for the remaining balance, or sell back your option',
        ],
      },
      {
        heading: 'Siapa Yang Sesuai Dengan Sewa Beli?',
        headingEn: 'Who Is Rent-to-Own Suitable For?',
        paragraphs: ['Program ini direka khas untuk mereka yang mahu memiliki rumah tetapi menghadapi halangan:'],
        paragraphsEn: ['This program is designed specifically for those who want to own a home but face obstacles:'],
        bullets: [
          'Pembeli kali pertama yang belum cukup deposit 10%',
          'Mereka yang pernah ditolak loan bank kerana rekod CCRIS/CTOS',
          'Pekerja gig economy (Grab, penghantaran, freelance) tanpa slip gaji tetap',
          'Usahawan dan peniaga kecil yang pendapatannya tidak menentu di atas kertas',
          'Pasangan muda yang mahu masuk pasaran hartanah sebelum harga naik lagi',
        ],
        bulletsEn: [
          'First-time buyers who don\'t yet have enough for a 10% deposit',
          'Those who have been rejected by a bank due to CCRIS/CTOS records',
          'Gig economy workers (Grab, delivery, freelance) without a fixed payslip',
          'Entrepreneurs and small business owners whose income is irregular on paper',
          'Young couples who want to enter the property market before prices rise further',
        ],
      },
      {
        heading: 'Kos Sebenar: Apa Yang Perlu Anda Tahu',
        headingEn: 'The Real Cost: What You Need to Know',
        paragraphs: [
          'Sewa bulanan program sewa beli biasanya 10% hingga 20% lebih tinggi daripada sewa pasaran — itulah "harga" untuk mengunci harga rumah dan membina simpanan. Contohnya, jika sewa pasaran RM1,500, sewa beli mungkin RM1,700-RM1,800 sebulan.',
          'Pastikan anda tahu berapa peratus daripada sewa yang sebenarnya masuk ke tabung pemilikan anda. Program yang baik akan nyatakan ini dengan jelas dalam perjanjian — biasanya 20% hingga 30% daripada bayaran bulanan.',
        ],
        paragraphsEn: [
          'Rent-to-own monthly payments are typically 10% to 20% higher than market rent — that\'s the price of locking in the home\'s purchase price and building savings. For example, if market rent is RM1,500, rent-to-own might be RM1,700–RM1,800 per month.',
          'Make sure you know what percentage of the rent actually goes into your ownership fund. A good program will state this clearly in the agreement — usually 20% to 30% of the monthly payment.',
        ],
      },
      {
        heading: 'Perangkap Yang Perlu Dielakkan',
        headingEn: 'Pitfalls to Avoid',
        paragraphs: ['Bukan semua program sewa beli sama. Sebelum tandatangan apa-apa:'],
        paragraphsEn: ['Not all rent-to-own programs are the same. Before signing anything:'],
        bullets: [
          'Pastikan perjanjian dinyatakan secara bertulis berapa harga belian akhir — bukan "harga pasaran semasa"',
          'Semak apa berlaku kepada wang anda jika anda tidak jadi membeli — adakah ia hangus?',
          'Pastikan pemilik sebenar hartanah bersetuju dengan aturan ini (bukan hanya orang tengah)',
          'Dapatkan nasihat guaman sebelum menandatangani — kos RM300-500 boleh selamatkan puluhan ribu',
          'Elakkan program yang meminta yuran pendaftaran besar sebelum anda melihat sebarang rumah',
        ],
        bulletsEn: [
          'Ensure the agreement states in writing what the final purchase price is — not "current market price"',
          'Check what happens to your money if you decide not to buy — does it get forfeited?',
          'Make sure the actual property owner has agreed to this arrangement (not just a middleman)',
          'Get legal advice before signing — a RM300–500 fee can save tens of thousands',
          'Avoid programs that ask for large registration fees before you\'ve seen any properties',
        ],
      },
      {
        heading: 'Langkah Seterusnya',
        headingEn: 'Next Steps',
        paragraphs: [
          'Jika anda rasa sewa beli sesuai untuk situasi anda, mulakan dengan menyemak kelayakan anda. Di eHartanah, kami sediakan semakan kelayakan percuma 1 minit — jawab 4 soalan dan penasihat kami akan hubungi anda dengan pilihan yang sesuai.',
        ],
        paragraphsEn: [
          'If you feel rent-to-own suits your situation, start by checking your eligibility. At eHartanah, we provide a free 1-minute eligibility check — answer 4 questions and our advisor will contact you with suitable options.',
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
        headingEn: 'Why Was Your Loan Rejected?',
        paragraphs: [
          'Hampir 40% permohonan loan rumah di Malaysia ditolak. Sebab paling biasa: rekod CCRIS menunjukkan bayaran lewat, komitmen hutang melebihi 60-70% pendapatan (DSR tinggi), tiada bukti pendapatan tetap, atau pernah masuk senarai AKPK.',
          'Penting untuk tahu sebab sebenar penolakan anda — minta penjelasan daripada bank atau semak laporan CCRIS anda secara percuma di laman Bank Negara Malaysia.',
        ],
        paragraphsEn: [
          'Nearly 40% of home loan applications in Malaysia are rejected. The most common reasons: CCRIS records showing late payments, debt commitments exceeding 60–70% of income (high DSR), no proof of steady income, or a history with AKPK.',
          'It\'s important to know the real reason for your rejection — ask the bank for an explanation or check your CCRIS report for free at the Bank Negara Malaysia website.',
        ],
      },
      {
        heading: 'Pilihan 1: Sewa Beli (Rent-to-Own)',
        headingEn: 'Option 1: Rent-to-Own',
        paragraphs: [
          'Pilihan paling praktikal jika anda mahu masuk rumah segera. Anda tidak perlu lulus loan bank hari ini — anda duduk dulu, bina simpanan melalui sewa bulanan, dan mohon loan 3-5 tahun kemudian apabila rekod kredit anda sudah pulih.',
          'Deposit serendah 2-5%, dan harga rumah dikunci dari hari pertama. Sesuai untuk mereka yang yakin pendapatan akan stabil dalam beberapa tahun.',
        ],
        paragraphsEn: [
          'The most practical option if you want to move in immediately. You don\'t need to pass a bank loan today — move in first, build savings through monthly rent, and apply for a loan 3–5 years later when your credit record has recovered.',
          'Deposits as low as 2–5%, and the purchase price is locked from day one. Suitable for those confident their income will stabilize within a few years.',
        ],
      },
      {
        heading: 'Pilihan 2: Baiki CCRIS Dulu (6-12 Bulan)',
        headingEn: 'Option 2: Fix Your CCRIS First (6–12 Months)',
        paragraphs: ['Rekod CCRIS hanya menyimpan sejarah 12 bulan terkini. Ini bermakna anda boleh "bersihkan" rekod dengan disiplin:'],
        paragraphsEn: ['CCRIS records only store the last 12 months of history. This means you can clean your record with discipline:'],
        bullets: [
          'Bayar SEMUA komitmen tepat pada masa selama 12 bulan berturut-turut',
          'Langsaikan kad kredit tertunggak — atau tukar kepada pinjaman peribadi berstruktur',
          'Jangan mohon sebarang kredit baharu dalam tempoh ini',
          'Kurangkan DSR dengan melangsaikan hutang kecil (PTPTN, ansuran telefon)',
          'Selepas 12 bulan bersih, mohon semula — peluang lulus jauh lebih tinggi',
        ],
        bulletsEn: [
          'Pay ALL commitments on time for 12 consecutive months',
          'Settle outstanding credit card debt — or convert to a structured personal loan',
          'Don\'t apply for any new credit during this period',
          'Reduce your DSR by settling small debts (PTPTN, phone installments)',
          'After 12 clean months, reapply — your chances of approval are much higher',
        ],
      },
      {
        heading: 'Pilihan 3: Skim Kerajaan',
        headingEn: 'Option 3: Government Schemes',
        paragraphs: ['Beberapa skim membantu pembeli yang sukar lulus loan biasa:'],
        paragraphsEn: ['Several schemes help buyers who struggle to pass regular loans:'],
        bullets: [
          'Skim Rumah Pertamaku (SRP) — pembiayaan sehingga 110% untuk pembeli pertama bergaji bawah RM5,000',
          'PR1MA — rumah mampu milik dengan kriteria kelayakan lebih fleksibel',
          'Rumah Selangorku / RUMAWIP — untuk penduduk Selangor dan KL',
          'Lembaga Pembiayaan Perumahan Sektor Awam (LPPSA) — untuk penjawat awam, kelulusan lebih mudah',
        ],
        bulletsEn: [
          'Skim Rumah Pertamaku (SRP) — financing up to 110% for first-time buyers earning below RM5,000',
          'PR1MA — affordable housing with more flexible eligibility criteria',
          'Rumah Selangorku / RUMAWIP — for residents of Selangor and KL',
          'Lembaga Pembiayaan Perumahan Sektor Awam (LPPSA) — for civil servants, easier approval',
        ],
      },
      {
        heading: 'Pilihan 4: Pembeli Bersama (Joint Application)',
        headingEn: 'Option 4: Joint Application',
        paragraphs: [
          'Mohon bersama pasangan, adik-beradik, atau ibu bapa yang mempunyai rekod kredit bersih. Pendapatan digabungkan untuk DSR yang lebih baik. Pastikan persetujuan jelas tentang pemilikan — nama siapa di geran, siapa bayar apa.',
        ],
        paragraphsEn: [
          'Apply together with a spouse, sibling, or parent who has a clean credit record. Combined income gives a better DSR. Make sure there is a clear agreement about ownership — whose name is on the title, who pays what.',
        ],
      },
      {
        heading: 'Pilihan 5: Rumah Lelong (Dengan Berhati-hati)',
        headingEn: 'Option 5: Auction Properties (With Caution)',
        paragraphs: [
          'Rumah lelong dijual 20-30% bawah harga pasaran, jadi loan yang lebih kecil diperlukan — kadangkala cukup untuk lulus walaupun DSR anda ketat. Tetapi lelong ada risiko sendiri: tunggakan penyelenggaraan, penghuni enggan keluar, dan deposit 10% yang hangus jika loan tidak lulus. Buat kajian dulu.',
        ],
        paragraphsEn: [
          'Auction properties sell at 20–30% below market value, so a smaller loan is needed — sometimes enough to pass even with a tight DSR. But auctions have their own risks: maintenance arrears, unwilling occupants, and a 10% deposit forfeited if your loan doesn\'t come through. Do your research first.',
        ],
      },
      {
        heading: 'Kesimpulan',
        headingEn: 'Conclusion',
        paragraphs: [
          'Ditolak loan bukan penamat — ia cuma bermakna laluan konvensional tertutup buat masa ini. Pilihan paling sesuai bergantung pada situasi anda: jika perlu rumah segera, pertimbangkan sewa beli; jika boleh tunggu setahun, baiki CCRIS dulu.',
          'Tidak pasti pilihan mana sesuai? Gunakan semakan kelayakan percuma kami atau hubungi penasihat eHartanah melalui WhatsApp.',
        ],
        paragraphsEn: [
          'A rejected loan isn\'t the end — it just means the conventional path is temporarily closed. The right option depends on your situation: if you need a home urgently, consider rent-to-own; if you can wait a year, fix your CCRIS first.',
          'Not sure which option suits you? Use our free eligibility check or contact an eHartanah advisor via WhatsApp.',
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
        headingEn: 'The Core Difference',
        paragraphs: [
          'Sewa biasa: anda bayar untuk tinggal, habis bulan, duit tu hilang. Fleksibel — boleh pindah bila-bila selepas tempoh perjanjian.',
          'Sewa beli: anda bayar lebih sedikit setiap bulan, tetapi sebahagiannya terkumpul sebagai simpanan ke arah pemilikan rumah tersebut. Kurang fleksibel, tetapi setiap bulan membawa anda lebih dekat kepada memiliki aset.',
        ],
        paragraphsEn: [
          'Regular rental: you pay to live there, and at the end of the month, that money is gone. Flexible — you can move after the tenancy period.',
          'Rent-to-own: you pay a little more each month, but a portion accumulates as savings toward ownership of that property. Less flexible, but each month brings you closer to owning an asset.',
        ],
      },
      {
        heading: 'Perbandingan Kos: Contoh Sebenar',
        headingEn: 'Cost Comparison: A Real Example',
        paragraphs: ['Ambil contoh apartmen RM300,000 di Selangor:'],
        paragraphsEn: ['Take an RM300,000 apartment in Selangor as an example:'],
        bullets: [
          'Sewa biasa: RM1,500/bulan × 5 tahun = RM90,000 dibayar, RM0 terkumpul',
          'Sewa beli: RM1,800/bulan × 5 tahun = RM108,000 dibayar, ±RM27,000 terkumpul sebagai deposit',
          'Perbezaan bersih: anda bayar RM18,000 lebih, tetapi dapat RM27,000 deposit + harga rumah dikunci',
          'Bonus: jika nilai rumah naik ke RM340,000 dalam 5 tahun, keuntungan RM40,000 itu milik anda',
        ],
        bulletsEn: [
          'Regular rental: RM1,500/month × 5 years = RM90,000 paid, RM0 accumulated',
          'Rent-to-own: RM1,800/month × 5 years = RM108,000 paid, ±RM27,000 accumulated as deposit',
          'Net difference: you pay RM18,000 more, but get RM27,000 in deposit + a locked purchase price',
          'Bonus: if the property value rises to RM340,000 in 5 years, that RM40,000 gain is yours',
        ],
      },
      {
        heading: 'Bila Sewa Biasa Lebih Berbaloi',
        headingEn: 'When Regular Rental Makes More Sense',
        paragraphs: ['Sewa beli bukan untuk semua orang. Kekal dengan sewa biasa jika:'],
        paragraphsEn: ['Rent-to-own isn\'t for everyone. Stick with regular rental if:'],
        bullets: [
          'Kerjaya anda mungkin perlukan pindah negeri dalam 2-3 tahun',
          'Anda belum pasti kawasan mana mahu menetap lama',
          'Pendapatan anda belum stabil dan komitmen tambahan RM200-300 sebulan membebankan',
          'Anda boleh lulus loan bank sekarang — terus beli lebih jimat daripada sewa beli',
        ],
        bulletsEn: [
          'Your career might require you to relocate to another state within 2–3 years',
          'You\'re not yet sure which area you want to settle in long-term',
          'Your income isn\'t stable yet and an extra RM200–300/month commitment is a burden',
          'You can pass a bank loan now — buying outright is cheaper than rent-to-own',
        ],
      },
      {
        heading: 'Bila Sewa Beli Lebih Berbaloi',
        headingEn: 'When Rent-to-Own Makes More Sense',
        paragraphs: ['Sewa beli paling masuk akal jika:'],
        paragraphsEn: ['Rent-to-own makes the most sense if:'],
        bullets: [
          'Anda sudah tahu mahu menetap di kawasan tersebut 5+ tahun',
          'Loan bank ditolak tetapi pendapatan anda sebenarnya mampu bayar ansuran',
          'Anda bimbang harga rumah naik lebih cepat daripada kemampuan anda menyimpan deposit',
          'Anda perlukan masa untuk bersihkan rekod CCRIS sambil sudah duduk di rumah idaman',
        ],
        bulletsEn: [
          'You already know you want to settle in that area for 5+ years',
          'Your bank loan was rejected but your income can actually afford the installments',
          'You\'re worried property prices will rise faster than your ability to save for a deposit',
          'You need time to clean your CCRIS record while already living in your dream home',
        ],
      },
      {
        heading: 'Soalan Untuk Tanya Sebelum Tandatangan',
        headingEn: 'Questions to Ask Before Signing',
        paragraphs: ['Jika anda memilih sewa beli, pastikan jawapan kepada soalan ini jelas dalam perjanjian:'],
        paragraphsEn: ['If you choose rent-to-own, make sure these questions are clearly answered in the agreement:'],
        bullets: [
          'Berapa peratus sewa bulanan masuk ke tabung pemilikan saya?',
          'Apa berlaku kepada simpanan saya jika saya tidak jadi membeli?',
          'Bolehkah saya keluar awal? Apa penaltinya?',
          'Siapa tanggung kos penyelenggaraan sepanjang tempoh sewa?',
          'Adakah harga belian akhir tetap atau "harga pasaran semasa"?',
        ],
        bulletsEn: [
          'What percentage of my monthly rent goes into my ownership fund?',
          'What happens to my savings if I decide not to buy?',
          'Can I exit early? What are the penalties?',
          'Who covers maintenance costs throughout the rental period?',
          'Is the final purchase price fixed or "current market price"?',
        ],
      },
      {
        heading: 'Kesimpulan',
        headingEn: 'Conclusion',
        paragraphs: [
          'Sewa biasa membeli fleksibiliti. Sewa beli membeli masa — masa untuk membaiki kredit, mengumpul deposit, dan mengunci harga sebelum naik. Pilihan terbaik bergantung pada kestabilan hidup dan matlamat 5 tahun anda.',
          'Mahu tahu sama ada profil anda sesuai untuk sewa beli? Cuba semakan kelayakan percuma 1 minit di halaman Sewa Beli kami.',
        ],
        paragraphsEn: [
          'Regular rental buys flexibility. Rent-to-own buys time — time to repair your credit, accumulate a deposit, and lock in a price before it rises. The best choice depends on your life stability and your 5-year goals.',
          'Want to know if your profile is suitable for rent-to-own? Try our free 1-minute eligibility check on our Rent-to-Own page.',
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
