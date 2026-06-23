import { Listing, formatPrice, pricePerSqft, plausibleSize, displayBedrooms, displayBathrooms, stripUnitNo } from './listings';

/**
 * Generates a unique, fact-based description for a listing in EN and BM.
 * Templates are picked deterministically from the listing id so every
 * listing gets stable but varied copy (avoids SEO duplicate-content issues).
 * Only states facts present in the data — never invents amenities.
 */

function hashSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(arr: T[], seed: number, salt: number): T {
  return arr[(seed + salt) % arr.length];
}

export function describeListing(l: Listing): { en: string; bm: string } {
  const seed = hashSeed(l.id);
  const isRent = l.listingType === 'rent';
  const typeName = l.propertyType || l.category;
  const area = stripUnitNo(l.location || '') || [l.subarea, l.region].filter(Boolean).join(', ') || 'Malaysia';
  const price = formatPrice(l.price, l.listingType);
  const psf = pricePerSqft(l);

  // ── Facts ──
  // Strip trailing period from unit (e.g. "sq.ft.") so sentences don't end ".."
  const size = plausibleSize(l);
  const sizeTxt = size ? `${size.toLocaleString('en-MY')} ${l.sizeUnit.replace(/\.$/, '')}` : '';

  // 0 means "not stated"; for Room rentals the counts describe the whole unit — skip both
  const nBeds = displayBedrooms(l);
  const nBaths = displayBathrooms(l);
  const bedsEn = nBeds ? `${nBeds} bedroom${nBeds === 1 ? '' : 's'}` : '';
  const bathsEn = nBaths ? `${nBaths} bathroom${nBaths === 1 ? '' : 's'}` : '';
  const roomsEn = bedsEn && bathsEn ? `${bedsEn} and ${bathsEn}` : bedsEn || bathsEn;

  const bedsBm = nBeds ? `${nBeds} bilik tidur` : '';
  const bathsBm = nBaths ? `${nBaths} bilik air` : '';
  const roomsBm = bedsBm && bathsBm ? `${bedsBm} dan ${bathsBm}` : bedsBm || bathsBm;

  // "a" vs "an" for the EN openers
  const art = /^[aeiou]/i.test(typeName) ? 'An' : 'A';
  const artLower = art.toLowerCase();

  // ── EN ──
  const openersEn = isRent
    ? [
        `This ${typeName.toLowerCase()} in ${area} is available for rent at ${price}.`,
        `Now available to rent: ${artLower} ${typeName.toLowerCase()} located in ${area} at ${price}.`,
        `${art} ${typeName.toLowerCase()} for rent in ${area}, asking ${price}.`,
      ]
    : [
        `This ${typeName.toLowerCase()} in ${area} is on the market at ${price}.`,
        `For sale: ${artLower} ${typeName.toLowerCase()} located in ${area}, priced at ${price}.`,
        `${art} ${typeName.toLowerCase()} in ${area} listed at ${price}.`,
      ];

  const middleEn: string[] = [];
  if (roomsEn && sizeTxt) {
    middleEn.push(
      pick(
        [
          `The unit offers ${roomsEn} across ${sizeTxt} of living space.`,
          `It comes with ${roomsEn} and measures ${sizeTxt}.`,
          `Inside you'll find ${roomsEn} within a ${sizeTxt} layout.`,
        ],
        seed, 1,
      ),
    );
  } else if (roomsEn) {
    middleEn.push(`The unit comes with ${roomsEn}.`);
  } else if (sizeTxt) {
    middleEn.push(`The property measures ${sizeTxt}.`);
  }
  if (psf !== null && !isRent) {
    middleEn.push(`That works out to about RM${psf.toLocaleString('en-MY')} per sq.ft.`);
  }

  const closersEn = isRent
    ? [
        `Listed by ${l.featured ? 'the eHartanah agency team' : 'a private owner'} — contact directly via WhatsApp to arrange a viewing.`,
        `Get in touch ${l.featured ? 'with our agency team' : 'with the owner directly'} on WhatsApp for availability and viewing times.`,
      ]
    : [
        `Listed by ${l.featured ? 'the eHartanah agency team' : 'a private owner'} — enquire via WhatsApp for more details or to arrange a viewing.`,
        `Contact ${l.featured ? 'our agency team' : 'the seller directly'} through WhatsApp to learn more about this property.`,
      ];

  const en = [pick(openersEn, seed, 0), ...middleEn, pick(closersEn, seed, 2)].join(' ');

  // ── BM ──
  const openersBm = isRent
    ? [
        `${typeName} ini di ${area} kini ditawarkan untuk disewa pada ${price}.`,
        `Untuk disewa: ${typeName.toLowerCase()} yang terletak di ${area} pada kadar ${price}.`,
      ]
    : [
        `${typeName} ini di ${area} kini ditawarkan untuk dijual pada harga ${price}.`,
        `Untuk dijual: ${typeName.toLowerCase()} yang terletak di ${area}, berharga ${price}.`,
      ];

  const middleBm: string[] = [];
  if (roomsBm && sizeTxt) {
    middleBm.push(
      pick(
        [
          `Unit ini mempunyai ${roomsBm} dengan keluasan ${sizeTxt}.`,
          `Ia dilengkapi ${roomsBm} dan berkeluasan ${sizeTxt}.`,
        ],
        seed, 1,
      ),
    );
  } else if (roomsBm) {
    middleBm.push(`Unit ini mempunyai ${roomsBm}.`);
  } else if (sizeTxt) {
    middleBm.push(`Hartanah ini berkeluasan ${sizeTxt}.`);
  }
  if (psf !== null && !isRent) {
    middleBm.push(`Ini bersamaan kira-kira RM${psf.toLocaleString('en-MY')} sekaki persegi.`);
  }

  const closersBm = isRent
    ? [
        `Disenaraikan oleh ${l.featured ? 'pasukan agensi eHartanah' : 'pemilik persendirian'} — hubungi terus melalui WhatsApp untuk atur lawatan.`,
      ]
    : [
        `Disenaraikan oleh ${l.featured ? 'pasukan agensi eHartanah' : 'pemilik persendirian'} — hubungi melalui WhatsApp untuk maklumat lanjut atau atur lawatan.`,
      ];

  const bm = [pick(openersBm, seed, 0), ...middleBm, pick(closersBm, seed, 2)].join(' ');

  return { en, bm };
}
