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
    slug: 'cara-beli-hartanah-lelong-bank',
    title: 'Panduan Lengkap Beli Hartanah Lelong Bank di Malaysia',
    titleEn: 'Complete Guide to Buying Bank Auction Property in Malaysia',
    description:
      'Apa itu hartanah lelong bank, perbezaan LACA dan Non-LACA, langkah-langkah untuk menyertai bidaan, risiko sebenar, dan tips untuk pembeli pertama yang mahu untung dari lelong.',
    descriptionEn:
      'What is a bank auction property, the difference between LACA and Non-LACA, steps to bid, real risks, and tips for first-timers looking to profit from auctions in Malaysia.',
    publishedAt: '2026-06-22',
    readMinutes: 8,
    sections: [
      {
        heading: 'Apa Itu Hartanah Lelong Bank?',
        headingEn: 'What Is a Bank Auction Property?',
        paragraphs: [
          'Hartanah lelong bank (atau dikenali sebagai lelong) berlaku apabila pemilik gagal membayar ansuran pinjaman selama tempoh tertentu dan bank mengambil semula hartanah tersebut untuk dijual bagi mendapatkan semula hutang. Hartanah ini kemudiannya dijual melalui lelongan awam, biasanya pada harga rezab yang 20% hingga 30% lebih rendah daripada nilai pasaran.',
          'Ini bermakna pembeli yang berjaya boleh mendapat hartanah pada harga jauh lebih murah berbanding membeli di pasaran terbuka. Namun, lelong bukan tanpa risiko — ia memerlukan pengetahuan, persediaan kewangan, dan kesabaran.',
        ],
        paragraphsEn: [
          'A bank auction property (lelong) occurs when an owner fails to make loan repayments for a set period and the bank repossesses the property to recover the debt. The property is then sold via public auction, typically at a reserve price 20% to 30% below market value.',
          'This means a successful buyer can acquire property at a significantly lower price than buying on the open market. However, auctions are not without risk — they require knowledge, financial readiness, and patience.',
        ],
      },
      {
        heading: 'LACA vs Non-LACA: Perbezaan Penting',
        headingEn: 'LACA vs Non-LACA: The Key Difference',
        paragraphs: [
          'Terdapat dua kategori utama lelong bank di Malaysia. Hartanah LACA (Land Acquisition Act / Seksyen 256 Kanun Tanah Negara) ialah hartanah yang pinjaman asalnya diambil di bawah akta tertentu — lazimnya pinjaman Islam. Bidaan LACA dikendalikan oleh Mahkamah Tinggi, dan pembeli perlu hadir secara fizikal ke mahkamah.',
          'Non-LACA pula merujuk kepada hartanah yang disita di bawah Seksyen 254 Kanun Tanah Negara. Bidaan ini biasanya dikendalikan oleh firma peguam atau penguam cara yang dilantik oleh bank. Pembeli Non-LACA boleh membuat bidaan secara online melalui platform seperti Lelong.my, ELelong, dan AuctionGuru.',
        ],
        paragraphsEn: [
          'There are two main categories of bank auction in Malaysia. LACA (Land Acquisition Act / Section 256 National Land Code) properties are those where the original loan was taken under certain acts — typically Islamic financing. LACA auctions are handled by the High Court, and bidders must attend in person.',
          'Non-LACA refers to properties repossessed under Section 254 of the National Land Code. These auctions are typically run by law firms or auctioneers appointed by the bank. Non-LACA bidders can bid online through platforms like Lelong.my, ELelong, and AuctionGuru.',
        ],
        bullets: [
          'LACA: dikendalikan Mahkamah Tinggi, kehadiran fizikal diperlukan, dokumen mahkamah lebih kompleks',
          'Non-LACA: boleh bidaan online, proses lebih mudah untuk pembeli baru',
          'Kedua-duanya memerlukan deposit 10% tunai atau banker\'s cheque pada hari lelong',
          'Tempoh selesai bayaran penuh berbeza: LACA biasanya 90-120 hari, Non-LACA 90-120 hari juga',
        ],
        bulletsEn: [
          'LACA: managed by High Court, physical attendance required, more complex court documents',
          'Non-LACA: online bidding available, simpler process for new buyers',
          'Both require a 10% deposit in cash or banker\'s cheque on auction day',
          'Full payment timelines vary: LACA typically 90–120 days, Non-LACA also 90–120 days',
        ],
      },
      {
        heading: 'Langkah-Langkah Menyertai Lelong Bank',
        headingEn: 'Steps to Participate in a Bank Auction',
        paragraphs: ['Proses menyertai lelong bank secara umumnya mengikut turutan berikut:'],
        paragraphsEn: ['The process of joining a bank auction generally follows this sequence:'],
        bullets: [
          'Langkah 1: Cari hartanah lelong di platform seperti AuctionGuru.com.my, ELelong.com, atau Lelong.com.my',
          'Langkah 2: Semak Proclamation of Sale (POS) — dokumen yang mengandungi harga rezab, terma, dan maklumat hartanah',
          'Langkah 3: Lakukan semakan CAGAMAS, strata / geran tanah, dan tunggakan cukai tanah atau cukai pintu',
          'Langkah 4: Lawati hartanah dari luar untuk menilai keadaan — masuk ke dalam hampir mustahil sebelum lelong',
          'Langkah 5: Dapatkan kelulusan prinsip pinjaman bank terlebih dahulu (Letter of Offer in Principle)',
          'Langkah 6: Sediakan banker\'s cheque 10% daripada harga rezab pada hari lelong',
          'Langkah 7: Bida — jika menang, bayar baki dalam tempoh yang ditetapkan (biasanya 90-120 hari)',
          'Langkah 8: Selesaikan pindah milik dengan peguam setelah penuh dibayar',
        ],
        bulletsEn: [
          'Step 1: Find auction properties on platforms like AuctionGuru.com.my, ELelong.com, or Lelong.com.my',
          'Step 2: Review the Proclamation of Sale (POS) — a document containing the reserve price, terms, and property details',
          'Step 3: Check CAGAMAS records, strata/title status, and any outstanding quit rent or assessment arrears',
          'Step 4: Visit the property from the outside to assess its condition — entering is almost impossible before the auction',
          'Step 5: Obtain a bank\'s Letter of Offer in Principle before auction day',
          'Step 6: Prepare a banker\'s cheque for 10% of the reserve price on auction day',
          'Step 7: Bid — if you win, pay the balance within the stipulated period (usually 90–120 days)',
          'Step 8: Complete the transfer of ownership with a lawyer once fully paid',
        ],
      },
      {
        heading: 'Risiko Yang Perlu Anda Ketahui',
        headingEn: 'Risks You Need to Know',
        paragraphs: [
          'Hartanah lelong dijual "seadanya" (as-is). Anda tidak boleh periksa bahagian dalam sebelum bida, bermakna kerosakan tersembunyi, kebocoran bumbung, atau pendawaian rosak adalah tanggungjawab anda sepenuhnya selepas berjaya menang. Anggarkan kos baik pulih sebagai sebahagian daripada pengiraan nilai beli anda.',
          'Risiko terbesar bagi pembeli baru ialah gagal mendapatkan pinjaman bank selepas memenangi bidaan — deposit 10% anda akan hangus. Itulah sebabnya mendapatkan kelulusan prinsip terlebih dahulu adalah langkah paling kritikal.',
        ],
        paragraphsEn: [
          'Auction properties are sold "as-is." You cannot inspect the interior before bidding, meaning hidden damage, roof leaks, or faulty wiring are entirely your responsibility after winning. Factor in renovation costs as part of your purchase value calculation.',
          'The biggest risk for first-time buyers is failing to secure a bank loan after winning the bid — your 10% deposit will be forfeited. That\'s why obtaining an in-principle approval first is the most critical step.',
        ],
        bullets: [
          'Penghuni enggan keluar — proses pengusiran boleh ambil 6-12 bulan melalui mahkamah',
          'Tunggakan pinjaman induk — dalam sesetengah kes, pembeli mewarisi tunggakan penyelenggaraan strata',
          'Masalah geran — hartanah dengan geran bersama (share title) lebih sukar untuk mendapatkan pinjaman',
          'Harga pasaran mungkin tidak setinggi jangkaan — selalu semak transaksi berdekatan di JPPH',
          'Tempoh 90-120 hari untuk selesai mungkin terlalu singkat jika bank lambat meluluskan pinjaman',
        ],
        bulletsEn: [
          'Unwilling occupants — eviction can take 6–12 months through the courts',
          'Maintenance arrears — in some cases, buyers inherit outstanding strata maintenance fees',
          'Title issues — properties with shared titles are harder to get financing for',
          'Market value may not be as high as expected — always check nearby transactions at JPPH',
          'The 90–120 day settlement window may be too short if the bank is slow to approve your loan',
        ],
      },
      {
        heading: 'Tips Untuk Pembeli Pertama Lelong',
        headingEn: 'Tips for First-Time Auction Buyers',
        paragraphs: [
          'Pembeli baru sering terpukul kerana emosi — mereka terlalu excited dan bidaan melebihi harga yang masuk akal. Tetapkan had harga maksimum anda sebelum masuk ke bilik lelong dan jangan melepasinya walau apa pun.',
          'Mulakan dengan hartanah Non-LACA yang lebih mudah prosesnya. Ikuti beberapa sesi lelong terlebih dahulu sebagai pemerhati sebelum membida sendiri — ini akan biasakan anda dengan suasana dan proses yang berlaku.',
        ],
        paragraphsEn: [
          'New buyers are often caught off guard by emotions — they get excited and bid beyond what makes financial sense. Set your maximum price limit before entering the auction room and do not exceed it no matter what.',
          'Start with Non-LACA properties, which have a simpler process. Attend a few auctions as an observer before bidding yourself — this will familiarise you with the atmosphere and process.',
        ],
        bullets: [
          'Gunakan formula: Harga Rezab + Kos Baik Pulih + Kos Guaman + Duti Setem ≤ 80% Nilai Pasaran',
          'Semak hartanah sekurang-kurangnya sekali dari luar — perhatikan keadaan bangunan, kawasan sekitar, akses jalan',
          'Hubungi agensi hartanah setempat untuk tanya tentang kadar sewa pasaran kawasan tersebut',
          'Pertimbangkan hartanah kosong dahulu — lebih mudah daripada yang masih berpenghuni',
          'Sentiasa ada peguam yang anda percaya sebelum hari lelong',
        ],
        bulletsEn: [
          'Use this formula: Reserve Price + Renovation Cost + Legal Fees + Stamp Duty ≤ 80% of Market Value',
          'Visit the property at least once from outside — observe the building condition, surroundings, and road access',
          'Contact local property agents to ask about market rental rates in the area',
          'Consider vacant properties first — easier to deal with than occupied ones',
          'Always have a trusted lawyer lined up before auction day',
        ],
      },
    ],
  },
  {
    slug: 'kawasan-hartanah-terbaik-selangor',
    title: 'Kawasan Hartanah Terbaik di Selangor 2026',
    titleEn: 'Best Property Areas in Selangor 2026',
    description:
      'Shah Alam, Subang Jaya, Puchong, Klang, Rawang, Semenyih — panduan kawasan hartanah Selangor 2026 dengan julat harga, kelebihan, kekurangan, dan siapa yang sesuai untuk setiap lokasi.',
    descriptionEn:
      'Shah Alam, Subang Jaya, Puchong, Klang, Rawang, Semenyih — a 2026 guide to Selangor\'s property areas with price ranges, pros, cons, and who each location suits best.',
    publishedAt: '2026-06-22',
    readMinutes: 6,
    sections: [
      {
        heading: 'Subang Jaya: Pilihan Premium Berdekatan KL',
        headingEn: 'Subang Jaya: Premium Choice Near KL',
        paragraphs: [
          'Subang Jaya kekal sebagai salah satu kawasan hartanah paling dicari di Selangor kerana infrastruktur matang, pusat beli-belah kelas pertama (Sunway Pyramid, Empire), sekolah antarabangsa, dan sambungan LRT/KTM yang baik. Hartanah di sini jarang turun nilai secara drastik.',
          'Harga kondominium di Subang Jaya bermula dari RM450,000 hingga lebih RM1 juta untuk unit premium. Hartanah bersaiz sederhana (700-900 kaki persegi) di kawasan seperti USJ 1 hingga USJ 21 berada dalam julat RM500,000-RM700,000.',
        ],
        paragraphsEn: [
          'Subang Jaya remains one of the most sought-after property areas in Selangor due to its mature infrastructure, top-tier shopping malls (Sunway Pyramid, Empire), international schools, and good LRT/KTM connectivity. Properties here rarely drop sharply in value.',
          'Condominium prices in Subang Jaya start from RM450,000 to over RM1 million for premium units. Mid-sized units (700–900 sq ft) in areas like USJ 1 to USJ 21 fall in the RM500,000–RM700,000 range.',
        ],
        bullets: [
          'Sesuai untuk: profesional bekerja di PJ / KL, keluarga dengan anak sekolah, pelabur jangka panjang',
          'Kelebihan: infrastruktur matang, kemudahan lengkap, kadar sewa tinggi (RM1,800-RM3,000/bulan)',
          'Kekurangan: harga tinggi, trafik teruk pada waktu puncak, parking terhad di kawasan lama',
        ],
        bulletsEn: [
          'Best for: professionals working in PJ/KL, families with school-going children, long-term investors',
          'Pros: mature infrastructure, complete amenities, high rental rates (RM1,800–RM3,000/month)',
          'Cons: high prices, heavy traffic during peak hours, limited parking in older areas',
        ],
      },
      {
        heading: 'Shah Alam: Bandar Rancangan dengan Pertumbuhan Pesat',
        headingEn: 'Shah Alam: Planned City with Rapid Growth',
        paragraphs: [
          'Shah Alam ialah ibu negeri Selangor dan menawarkan pelbagai jenis hartanah dari rumah teres di Seksyen lama hingga kondominium moden di i-City dan Setia Alam. Kawasan ini kini lebih mudah diakses dengan pelebaran Lebuhraya KESAS dan sambungan MRT Putrajaya Line.',
          'Harga hartanah di Shah Alam lebih berpatutan berbanding Subang Jaya — kondominium sederhana di Seksyen 7 atau Seksyen 13 boleh didapati dalam lingkungan RM350,000-RM550,000. Rumah teres setingkat di kawasan luar bandar seperti Kota Kemuning atau Bukit Jelutong bermula dari RM600,000.',
        ],
        paragraphsEn: [
          'Shah Alam is the Selangor state capital and offers a diverse range of properties from terraced houses in older Seksyens to modern condominiums in i-City and Setia Alam. The area is now more accessible with the widened KESAS Highway and MRT Putrajaya Line connectivity.',
          'Property prices in Shah Alam are more affordable than Subang Jaya — mid-range condominiums in Section 7 or Section 13 can be found for RM350,000–RM550,000. Single-storey terraced houses in outer areas like Kota Kemuning or Bukit Jelutong start from RM600,000.',
        ],
        bullets: [
          'Sesuai untuk: keluarga Bumiputera (banyak bumiputera lot), pembeli pertama, pelabur industri',
          'Kelebihan: harga sederhana, bandar rancangan dengan taman, banyak kolej dan universiti (UiTM, UITM Shah Alam)',
          'Kekurangan: kebanyakan kawasan kurang hiburan malam, zon perindustrian berdekatan perumahan di beberapa kawasan',
        ],
        bulletsEn: [
          'Best for: Bumiputera families (many Bumi lots), first-time buyers, industrial property investors',
          'Pros: moderate pricing, planned city with parks, many colleges and universities (UiTM)',
          'Cons: most areas lack nightlife, industrial zones near residential in some sections',
        ],
      },
      {
        heading: 'Puchong: Hab Perumahan Besar dengan Nilai Baik',
        headingEn: 'Puchong: Large Residential Hub with Good Value',
        paragraphs: [
          'Puchong ialah salah satu kawasan paling padat di Selangor dan menawarkan nilai terbaik untuk pembeli yang mahu berdekatan KL tanpa harga Subang Jaya. Kawasan ini mempunyai pelbagai kemudahan termasuk IOI City Mall, sekolah Cina terkemuka, dan sambungan LRT (Stesen Pusat Bandar Puchong, Bandar Puteri).',
          'Kondominium di Puchong boleh didapati dari RM300,000 hingga RM600,000 bergantung pada usia dan lokasi projek. Rumah berkembar dan teres dua tingkat di kawasan seperti Puchong Perdana dan Taman Kinrara berjulat RM650,000-RM900,000.',
        ],
        paragraphsEn: [
          'Puchong is one of the most densely populated areas in Selangor and offers the best value for buyers wanting proximity to KL without Subang Jaya prices. The area has extensive amenities including IOI City Mall, prominent Chinese schools, and LRT connectivity (Pusat Bandar Puchong, Bandar Puteri stations).',
          'Condominiums in Puchong can be found from RM300,000 to RM600,000 depending on the project\'s age and location. Semi-detached and double-storey terraced houses in areas like Puchong Perdana and Taman Kinrara range from RM650,000–RM900,000.',
        ],
        bullets: [
          'Sesuai untuk: keluarga muda, komuniti Cina (banyak sekolah SJK(C)), pembeli yang mengutamakan nilai',
          'Kelebihan: pelbagai hartanah, kemudahan lengkap, kadar sewa kompetitif (RM1,200-RM2,200/bulan)',
          'Kekurangan: trafik sangat teruk (Lebuhraya LDP sering sesak), kawasan banjir kilat di beberapa lokasi',
        ],
        bulletsEn: [
          'Best for: young families, Chinese community (many SJK(C) schools), value-conscious buyers',
          'Pros: diverse property types, complete amenities, competitive rental rates (RM1,200–RM2,200/month)',
          'Cons: very heavy traffic (LDP Highway frequently congested), flash flood areas in some locations',
        ],
      },
      {
        heading: 'Rawang & Semenyih: Kawasan Pertumbuhan Masa Depan',
        headingEn: 'Rawang & Semenyih: Future Growth Corridors',
        paragraphs: [
          'Rawang dan Semenyih ialah dua kawasan yang menawarkan harga paling berpatutan di Selangor dengan potensi pertumbuhan nilai hartanah yang menarik dalam jangka sederhana hingga panjang. Kedua-dua kawasan ini menerima manfaat daripada pembangunan baru dan peningkatan infrastruktur.',
          'Di Rawang, kondominium baru boleh didapati serendah RM250,000-RM380,000 manakala rumah teres dua tingkat bermula dari RM420,000. Semenyih pula popular kerana berdekatan UPM, UITM Dengkil, dan EduCity — menjadikannya pilihan pelabur yang menyasarkan pasaran sewa pelajar.',
        ],
        paragraphsEn: [
          'Rawang and Semenyih are two areas offering the most affordable prices in Selangor with attractive property value growth potential in the medium to long term. Both areas benefit from new developments and infrastructure improvements.',
          'In Rawang, new condominiums can be found as low as RM250,000–RM380,000 while double-storey terraced houses start from RM420,000. Semenyih is popular due to proximity to UPM, UITM Dengkil, and EduCity — making it an attractive option for investors targeting the student rental market.',
        ],
        bullets: [
          'Rawang sesuai untuk: pembeli pertama dengan bajet terhad, keluarga yang mahu rumah landed',
          'Semenyih sesuai untuk: pelabur menyasarkan pelajar, pembeli muda yang boleh bekerja remote',
          'Kelebihan: harga paling rendah di Selangor, tanah lebih luas, udara lebih bersih',
          'Kekurangan: masa perjalanan ke KL 45-70 minit, kemudahan masih berkembang, tiada LRT lagi',
        ],
        bulletsEn: [
          'Rawang best for: first-time buyers on a tight budget, families wanting landed homes',
          'Semenyih best for: investors targeting students, young buyers who can work remotely',
          'Pros: lowest prices in Selangor, larger land lots, cleaner air',
          'Cons: 45–70 minute commute to KL, amenities still developing, no LRT yet',
        ],
      },
      {
        heading: 'Klang: Nilai Terbaik untuk Pembeli Berdikari',
        headingEn: 'Klang: Best Value for Independent Buyers',
        paragraphs: [
          'Klang sering dipandang rendah tetapi menawarkan nilai luar biasa — rumah teres dua tingkat di kawasan bersih seperti Bukit Tinggi, Bandar Bukit Raja, atau Taman Sri Andalas boleh didapati dalam lingkungan RM400,000-RM650,000, jauh lebih murah daripada kawasan setanding di Subang atau Puchong.',
          'Kawasan Pelabuhan Klang juga menjadi tarikan bagi pelabur industri dan pekerja sektor perkapalan dan logistik. Sambungan lebuhraya ke KL (KESAS, NKVE, ELITE) agak baik walaupun masa perjalanan masih 45-60 minit pada waktu puncak.',
        ],
        paragraphsEn: [
          'Klang is often overlooked but offers outstanding value — double-storey terraced houses in clean areas like Bukit Tinggi, Bandar Bukit Raja, or Taman Sri Andalas can be found for RM400,000–RM650,000, far cheaper than comparable areas in Subang or Puchong.',
          'Port Klang attracts industrial investors and workers in the shipping and logistics sectors. Highway connectivity to KL (KESAS, NKVE, ELITE) is reasonably good although peak-hour travel still takes 45–60 minutes.',
        ],
        bullets: [
          'Sesuai untuk: keluarga yang kerja di sekitar Klang/Shah Alam, pelabur mencari hasil sewa yang baik',
          'Kelebihan: harga hartanah paling berpatutan, kawasan perniagaan aktif, komuniti pelbagai kaum',
          'Kekurangan: banjir di beberapa kawasan lama Klang, persepsi negatif kawasan yang tidak tepat',
        ],
        bulletsEn: [
          'Best for: families working around Klang/Shah Alam, investors seeking good rental yields',
          'Pros: most affordable property prices, active commercial areas, diverse community',
          'Cons: flooding in some older Klang areas, inaccurate negative perception of some zones',
        ],
      },
    ],
  },
  {
    slug: 'panduan-pembeli-rumah-pertama-malaysia',
    title: 'Panduan Pembeli Rumah Pertama di Malaysia 2026',
    titleEn: 'First-Time Home Buyer Guide Malaysia 2026',
    description:
      'Panduan lengkap pembeli rumah pertama Malaysia 2026 — kelayakan, skim kerajaan (PR1MA, MyHome, BSN Youth), pengecualian RPGT, proses SPA, duti setem, yuran guaman, dan senarai semak sebelum tandatangan.',
    descriptionEn:
      'Complete first-time home buyer guide for Malaysia 2026 — eligibility, government schemes (PR1MA, MyHome, BSN Youth), RPGT exemption, the SPA process, stamp duty, legal fees, and a checklist before you sign.',
    publishedAt: '2026-06-22',
    readMinutes: 10,
    sections: [
      {
        heading: 'Adakah Anda Layak Sebagai Pembeli Pertama?',
        headingEn: 'Are You Eligible as a First-Time Buyer?',
        paragraphs: [
          'Di Malaysia, anda diklasifikasikan sebagai pembeli rumah pertama jika anda BELUM pernah memiliki mana-mana hartanah kediaman secara sah di negara ini. Status ini membuka pintu kepada pelbagai insentif kerajaan termasuk pengecualian duti setem, pengecualian RPGT, dan akses kepada skim perumahan khas.',
          'Penting untuk difahami bahawa "pertama kali" merujuk kepada hakmilik — bukan tempat tinggal. Jika nama anda ada di geran rumah ibu bapa (walaupun anda tidak pernah bayar ansurannya), anda mungkin tidak layak sebagai pembeli pertama. Semak dengan peguam sebelum membuat andaian.',
        ],
        paragraphsEn: [
          'In Malaysia, you are classified as a first-time buyer if you have NEVER legally owned any residential property in the country. This status opens the door to various government incentives including stamp duty exemptions, RPGT exemptions, and access to special housing schemes.',
          'It is important to understand that "first time" refers to ownership — not residence. If your name is on your parents\' property title (even if you never paid the installments), you may not qualify as a first-time buyer. Check with a lawyer before making assumptions.',
        ],
        bullets: [
          'Warganegara Malaysia berumur 18 tahun ke atas',
          'Belum pernah memiliki hartanah kediaman (bukan komersial) atas nama sendiri',
          'Untuk skim BSN Youth: berumur 18-40 tahun',
          'Untuk skim PR1MA: pendapatan isi rumah RM2,500-RM15,000 sebulan',
          'Untuk pengecualian duti setem: hartanah bernilai RM500,000 ke bawah (had 2026)',
        ],
        bulletsEn: [
          'Malaysian citizen aged 18 and above',
          'Never previously owned residential property (not commercial) in your own name',
          'For BSN Youth scheme: aged 18–40',
          'For PR1MA scheme: household income RM2,500–RM15,000 per month',
          'For stamp duty exemption: property valued at RM500,000 and below (2026 threshold)',
        ],
      },
      {
        heading: 'Skim Kerajaan untuk Pembeli Pertama',
        headingEn: 'Government Schemes for First-Time Buyers',
        paragraphs: [
          'Kerajaan Malaysia menawarkan beberapa skim untuk membantu pembeli rumah pertama memasuki pasaran hartanah. Setiap skim mempunyai kriteria, had harga, dan lokasi hartanah yang berbeza — penting untuk memahami yang mana sesuai dengan situasi anda sebelum memohon.',
        ],
        paragraphsEn: [
          'The Malaysian government offers several schemes to help first-time buyers enter the property market. Each scheme has different criteria, price limits, and property locations — it is important to understand which one suits your situation before applying.',
        ],
        bullets: [
          'PR1MA (Perumahan Rakyat 1Malaysia): Rumah mampu milik RM100,000-RM400,000 di seluruh Malaysia, pendapatan isi rumah RM2,500-RM15,000',
          'MyHome: Subsidi sehingga RM30,000 untuk rumah swasta di bawah RM300,000, hanya di negeri terpilih',
          'Skim Rumah Pertamaku (SRP): Pinjaman sehingga 110% tanpa perlukan deposit, untuk bergaji bawah RM5,000',
          'Rumah Selangorku: Untuk pemastautin Selangor, harga RM42,000-RM250,000 bergantung kategori',
          'RUMAWIP: Untuk pemastautin Wilayah Persekutuan, unit apartmen RM150,000-RM300,000',
          'BSN MyHome Youth: Pembiayaan perumahan khas untuk belia berumur 18-40 tahun',
          'LPPSA: Untuk penjawat awam, kadar faedah lebih rendah dan syarat lebih longgar',
        ],
        bulletsEn: [
          'PR1MA: Affordable homes RM100,000–RM400,000 nationwide, household income RM2,500–RM15,000',
          'MyHome: Subsidy up to RM30,000 for private homes below RM300,000, selected states only',
          'Skim Rumah Pertamaku (SRP): Loans up to 110% requiring no deposit, for earners below RM5,000',
          'Rumah Selangorku: For Selangor residents, priced RM42,000–RM250,000 depending on category',
          'RUMAWIP: For Federal Territory residents, apartment units at RM150,000–RM300,000',
          'BSN MyHome Youth: Special housing financing for youth aged 18–40',
          'LPPSA: For civil servants, lower interest rates and more relaxed conditions',
        ],
      },
      {
        heading: 'Kos Sebenar Membeli Rumah: Lebih dari Sekadar Harga Rumah',
        headingEn: 'The Real Cost of Buying a Home: More Than Just the Price',
        paragraphs: [
          'Ramai pembeli pertama terperanjat apabila menyedari kos membeli rumah jauh melebihi harga jualan. Sebagai pembeli pertama untuk rumah berharga RM400,000, anda perlu bersedia untuk kos-kos tambahan yang boleh mencecah RM30,000-RM50,000.',
          'Kos ini boleh dibahagikan kepada dua kumpulan utama: kos berkaitan pinjaman (yang biasanya disertakan dalam pinjaman) dan kos yang perlu dibayar daripada poket anda sendiri. Rancang dengan teliti supaya tiada kejutan kewangan selepas menandatangani SPA.',
        ],
        paragraphsEn: [
          'Many first-time buyers are surprised to discover that the cost of buying a home far exceeds the selling price. As a first-time buyer for a property priced at RM400,000, you need to be prepared for additional costs that can reach RM30,000–RM50,000.',
          'These costs can be divided into two main groups: loan-related costs (usually included in the loan) and costs you need to pay out of pocket. Plan carefully so there are no financial surprises after signing the SPA.',
        ],
        bullets: [
          'Deposit 10% daripada harga hartanah (RM40,000 untuk hartanah RM400,000)',
          'Duti setem SPA: 1% (RM100k pertama) + 2% (RM100k-RM500k) — pengecualian penuh untuk hartanah ≤RM500k bagi pembeli pertama',
          'Duti setem perjanjian pinjaman: 0.5% daripada jumlah pinjaman',
          'Yuran guaman SPA: RM7,000-RM12,000 (bergantung harga rumah)',
          'Yuran penilaian hartanah: RM800-RM1,500',
          'Kos MRTA/MLTA (insurans nyawa pinjaman): bergantung usia dan jumlah pinjaman',
          'Kos pindah masuk dan pengubahsuaian: RM5,000-RM30,000 (bergantung keadaan unit)',
        ],
        bulletsEn: [
          '10% deposit of property price (RM40,000 for a RM400,000 property)',
          'SPA stamp duty: 1% (first RM100k) + 2% (RM100k–RM500k) — full exemption for properties ≤RM500k for first-time buyers',
          'Loan agreement stamp duty: 0.5% of total loan amount',
          'SPA legal fees: RM7,000–RM12,000 (depending on property price)',
          'Property valuation fee: RM800–RM1,500',
          'MRTA/MLTA cost (loan life insurance): depends on age and loan amount',
          'Moving and renovation costs: RM5,000–RM30,000 (depending on unit condition)',
        ],
      },
      {
        heading: 'Proses SPA: Dari Tanda Tangan Hingga Kunci',
        headingEn: 'The SPA Process: From Signing to Key Collection',
        paragraphs: [
          'Perjanjian Jual Beli (SPA) atau Sale and Purchase Agreement ialah kontrak sah antara anda dan pemaju atau pemilik semasa hartanah. Untuk hartanah subsale (pasaran sekunder), SPA biasanya perlu diselesaikan dalam tempoh 3 bulan dari tarikh tandatangan, dengan kemungkinan sambungan sebulan.',
          'Untuk hartanah baru dari pemaju, SPA ditandatangani selepas mendapat kelulusan pinjaman. Pembinaan biasanya mengambil masa 36-48 bulan untuk hartanah berbayar progresif (perumahan bertanah) atau sehingga 42 bulan untuk kondominium.',
        ],
        paragraphsEn: [
          'The Sale and Purchase Agreement (SPA) is the legal contract between you and the developer or current property owner. For subsale (secondary market) properties, the SPA usually needs to be completed within 3 months of signing, with a possible one-month extension.',
          'For new properties from developers, the SPA is signed after loan approval is obtained. Construction typically takes 36–48 months for progressive-payment landed properties or up to 42 months for condominiums.',
        ],
        bullets: [
          'Langkah 1: Bayar deposit booking (biasanya 2-3%) dan terima Surat Tawaran',
          'Langkah 2: Mohon pinjaman bank dalam tempoh 14-21 hari',
          'Langkah 3: Setelah lulus, tandatangani SPA dan bayar baki deposit (hingga 10%)',
          'Langkah 4: Peguam menguruskan pindah milik geran di Pejabat Tanah',
          'Langkah 5: Setelah semua bayaran selesai dan geran dipindah, terima kunci',
          'PENTING: Semak Borang H (untuk hartanah pemaju) — ia menunjukkan semua kos dan jadual bayaran',
        ],
        bulletsEn: [
          'Step 1: Pay booking deposit (usually 2–3%) and receive Letter of Offer',
          'Step 2: Apply for bank loan within 14–21 days',
          'Step 3: Once approved, sign SPA and pay balance deposit (up to 10%)',
          'Step 4: Lawyer handles title transfer at the Land Office',
          'Step 5: Once all payments are complete and title transferred, receive the keys',
          'IMPORTANT: Check Form H (for developer properties) — it shows all costs and payment schedules',
        ],
      },
      {
        heading: 'Senarai Semak Sebelum Tandatangan SPA',
        headingEn: 'Checklist Before Signing the SPA',
        paragraphs: [
          'Jangan tandatangani SPA tergesa-gesa. Ambil masa untuk semak semua perkara berikut dengan peguam anda — khususnya untuk hartanah subsale di mana keadaan fizikal dan rekod hutang amat penting untuk disahkan.',
        ],
        paragraphsEn: [
          'Don\'t sign the SPA in a hurry. Take time to check all of the following with your lawyer — especially for subsale properties where physical condition and debt records are critically important to verify.',
        ],
        bullets: [
          'Sahkan nama pemilik di geran dengan IC/dokumen penjual',
          'Semak bebanan (encumbrances) — adakah ada pinjaman, kaveat, atau lien atas hartanah?',
          'Semak tunggakan cukai tanah (quit rent) dan cukai pintu (assessment)',
          'Untuk strata: semak tunggakan bayaran penyelenggaraan dengan pihak pengurusan',
          'Lawati hartanah lebih dari sekali — sekali dengan kontraktor untuk anggaran kos baik pulih',
          'Sahkan status CF (Certificate of Fitness) atau CCC (Certificate of Completion and Compliance)',
          'Pastikan semua unit/tempat letak kereta yang dijanjikan ada dalam SPA secara bertulis',
          'Baca klausa penalti untuk kelewatan penyerahan (untuk hartanah baru)',
        ],
        bulletsEn: [
          'Verify the owner\'s name on the title against the seller\'s IC/documents',
          'Check encumbrances — are there any loans, caveats, or liens on the property?',
          'Check outstanding quit rent and assessment arrears',
          'For strata: check outstanding maintenance fee arrears with the management',
          'Visit the property more than once — once with a contractor for renovation cost estimates',
          'Verify CF (Certificate of Fitness) or CCC (Certificate of Completion and Compliance) status',
          'Ensure all units/car parks promised are stated in writing in the SPA',
          'Read the penalty clauses for late delivery (for new properties)',
        ],
      },
    ],
  },
  {
    slug: 'tips-sewa-rumah-malaysia',
    title: '10 Tips Penting Sebelum Menyewa Rumah di Malaysia',
    titleEn: '10 Essential Tips Before Renting a House in Malaysia',
    description:
      'Perjanjian sewa, deposit 2+1, tanda amaran tuan rumah bermasalah, Cukai Pintu, pemindahan utiliti, klausa sublet, notis keluar — panduan lengkap untuk penyewa rumah Malaysia.',
    descriptionEn:
      'Tenancy agreement, 2+1 deposit, landlord red flags, Cukai Pintu, utilities transfer, subletting clause, notice period — a complete guide for Malaysian house renters.',
    publishedAt: '2026-06-22',
    readMinutes: 5,
    sections: [
      {
        heading: 'Perjanjian Sewa: Lindungi Diri Anda Secara Bertulis',
        headingEn: 'Tenancy Agreement: Protect Yourself in Writing',
        paragraphs: [
          'Perjanjian sewa (tenancy agreement) ialah perlindungan terpenting anda sebagai penyewa. Ia mengandungi terma tempoh sewa, jumlah sewa, deposit, tanggungjawab penyelenggaraan, dan syarat-syarat penamatan kontrak. Jangan duduk di mana-mana rumah tanpa perjanjian bertulis yang ditandatangani — walaupun tuan rumah adalah kenalan rapat.',
          'Perjanjian sewa standard di Malaysia biasanya untuk tempoh 12 bulan (boleh dilanjutkan). Pastikan anda baca setiap klausa sebelum tandatangan. Jika ada klausa yang tidak munasabah (seperti tuan rumah boleh masuk pada bila-bila masa tanpa notis), minta supaya diubah sebelum menandatangani.',
        ],
        paragraphsEn: [
          'The tenancy agreement is your most important protection as a renter. It contains the tenancy period, rental amount, deposit, maintenance responsibilities, and conditions for contract termination. Never stay in any property without a signed written agreement — even if the landlord is a close acquaintance.',
          'Standard tenancy agreements in Malaysia are typically for 12 months (renewable). Make sure you read every clause before signing. If any clause is unreasonable (such as the landlord being able to enter at any time without notice), request that it be amended before signing.',
        ],
        bullets: [
          'Pastikan perjanjian ditandatangani oleh PEMILIK SEBENAR hartanah (semak geran atau bil utiliti)',
          'Perjanjian perlu distam di LHDN dalam 30 hari — kos setem RM10 setiap RM250 sewa setahun',
          'Anda dan tuan rumah masing-masing perlu simpan satu salinan yang telah distam',
          'Simpan salinan IC tuan rumah dan nombor akaun bank untuk rekod',
        ],
        bulletsEn: [
          'Ensure the agreement is signed by the ACTUAL OWNER of the property (check title or utility bills)',
          'Agreement must be stamped at LHDN within 30 days — stamp cost is RM10 per RM250 annual rent',
          'Both you and the landlord should each keep one stamped copy',
          'Keep a copy of the landlord\'s IC and bank account number for your records',
        ],
      },
      {
        heading: 'Deposit 2+1: Apa Yang Anda Perlu Tahu',
        headingEn: 'The 2+1 Deposit: What You Need to Know',
        paragraphs: [
          'Deposit standard untuk menyewa rumah di Malaysia ialah formula 2+1: 2 bulan deposit keselamatan ditambah 1 bulan deposit utiliti. Untuk rumah berharga RM1,500 sebulan, ini bermakna anda perlu sediakan RM4,500 di hadapan (tidak termasuk sewa bulan pertama).',
          'Deposit utiliti (juga dikenali sebagai deposit kemudahan) dipegangnya untuk menampung bil utiliti yang belum dibayar apabila anda keluar. Ia seharusnya dikembalikan dalam 14-30 hari selepas anda keluar jika tiada tunggakan. Deposit keselamatan pula untuk menanggung kerosakan (bukan haus normal) kepada harta.',
        ],
        paragraphsEn: [
          'The standard deposit for renting a house in Malaysia follows the 2+1 formula: 2 months security deposit plus 1 month utility deposit. For a house costing RM1,500/month, this means you need to prepare RM4,500 upfront (not including the first month\'s rent).',
          'The utility deposit is held to cover unpaid utility bills when you move out. It should be returned within 14–30 days after you vacate if there are no arrears. The security deposit is for covering damage (not normal wear and tear) to the property.',
        ],
        bullets: [
          'Bayar deposit hanya melalui bank transfer — simpan resit/slaid sebagai bukti pembayaran',
          'Lakukan "condition report" bersama tuan rumah pada hari masuk — foto semua kerosakan sedia ada',
          'Kerosakan "normal wear and tear" (cat pudar, parquet sedikit calar) TIDAK boleh dipotong dari deposit anda',
          'Tuan rumah mesti berikan akaun bertulis jika menolak deposit — bukan sekadar "rumah kotor"',
          'Jika deposit tidak dikembalikan, anda boleh failkan tuntutan di Tribunal Pengguna (Tribunal Tuntutan Pengguna)',
        ],
        bulletsEn: [
          'Pay deposit only via bank transfer — keep receipts as proof of payment',
          'Conduct a "condition report" with the landlord on move-in day — photograph all existing damage',
          'Normal wear and tear (faded paint, slightly scratched parquet) CANNOT be deducted from your deposit',
          'Landlord must provide a written account if withholding deposit — not just "the house is dirty"',
          'If deposit is not returned, you can file a claim at the Tribunal Pengguna (Consumer Claims Tribunal)',
        ],
      },
      {
        heading: 'Tanda Amaran: Tuan Rumah Bermasalah',
        headingEn: 'Red Flags: Problematic Landlords',
        paragraphs: [
          'Memilih tuan rumah yang baik sama pentingnya dengan memilih rumah yang baik. Tuan rumah yang bermasalah boleh menjadikan pengalaman menyewa anda sangat menyeksakan — dari masuk tanpa izin hingga enggan membaiki kerosakan atau menahan deposit anda secara tidak adil.',
        ],
        paragraphsEn: [
          'Choosing a good landlord is just as important as choosing a good house. A problematic landlord can make your rental experience extremely unpleasant — from entering without permission to refusing to fix damage or unfairly withholding your deposit.',
        ],
        bullets: [
          'Enggan tunjukkan geran hartanah atau bukti pemilikan — mungkin agen atau penyewa haram',
          'Mendesak bayaran tunai sahaja tanpa resit — sukar untuk tuntutan deposit kemudian',
          'Tidak ada perjanjian bertulis atau bersikap defensif apabila diminta menandatangani',
          'Penyewa sebelum ada masalah yang tidak diselesaikan — tanya penyewa lama jika boleh',
          'Cukai pintu atau bil utiliti atas nama lain / tertunggak — anda mungkin mewarisi masalah ini',
          'Terlalu banyak sekatan peribadi yang tidak munasabah dalam perjanjian',
          'Meminta deposit yang melebihi 2+1 tanpa sebab kukuh',
        ],
        bulletsEn: [
          'Refuses to show property title or proof of ownership — may be an agent or unauthorized renter',
          'Insists on cash payments only with no receipt — difficult to claim deposit later',
          'No written agreement or defensive when asked to sign one',
          'Previous tenants had unresolved problems — ask former tenants if possible',
          'Assessment bill or utilities in another name / in arrears — you may inherit these problems',
          'Too many unreasonable personal restrictions in the agreement',
          'Requests a deposit exceeding 2+1 without valid justification',
        ],
      },
      {
        heading: 'Utiliti, Cukai Pintu, dan Tanggungjawab Lain',
        headingEn: 'Utilities, Assessment Tax, and Other Responsibilities',
        paragraphs: [
          'Sebelum masuk, pastikan anda faham siapa yang bertanggungjawab untuk setiap kos berkaitan hartanah tersebut. Keliru tentang perkara ini boleh menyebabkan pertikaian yang tidak perlu dengan tuan rumah atau bahkan tindakan oleh pihak berkuasa tempatan.',
          'Cukai Pintu (assessment tax atau cukai taksiran) ialah cukai yang perlu dibayar kepada Majlis Perbandaran oleh PEMILIK hartanah — bukan penyewa. Jika tuan rumah cuba mengenakan Cukai Pintu kepada anda, ia bertentangan dengan amalan standard dan perlu dicabar.',
        ],
        paragraphsEn: [
          'Before moving in, make sure you understand who is responsible for each property-related cost. Confusion about this can lead to unnecessary disputes with the landlord or even action by local authorities.',
          'Cukai Pintu (assessment tax) is a tax payable to the Municipal Council by the PROPERTY OWNER — not the tenant. If a landlord tries to charge you Cukai Pintu, this goes against standard practice and should be challenged.',
        ],
        bullets: [
          'Tukar nama akaun Tenaga Nasional Berhad (TNB) dan SYABAS/Air Selangor ke nama anda pada hari masuk',
          'Cukai Pintu — tanggungjawab tuan rumah, bukan penyewa',
          'Cukai Tanah (quit rent) — tanggungjawab tuan rumah',
          'Bayaran penyelenggaraan strata (untuk kondominium/apartmen) — semak dalam perjanjian siapa bayar',
          'Baiki kerosakan kecil bawah RM200 — biasanya tanggungjawab penyewa',
          'Kerosakan besar (paip pecah, aircond rosak, bumbung bocor) — tanggungjawab tuan rumah',
          'Simpan semua resit bil utiliti untuk rujukan apabila tuntut balik deposit',
        ],
        bulletsEn: [
          'Transfer TNB and SYABAS/Air Selangor accounts to your name on move-in day',
          'Cukai Pintu (assessment tax) — landlord\'s responsibility, not tenant\'s',
          'Quit rent (cukai tanah) — landlord\'s responsibility',
          'Strata maintenance fees (for condominiums/apartments) — check the agreement for who pays',
          'Minor repairs under RM200 — typically the tenant\'s responsibility',
          'Major damage (burst pipes, broken aircond, roof leaks) — landlord\'s responsibility',
          'Keep all utility bill receipts for reference when claiming back the deposit',
        ],
      },
      {
        heading: 'Notis Keluar dan Klausa Penting Dalam Perjanjian',
        headingEn: 'Notice to Vacate and Key Clauses in the Agreement',
        paragraphs: [
          'Tempoh notis keluar yang standard di Malaysia ialah 2 bulan (untuk perjanjian 12 bulan). Ini bermakna anda mesti beritahu tuan rumah anda ingin keluar sekurang-kurangnya 2 bulan sebelum tarikh anda bercadang untuk keluar — secara bertulis.',
          'Jika anda ingin keluar sebelum tamat tempoh perjanjian (break lease), anda mungkin perlu membayar sewa bagi baki bulan yang tinggal atau sekurang-kurangnya kehilangan deposit keselamatan anda. Pastikan perjanjian menyebut klausa ini dengan jelas supaya tiada kejutan.',
        ],
        paragraphsEn: [
          'The standard notice period for vacating in Malaysia is 2 months (for a 12-month agreement). This means you must inform the landlord in writing that you intend to leave at least 2 months before your intended move-out date.',
          'If you want to leave before the agreement period ends (break lease), you may need to pay rent for the remaining months or at least forfeit your security deposit. Make sure the agreement clearly states this clause to avoid surprises.',
        ],
        bullets: [
          'Klausa sublet: pastikan anda tahu sama ada anda dibenarkan menyewakan semula bilik kepada orang lain',
          'Klausa haiwan peliharaan: nyatakan dalam perjanjian jika anda ada haiwan — jangan sembunyi',
          'Klausa pengubahsuaian: dapatkan kebenaran bertulis sebelum menebuk dinding atau cat semula',
          'Klausa kenaikan sewa: semak sama ada tuan rumah boleh naikkan sewa di tengah-tengah tempoh perjanjian',
          'Klausa akses: tuan rumah MESTI beri notis 24-48 jam sebelum melawat, kecuali kecemasan',
          'Simpan semua komunikasi dengan tuan rumah melalui WhatsApp atau emel — ia boleh jadi bukti',
        ],
        bulletsEn: [
          'Subletting clause: know whether you are allowed to sublet rooms to others',
          'Pet clause: state it in the agreement if you have pets — don\'t hide it',
          'Renovation clause: get written permission before drilling walls or repainting',
          'Rent increase clause: check if the landlord can raise rent mid-agreement',
          'Access clause: landlord MUST give 24–48 hours notice before visiting, except in emergencies',
          'Keep all communication with your landlord via WhatsApp or email — it can serve as evidence',
        ],
      },
    ],
  },
  {
    slug: 'pelaburan-hartanah-malaysia-pemula',
    title: 'Pelaburan Hartanah untuk Pemula: Panduan Memulakan di Malaysia',
    titleEn: 'Property Investment for Beginners: Getting Started in Malaysia',
    description:
      'Kenapa hartanah, mengira hasil sewa, penghargaan modal, REITs vs pemilikan langsung, leveraj, kesilapan lazim, dan undang-undang Malaysia khusus untuk pelabur hartanah pemula.',
    descriptionEn:
      'Why property, calculating rental yield, capital appreciation, REITs vs direct ownership, leverage, common mistakes, and Malaysia-specific laws for beginner property investors.',
    publishedAt: '2026-06-22',
    readMinutes: 7,
    sections: [
      {
        heading: 'Kenapa Hartanah? Asas Pelaburan Hartanah Malaysia',
        headingEn: 'Why Property? The Basics of Malaysian Property Investment',
        paragraphs: [
          'Hartanah kekal sebagai kelas aset pelaburan paling popular di Malaysia atas beberapa sebab utama. Pertama, ia aset nyata (tangible) — berbeza dengan saham, anda boleh nampak, sentuh, dan guna. Kedua, ia menyediakan dua sumber pulangan serentak: aliran tunai (daripada sewa) dan penghargaan modal (kenaikan nilai hartanah dari masa ke masa).',
          'Data Pusat Maklumat Harta Tanah Negara (NAPIC) menunjukkan nilai hartanah kediaman di Malaysia purata meningkat 3-6% setahun dalam jangka panjang, walaupun ada tempoh penurunan jangka pendek. Tambahan pula, anda boleh menggunakan wang bank (leveraj) untuk memiliki aset bernilai tinggi dengan wang awal yang kecil.',
        ],
        paragraphsEn: [
          'Property remains the most popular investment asset class in Malaysia for several key reasons. First, it is a tangible asset — unlike shares, you can see, touch, and use it. Second, it provides two simultaneous sources of return: cash flow (from rent) and capital appreciation (rising property value over time).',
          'Data from the National Property Information Centre (NAPIC) shows Malaysian residential property values average 3–6% annual growth in the long term, despite short-term downturns. Furthermore, you can use bank money (leverage) to own a high-value asset with a small initial outlay.',
        ],
        bullets: [
          'Aset nyata dengan nilai intrinsik — tidak boleh menjadi sifar seperti saham syarikat gulung tikar',
          'Dua pulangan: hasil sewa bulanan + kenaikan nilai hartanah jangka panjang',
          'Leveraj: miliki aset RM500,000 dengan deposit RM50,000 (10%) — amplify pulangan',
          'Perlindungan inflasi: nilai hartanah dan sewa cenderung naik bersama inflasi',
          'Kawalan lebih besar: anda boleh tambah nilai melalui pengubahsuaian, pengurusan aktif',
        ],
        bulletsEn: [
          'Tangible asset with intrinsic value — cannot go to zero like a bankrupt company\'s shares',
          'Dual returns: monthly rental income + long-term property value appreciation',
          'Leverage: own a RM500,000 asset with just RM50,000 deposit (10%) — amplifies returns',
          'Inflation hedge: property values and rents tend to rise alongside inflation',
          'Greater control: you can add value through renovation, active management',
        ],
      },
      {
        heading: 'Mengira Hasil Sewa: Formula Asas Pelabur',
        headingEn: 'Calculating Rental Yield: The Investor\'s Basic Formula',
        paragraphs: [
          'Hasil sewa kasar (Gross Rental Yield) ialah angka pertama yang perlu anda kira sebelum membeli hartanah pelaburan. Formulanya mudah: (Sewa Tahunan ÷ Harga Belian) × 100. Hasil sewa 5% ke atas dianggap baik di Malaysia — di bawah 4% biasanya bermakna anda lebih bergantung kepada kenaikan nilai hartanah.',
          'Namun hasil sewa bersih (Net Rental Yield) lebih penting untuk perancangan sebenar. Tolak kos-kos berulang dari sewa tahunan sebelum bahagi dengan harga belian. Kos berulang merangkumi bayaran penyelenggaraan (jika strata), cukai tanah, cukai pintu, insurans, dan kos penyelenggaraan tahunan.',
        ],
        paragraphsEn: [
          'Gross Rental Yield is the first figure you need to calculate before buying an investment property. The formula is simple: (Annual Rent ÷ Purchase Price) × 100. A rental yield of 5% and above is considered good in Malaysia — below 4% usually means you are more dependent on capital appreciation.',
          'However, Net Rental Yield is more important for real planning. Deduct recurring costs from annual rent before dividing by purchase price. Recurring costs include maintenance fees (for strata), quit rent, assessment, insurance, and annual maintenance costs.',
        ],
        bullets: [
          'Contoh: Hartanah RM400,000, sewa RM1,800/bulan = Hasil Kasar (1,800×12÷400,000×100) = 5.4%',
          'Tolak kos: penyelenggaraan RM150/bulan + cukai + insurans ≈ RM2,400/tahun',
          'Hasil Bersih: (21,600 - 2,400) ÷ 400,000 × 100 = 4.8% — masih baik',
          'Sasaran kawasan hasil sewa tinggi: Cyberjaya, Putrajaya, Iskandar Puteri (JB), Penang Island',
          'Risiko kosong (vacancy): anggarkan 1-2 bulan kosong setahun dalam pengiraan anda',
        ],
        bulletsEn: [
          'Example: RM400,000 property, RM1,800/month rent = Gross Yield (1,800×12÷400,000×100) = 5.4%',
          'Deduct costs: maintenance RM150/month + taxes + insurance ≈ RM2,400/year',
          'Net Yield: (21,600 - 2,400) ÷ 400,000 × 100 = 4.8% — still good',
          'Target high-yield areas: Cyberjaya, Putrajaya, Iskandar Puteri (JB), Penang Island',
          'Vacancy risk: budget 1–2 months vacant per year in your calculations',
        ],
      },
      {
        heading: 'REITs vs Pemilikan Langsung: Mana Sesuai untuk Anda?',
        headingEn: 'REITs vs Direct Ownership: Which Suits You?',
        paragraphs: [
          'Real Estate Investment Trusts (REITs) ialah alternatif kepada pemilikan hartanah langsung. Anda membeli unit saham REITs di Bursa Malaysia dan mendapat dividen daripada sewa hartanah komersial (pusat beli-belah, pejabat, hospital) yang dimiliki oleh dana tersebut. Modal minimum serendah RM100 berbanding puluhan ribu untuk deposit hartanah.',
          'REITs Malaysia yang popular termasuk IGB REIT (Mid Valley, The Gardens), Pavilion REIT, Axis REIT, dan KLCC REIT. Dividen tahunan biasanya antara 4-7%. Kelemahannya: anda tidak mempunyai kawalan dan tidak boleh menggunakan leveraj bank.',
        ],
        paragraphsEn: [
          'Real Estate Investment Trusts (REITs) are an alternative to direct property ownership. You buy REIT unit shares on Bursa Malaysia and receive dividends from commercial property rents (shopping malls, offices, hospitals) owned by the fund. Minimum capital as low as RM100 compared to tens of thousands for a property deposit.',
          'Popular Malaysian REITs include IGB REIT (Mid Valley, The Gardens), Pavilion REIT, Axis REIT, and KLCC REIT. Annual dividends are typically 4–7%. The downside: you have no control and cannot use bank leverage.',
        ],
        bullets: [
          'REITs sesuai untuk: pelabur modal kecil, yang mahu pasif sepenuhnya, pendedahan hartanah komersial',
          'Pemilikan langsung sesuai untuk: yang mahu leveraj bank, kawalan penuh, nilai tambah aktif',
          'REITs: cecair (boleh jual bila-bila), tiada penyelenggaraan, dividen stabil',
          'Pemilikan langsung: tidak cecair (ambil masa untuk jual), penyelenggaraan aktif, potensi pulangan lebih tinggi',
          'Strategi terbaik pemula: mulakan dengan REIT sambil belajar, kemudian tambah hartanah langsung',
        ],
        bulletsEn: [
          'REITs best for: small capital investors, those wanting fully passive income, commercial property exposure',
          'Direct ownership best for: those wanting bank leverage, full control, active value-adding',
          'REITs: liquid (can sell anytime), no maintenance, stable dividends',
          'Direct ownership: illiquid (takes time to sell), active maintenance, higher return potential',
          'Best beginner strategy: start with REITs while learning, then add direct property',
        ],
      },
      {
        heading: 'Undang-Undang Malaysia Khusus untuk Pelabur Hartanah',
        headingEn: 'Malaysia-Specific Laws for Property Investors',
        paragraphs: [
          'Cukai Keuntungan Harta Tanah (CKHT atau RPGT) ialah cukai yang perlu dibayar ke atas keuntungan apabila anda menjual hartanah. Kadar RPGT bergantung kepada berapa lama anda memegang hartanah — semakin lama pegang, semakin rendah kadar cukai. Selepas 5 tahun, kadarnya berkurang dengan ketara.',
          'Bagi warganegara Malaysia, kadar RPGT 2026 ialah: tahun 1-2 (30%), tahun 3 (20%), tahun 4 (15%), tahun 5 (10%), selepas tahun 5 (0% untuk warganegara). Ini bermakna strategi "beli dan pegang" selama lebih 5 tahun adalah lebih menguntungkan dari segi cukai.',
        ],
        paragraphsEn: [
          'Real Property Gains Tax (RPGT or CKHT) is a tax payable on profits when you sell a property. The RPGT rate depends on how long you hold the property — the longer you hold, the lower the tax rate. After 5 years, the rate reduces significantly.',
          'For Malaysian citizens, the 2026 RPGT rates are: years 1–2 (30%), year 3 (20%), year 4 (15%), year 5 (10%), after year 5 (0% for citizens). This means a "buy and hold" strategy for more than 5 years is more tax-advantageous.',
        ],
        bullets: [
          'RPGT selepas 5 tahun = 0% untuk warganegara Malaysia — reward untuk pelabur jangka panjang',
          'Pembeli asing dikenakan RPGT lebih tinggi dan had pemilikan (biasanya RM1 juta ke atas sahaja)',
          'Untuk hartanah pertama: pengecualian RPGT sekali seumur hidup bagi warganegara',
          'DSR (Debt Service Ratio) bank: pinjaman kedua dan ketiga biasanya diluluskan pada kadar faedah lebih tinggi',
          'Had 70% margin pembiayaan (LTV) berkuat kuasa untuk pinjaman ketiga ke atas',
          'Pelaburan dalam zon Iskandar Malaysia mendapat insentif cukai khas — semak dengan IRDA',
        ],
        bulletsEn: [
          'RPGT after 5 years = 0% for Malaysian citizens — a reward for long-term investors',
          'Foreign buyers face higher RPGT and ownership restrictions (usually minimum RM1 million)',
          'For first property: one-time lifetime RPGT exemption for citizens',
          'Bank DSR: second and third loans are typically approved at higher interest rates',
          '70% loan-to-value (LTV) margin applies for third loan onwards',
          'Investments in Iskandar Malaysia zones receive special tax incentives — check with IRDA',
        ],
      },
      {
        heading: 'Kesilapan Lazim Pelabur Hartanah Pemula',
        headingEn: 'Common Mistakes by Beginner Property Investors',
        paragraphs: [
          'Ramai pelabur pemula terjebak dalam perangkap yang sama. Memahami kesilapan ini sebelum anda membuat pelaburan pertama boleh menyelamatkan anda daripada kerugian kewangan yang besar dan tekanan emosi yang tidak perlu.',
          'Kesilapan paling kritikal: membeli hartanah berdasarkan emosi atau "rasa bagus" tanpa analisis angka yang teliti. Setiap pelaburan hartanah perlu diasaskan pada data — harga pasaran semasa, kadar sewa kawasan, kadar kosong, dan unjuran pertumbuhan yang realistik.',
        ],
        paragraphsEn: [
          'Many beginner investors fall into the same traps. Understanding these mistakes before making your first investment can save you from significant financial loss and unnecessary emotional stress.',
          'The most critical mistake: buying property based on emotion or "good feeling" without careful number analysis. Every property investment must be grounded in data — current market prices, area rental rates, vacancy rates, and realistic growth projections.',
        ],
        bullets: [
          'Beli tanpa kira hasil sewa terlebih dahulu — terlalu fokus pada kenaikan nilai sahaja',
          'Tidak anggarkan kos kosong — andaikan penyewa sentiasa ada sepanjang masa',
          'Overleveraj: beli terlalu banyak hartanah sekaligus sehingga aliran tunai negatif',
          'Pilih lokasi yang "rasa akan naik" tanpa data asas (kemudahan, pekerjaan, pertumbuhan penduduk)',
          'Abaikan kos tersembunyi: penyelenggaraan, sinking fund, pengurusan agen, kos kosong',
          'Jual terlalu awal (sebelum 5 tahun) dan kena RPGT yang tinggi',
          'Tidak vet penyewa dengan teliti — penyewa bermasalah boleh habiskan keuntungan anda dalam masa berbulan',
        ],
        bulletsEn: [
          'Buying without calculating rental yield first — too focused on value appreciation alone',
          'Not budgeting for vacancy periods — assuming tenants are always present',
          'Over-leveraging: buying too many properties at once causing negative cash flow',
          'Choosing locations that "feel like they\'ll rise" without fundamental data (amenities, jobs, population growth)',
          'Ignoring hidden costs: maintenance, sinking fund, agent management fees, vacancy costs',
          'Selling too early (before 5 years) and paying high RPGT',
          'Not vetting tenants carefully — problematic tenants can wipe out profits over months',
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
