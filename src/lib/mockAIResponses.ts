export const EXAMPLE_PROMPTS: string[] = [
  "I earn RM5,000/month, what property can I afford?",
  "Find me rent-to-own homes near MRT stations",
  "Show auction properties below RM250,000",
  "Best areas for high rental yield investment in KL",
  "I'm a first-time buyer with RM30,000 savings",
  "Compare buying in Penang vs Johor Bahru",
  "What's a good rental yield in Malaysia?",
  "How does the rent-to-own process work?",
];

export function getMockAIResponse(input: string): string {
  const q = input.toLowerCase();

  if (q.includes('afford') || q.includes('rm5k') || q.includes('rm 5k') || q.includes('rm5,000') || q.includes('5000') || q.includes('5,000')) {
    return `Based on a monthly income of RM5,000, you can typically afford a property priced between **RM250,000 and RM350,000** — assuming a 90% margin financing and a loan tenure of 35 years. Your estimated monthly mortgage would be around RM1,400–RM1,800.

**Best fit areas for your budget:** Consider Cheras (from RM210k), Subang Jaya apartments (RM280k–RM380k), Shah Alam condos (RM250k–RM320k), or Puchong (RM240k–RM350k). All of these offer good MRT/LRT connectivity and strong rental demand if you decide to rent out the unit later.

**Smart strategy:** Look at our Rent-to-Own listings — with just RM5,000–RM8,000 upfront deposit, you can secure a unit at today's price while renting it for 3–5 years, allowing you to save for a larger down payment and build your CCRIS credit profile.

**Financing tip:** Apply for MyDeposit or PR1MA schemes if eligible — the government can top up to RM30,000 towards your down payment, effectively letting you enter the market with minimal savings. Shall I filter properties within your budget?`;
  }

  if (q.includes('rm3k') || q.includes('rm 3k') || q.includes('rm3,000') || q.includes('3000') || q.includes('3,000 salary') || q.includes('earn rm3')) {
    return `With a RM3,000 monthly income, your maximum loan eligibility is approximately **RM180,000–RM220,000**. This positions you well for the affordable housing segment.

**Key options to explore:** Government affordable schemes like PR1MA (up to RM300k), Rumah Selangorku (up to RM250k for Selangor residents), and PPA1M are designed precisely for your income bracket. These schemes often come with below-market pricing and flexible financing.

**Rent-to-Own is a strong fit for you.** With minimal upfront cash (as low as RM5,000), you can lock in a property today at current prices. As your income grows over 3–5 years, you\'ll be in a much stronger position to convert to a mortgage.

**Areas to consider:** Rawang, Semenyih, Nilai, and Banting offer landed properties in the RM180k–RM220k range. While further from the city, these areas have improving infrastructure and strong price appreciation trends. Want me to shortlist specific properties?`;
  }

  if (q.includes('rm4k') || q.includes('rm 4k') || q.includes('rm4,000') || q.includes('earn rm4') || q.includes('4000 salary')) {
    return `At RM4,000/month, you can comfortably target properties between **RM220,000 and RM300,000** with a standard 90% loan. Your estimated monthly repayment would be RM1,100–RM1,500 — ideally keeping total debt obligations below 60% of gross income.

**Sweet spot picks:** Cheras and Kepong apartments (RM220k–RM280k), Subang Jaya studio condos (RM250k–RM290k), and Shah Alam starter units (RM240k–RM290k) are within range and offer solid rental yields of 5.5%–7%.

**Investment angle:** At this budget, consider properties near MRT or LRT stations. A RM260k condo near Cheras MRT renting at RM1,400/month gives a gross yield of ~6.5%. This means your tenant effectively subsidises most of your mortgage.

**What to avoid:** Overleveraging into RM350k+ properties by stretching your loan tenure. Keep a 6-month emergency fund before committing. Would you like me to calculate a specific property\'s affordability for you?`;
  }

  if (q.includes('rm6k') || q.includes('rm 6k') || q.includes('rm6,000') || q.includes('earn rm6') || q.includes('6000 salary')) {
    return `With RM6,000 monthly income, you have solid purchasing power — targeting properties between **RM380,000 and RM550,000** is realistic. You\'ll qualify for a 90% margin on most banks' residential loan products.

**Upgrade your options:** Bangsar South integrated condos (RM450k–RM620k), Mont Kiara (RM500k–RM700k), or KL City Centre fringe areas like Sentul and Titiwangsa (RM380k–RM520k) come into your range.

**Investment-grade picks:** Look at properties with a gross rental yield of 5%+. A RM480k condo in Bangsar South renting at RM2,400/month yields 6% — a strong return in today\'s market. The corporate tenant pool in these areas is large and stable.

**Dual strategy:** Consider buying a smaller, high-yield unit now (RM350k–RM400k, yield 5.5%–7%) and letting rental income subsidise your mortgage while you save for an upgrade in 5–7 years. This "investment-first" approach builds equity faster. Ready to see specific listings?`;
  }

  if (q.includes('auction')) {
    return `**Malaysia bank auctions** offer some of the best discounts available — properties listed at 15% to 40% below market value. These are properties where the previous owner defaulted on their mortgage, and the bank is selling to recover the loan.

**How to bid:** You\'ll need a bank draft of typically 10% of the reserve price on auction day. Research the property thoroughly beforehand — check for outstanding quit rent (cukai tanah), assessment (cukai pintu), and service charges. Our AI Score helps filter the cleanest deals.

**Risk levels explained:**\n- **Low Risk:** Vacant, clear title, no encumbrances — ideal for beginners\n- **Medium Risk:** May be tenanted, some outstanding charges — manageable with due diligence\n- **High Risk:** Occupier disputes, structural issues possible — experienced investors only

**Top picks right now:** Our AI rates the Kuchai Lama apartment (9.2/10) and Penang Semi-D (8.9/10) as the strongest auction deals this month. Both are Low Risk with strong price appreciation potential. Shall I show you properties by risk level or location?`;
  }

  if (q.includes('rent-to-own') || q.includes('rent to own') || q.includes('rto')) {
    return `**Rent-to-Own (RTO)** is a powerful pathway to homeownership — especially for those without a large down payment or with a less-than-perfect credit score. Here\'s how it works in Malaysia:

**Step 1 — Sign the Option Agreement:** You pay a small upfront deposit (RM5,000–RM20,000) and sign a contract giving you the *right* to purchase the property at a fixed price anytime during the rental period.

**Step 2 — Rent with credit accumulation:** Every month, a portion (20%–40%) of your rent is credited towards the purchase price. Over 3–5 years, this can add up to RM12,000–RM46,000 in credits.

**Step 3 — Exercise your option:** At any point (or at the end of the period), you can convert your accumulated credits into a down payment and apply for a standard mortgage — by which time your income may have grown and your credit history is established.

**Who should consider RTO?** First-time buyers, self-employed individuals, and those with previous loan rejections. Our AI Suitability Checker can tell you which RTO programme fits your profile in under 2 minutes. Want me to run a quick suitability check?`;
  }

  if (q.includes('mrt') || q.includes('lrt') || q.includes('transit') || q.includes('public transport')) {
    return `Properties near MRT and LRT stations command a **rental premium of 15%–25%** compared to equivalent units further away. The "walkability bonus" is real — tenants pay more, vacancy is lower, and resale is faster.

**MRT-adjacent hotspots right now:**\n- **Cheras (MRT Cochrane, Maluri):** Condos from RM210k with rental yields of 6.5%–7.5%\n- **Subang Jaya LRT:** RM380k–RM500k range, popular with students and professionals\n- **Bangsar South (Kerinchi LRT):** RM500k–RM750k, corporate tenant pool, 5.5%–6.5% yield\n- **Cyberjaya-Putrajaya (MRT):** RM280k–RM400k, growing demand from government sector

**MRT3 (Circle Line)** — once completed, areas like Ampang, Kuala Lumpur Outer Ring, and Jalan Ipoh will see significant uplift. Buying now before the station premium kicks in is a smart early-mover strategy.

**Our recommendation:** Filter by "MRT Nearby" tag in Subsale and Rent-to-Own listings to see transit-oriented properties. Should I focus on a specific MRT line or budget range?`;
  }

  if (q.includes('klcc') || q.includes('city centre') || q.includes('kl city')) {
    return `**KLCC and KL City Centre** remain Malaysia\'s most internationally recognised property addresses — and one of the best markets for high-end rental demand driven by expatriates, corporate executives, and serviced apartment tenants.

**Price ranges:** Condos in KLCC sell from RM800k (older buildings) to RM3M+ for premium towers. Rental income ranges from RM3,500/month for a 1-bedroom to RM8,000+/month for a 3-bedroom with Twin Towers view.

**Rental yield reality:** Due to high entry prices, gross yields in KLCC typically run 4%–5.5% — lower than suburban condos but with stronger capital appreciation and currency-denominated tenant demand. Many high-net-worth investors hold KLCC units as wealth preservation assets.

**Best value plays:** Consider KL fringe areas like Sentul, Titiwangsa, or KL Eco City (Bangsar) — you get the KL address and proximity at 30%–40% lower cost, with comparable or better rental yields. Shall I show you current listings near KLCC?`;
  }

  if (q.includes('penang')) {
    return `**Penang** remains one of Malaysia\'s most sought-after property markets — and for good reason. The island combines UNESCO World Heritage charm, a thriving tech industry (Intel, Bosch, Osram), and strong local and expat demand.

**Penang Island vs. Mainland (Seberang Perai):**\n- **Island:** RM500k–RM2M for condos; high demand, limited new land supply driving prices\n- **Mainland:** RM250k–RM600k; rapidly improving connectivity via Penang Transport Master Plan and the upcoming third bridge

**Investment highlights:** Georgetown heritage shophouses are in a class of their own — freehold, boutique hotel/Airbnb potential, and supply is strictly limited by heritage laws. Yields of 5%–7% are achievable.

**Auction opportunities:** Our platform lists several Penang auction properties with 20%–28% discounts. The Bayan Lepas semi-D (AI Score 8.9) near the industrial free trade zone is particularly strong — proximity to Penang airport and Intel/Bosch campuses ensures robust tenant demand. Want to see Penang-specific listings?`;
  }

  if (q.includes('johor') || q.includes('jb') || q.includes('johor bahru') || q.includes('iskandar')) {
    return `**Johor Bahru and the Iskandar Malaysia** corridor are experiencing a historic renaissance driven by one catalyst: the Johor-Singapore **Rapid Transit System (RTS Link)**, now under construction with completion targeted for 2026.

**Why JB now?** Singapore proximity means Malaysian properties offer Singapore workers 60%–70% lower cost of living. A JB condo at RM320k generates RM1,600–RM2,200/month in rent from Singapore commuters — yielding 6%–8% gross.

**Iskandar zone hotspots:**\n- **Danga Bay:** Waterfront condos from RM188k (including auction deals)\n- **Medini:** Healthcare and edu hub; strong institutional tenant base\n- **Johor Bahru City Centre:** Walking distance to the RTS station; highest appreciation potential

**One key risk:** Johor has seen oversupply in the past. Stick to transit-adjacent developments and avoid projects far from the RTS corridor. Our AI filters for proximity to the upcoming RTS stations. Shall I show available JB properties and auction deals?`;
  }

  if (q.includes('yield') || q.includes('investment') || q.includes('return') || q.includes('roi')) {
    return `**Gross rental yield** in Malaysia varies significantly by location and property type. Here\'s a market overview:

**Highest yield areas (6%–8%):**\n- Cheras (KL) — affordable entry, strong MRT-driven demand\n- Johor Bahru — Singapore commuter and RTS Link premium\n- Subang Jaya — student and professional market near Taylor\'s University\n- Cyberjaya — MSC Status tech hub, corporate tenants

**Mid-yield areas (4.5%–6%):**\n- Bangsar South, PJ, Damansara — balanced capital growth and income\n- Georgetown Penang — heritage premium with strong short-term rental\n- Kota Kinabalu — growing tourism and expat demand

**How to calculate:** Gross Yield = (Annual Rent ÷ Purchase Price) × 100. A RM350k condo renting at RM1,750/month gives 6% gross. Net yield after maintenance, assessment, and vacancy typically lands 1%–1.5% lower.

**Our recommendation:** Use the Yield Calculator on our Investment Insights page, or tell me a specific area and budget — I\'ll find properties with the best risk-adjusted returns for you.`;
  }

  if (q.includes('first time') || q.includes('first-time') || q.includes('beginner') || q.includes('new buyer')) {
    return `Congratulations on taking your first step towards homeownership! Here\'s a **first-time buyer roadmap** tailored for Malaysia:

**Step 1 — Check your eligibility:** Apply for MyDeposit (up to RM30,000 down payment assistance) and the First Home Ownership Campaign (stamp duty exemptions on first homes up to RM500,000). These can save you RM15,000–RM30,000 upfront.

**Step 2 — Know your CCRIS:** Banks use your Central Credit Reference Information System (CCRIS) report to assess creditworthiness. Clear any outstanding credit card or personal loan arrears at least 6 months before applying.

**Step 3 — Choose your path:**\n- *Conventional purchase:* 10% down payment + SPA legal fees (1%–3%)\n- *Rent-to-Own:* Just RM5,000–RM12,000 upfront, lock today\'s price, buy later\n- *Auction:* Higher complexity but potentially 20%–30% below market value

**Best first-time buyer picks on eHartanah:** Shah Alam affordable apartments (from RM210k), Cheras MRT condos (from RM210k), and our Rent-to-Own programme in Cyberjaya (RM5,000 deposit, RM1,400/month). Want me to walk you through any of these?`;
  }

  if (q.includes('below market') || q.includes('undervalue') || q.includes('bargain') || q.includes('cheap')) {
    return `Finding **below-market properties** in Malaysia requires looking at three main channels — and our AI actively scans all three:

**1. Bank Auctions (Lelong):** The most reliable source of below-market deals. CIMB, Maybank, and Public Bank regularly auction properties at 15%–35% below market value. Our AI Score helps you identify which auctions have clean titles and strong upside.

**2. Motivated Sellers in Subsale:** Look for properties tagged "Below Market" — these are sellers in time-sensitive situations (emigration, divorce, financial pressure) willing to accept below valuation. Our agents flag these listings as they emerge.

**3. Rent-to-Own with Locked Price:** By signing today\'s option price, you are effectively buying at today\'s market price — which becomes below-market by the time you exercise your option in 3–5 years, assuming normal 3%–5% annual appreciation.

**This week\'s top below-market picks:**\n- Kuchai Lama Apartment — 28% below market (AI Score 9.2)\n- Penang Semi-D Auction — 24% below market (AI Score 8.9)\n- Ampang Hilir Condo Auction — 28% below market (AI Score 8.7)\n\nShall I show you all current below-market listings sorted by discount?`;
  }

  // Default fallback
  return `Thank you for your question! As eHartanah\'s AI Property Advisor, I\'m here to help you navigate Malaysia\'s property market with personalised insights.

**I can help you with:**\n- Finding properties within your budget based on income\n- Comparing areas for investment yield (KL, Selangor, Penang, Johor)\n- Explaining the auction buying process and risk assessment\n- Understanding Rent-to-Own programmes and eligibility\n- Calculating rental yields and investment returns\n- First-time buyer grants, schemes, and stamp duty exemptions

**To give you the most relevant advice**, try being specific — for example: *"I earn RM4,500/month and have RM25,000 saved, looking for investment in Subang Jaya"* or *"What's the risk on Kuchai Lama auction property?"*

You can also click any of the example prompts below to get started instantly. Our AI is trained on live Malaysian property market data, Bank Negara guidelines, and thousands of property transactions across all 13 states.`;
}
