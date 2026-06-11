"""Build own-listings.json from the PropertyGuru screenshots in the Drive folder."""
import json
import os

# (id, title, propertyType, listingType, price, sqft, beds, baths, posted)
ROWS = [
    ("501331864", "Solok Seri Kenangan 3", "1-storey Terraced House", "rent", 1000, 1400, 3, 2, "2026-05-14"),
    ("501319352", "Avenue Court", "Apartment", "rent", 1050, 926, 3, 2, "2026-05-13"),
    ("501310574", "Fortune Park (Suria Perdana)", "Condominium", "rent", 1090, 1249, 3, 2, "2026-05-12"),
    ("501310494", "Greenview Residence", "Condominium", "rent", 1260, 1356, 3, 2, "2026-05-12"),
    ("501310350", "Mentari Court", "Apartment", "rent", 1050, 775, 3, 2, "2026-05-12"),
    ("501310250", "Desa Satu", "Flat", "rent", 630, 657, 3, 2, "2026-05-12"),
    ("500981218", "Empire Damansara", "Service Residence", "rent", 1200, 700, 1, 2, "2026-05-10"),
    ("501291886", "Pangsapuri Pendamar B", "Apartment", "rent", 650, 657, 3, 2, "2026-05-08"),
    ("501282288", "Taman Bukit Rawang Jaya", "Flat", "rent", 650, 872, 3, 2, "2026-05-07"),
    ("501282139", "Las Palmas", "Flat", "rent", 750, 678, 3, 2, "2026-05-07"),
    ("501282104", "Las Palmas", "Flat", "rent", 600, 678, 3, 2, "2026-05-07"),
    ("501280831", "Pangsapuri Saraka", "Apartment", "rent", 350, 89, None, None, "2026-05-07"),
    ("501280744", "Pangsapuri Saraka", "Apartment", "rent", 500, 86, None, None, "2026-05-07"),
    ("501271001", "Vista Saujana", "Apartment", "rent", 350, 86, None, None, "2026-05-06"),
    ("501270941", "Vista Saujana", "Apartment", "rent", 350, 86, None, None, "2026-05-06"),
    ("501270822", "Vista Saujana", "Apartment", "rent", 400, 90, None, 1, "2026-05-06"),
    ("501262047", "Endah Regal Condominium", "Condominium", "rent", 1500, 1141, 3, 2, "2026-05-05"),
    ("501231989", "Pangsapuri Seri Mutiara", "Apartment", "rent", 1200, 939, 3, 2, "2026-04-30"),
    ("501218734", "Residensi Alam Damai (PR1MA @ Alam Damai)", "Apartment", "rent", 400, 70, None, None, "2026-04-28"),
    ("501218670", "Residensi Alam Damai (PR1MA @ Alam Damai)", "Apartment", "rent", 500, 70, None, None, "2026-04-28"),
    ("501218386", "Residensi Alam Damai (PR1MA @ Alam Damai)", "Apartment", "rent", 600, 90, None, 1, "2026-04-28"),
    ("501177740", "Residensi Lambaian Dua", "Bungalow", "rent", 1150, 3735, 4, 4, "2026-04-22"),
    ("501177267", "Jalan Dato Dagang 30", "2-storey Terrace House", "rent", 850, 1380, 4, 3, "2026-04-22"),
    ("501177089", "Golden Hills Resort (Amber Court Apartment)", "Apartment", "rent", 1120, 1195, 3, 1, "2026-04-22"),
    ("501176863", "Rebana Flat", "Flat", "rent", 350, 657, 3, 2, "2026-04-22"),
    ("501176678", "Laguna Biru", "Apartment", "rent", 750, 850, 3, 2, "2026-04-22"),
    ("501168697", "Rebana Flat", "Flat", "rent", 300, 656, 3, 2, "2026-04-21"),
    ("501168637", "Apartment Idaman", "Apartment", "rent", 650, 667, 3, 2, "2026-04-21"),
    ("501168288", "Garden Park", "Apartment", "rent", 770, 882, 3, 2, "2026-04-21"),
    ("501168194", "Jalan Murni 5/2, Taman Langat Murni", "2-storey Terrace House", "rent", 800, 1334, 3, 2, "2026-04-21"),
    ("501168119", "Residensi Warnasari 1", "Apartment", "rent", 770, 721, 3, 2, "2026-04-21"),
    ("501168054", "Pangsapuri Perdana Villa", "Apartment", "rent", 840, 775, 3, 2, "2026-04-21"),
    ("501166795", "Pangsapuri Seroja", "Flat", "rent", 770, 667, 3, 2, "2026-04-21"),
    ("501165501", "One Selayang", "Apartment", "rent", 770, 829, 3, 2, "2026-04-21"),
    ("501162687", "Seksyen 24 Shah Alam", "Flat", "rent", 700, 603, 3, 2, "2026-04-21"),
    ("501158478", "Seraya Apartments", "Apartment", "rent", 700, 936, 3, 1, "2026-04-20"),
    ("501158028", "Gardenia Court", "Condominium", "rent", 910, 893, 3, 2, "2026-04-20"),
    ("501157863", "Bayu Tasik 2", "Condominium", "rent", 650, 100, None, 1, "2026-04-20"),
    ("501133348", "Laguna Biru", "Apartment", "rent", 1200, 850, 3, 2, "2026-04-16"),
    ("501124626", "Magna Ville", "Condominium", "rent", 1200, 947, 3, 2, "2026-04-15"),
    ("501124532", "Mentari Court", "Apartment", "rent", 1000, 775, 3, 2, "2026-04-15"),
    ("501107116", "Jalan SJ 30, Taman Selayang Jaya", "2-storey Terrace House", "rent", 1000, 700, 3, 2, "2026-04-13"),
    ("501106998", "Vista Bayu", "Apartment", "rent", 1300, 1152, 3, 2, "2026-04-13"),
    ("501106971", "Impian", "Flat", "rent", 1300, 635, 3, 2, "2026-04-13"),
    ("501106936", "Puchong Permata 1", "Apartment", "rent", 900, 850, 3, 2, "2026-04-13"),
    ("501106905", "Sri Cempaka (Taman Wawasan)", "Apartment", "rent", 1000, 731, 3, 2, "2026-04-13"),
    ("501092635", "Pangsapuri Rimba Jaya", "Apartment", "rent", 700, 743, 3, 2, "2026-04-11"),
    ("501092493", "Pangsapuri Seri Mawar", "Apartment", "rent", 1000, 721, 3, 2, "2026-04-11"),
    ("501092115", "Seri Mutiara", "Apartment", "rent", 900, 646, 3, 2, "2026-04-11"),
    ("501092071", "Apartment Ruby", "Apartment", "rent", 1000, 1033, 3, 2, "2026-04-11"),
    ("501088896", "Residensi Warnasari 1", "Apartment", "rent", 1000, 721, 3, 2, "2026-04-10"),
    ("501087135", "Impian", "Flat", "rent", 1000, 635, 3, 2, "2026-04-10"),
    ("501086663", "Mentari Court", "Apartment", "rent", 1200, 775, 3, 2, "2026-04-10"),
    ("501086635", "Mentari Court", "Apartment", "rent", 1250, 775, 3, 2, "2026-04-10"),
    ("501086606", "Mentari Court", "Apartment", "rent", 1300, 775, 3, 2, "2026-04-10"),
    ("501084682", "Sri Cempaka (Taman Wawasan)", "Apartment", "rent", 1300, 732, 3, 2, "2026-04-10"),
    ("501022122", "The Scott Garden SOHO", "Service Residence", "rent", 1300, 764, None, 2, "2026-04-02"),
    ("500994873", "Jalan Hillpark 8/5", "2-storey Terrace House", "rent", 1000, 2917, 4, 3, "2026-03-30"),
    ("500994833", "Jalan Hillpark 8/5", "2-storey Terrace House", "sale", 761400, 2917, 4, 3, "2026-03-30"),
    ("500994712", "Vista Seri Putra", "Apartment", "rent", 950, 936, 3, 2, "2026-03-30"),
    ("500994681", "Vista Seri Putra", "Apartment", "sale", 164025, 936, 3, 2, "2026-03-30"),
    ("500541102", "Rebana Flat", "Flat", "rent", 350, 657, 3, 2, "2026-03-28"),
    ("500590914", "Pangsapuri Perdana Villa", "Apartment", "rent", 700, 850, 3, 2, "2026-03-28"),
    ("500523885", "Golden Hills Resort (Amber Court Apartment)", "Apartment", "rent", 1000, 1195, 3, 2, "2026-03-28"),
    ("500973181", "Seraya Apartments", "Apartment", "rent", 950, 936, 3, 2, "2026-03-26"),
    ("500973135", "Seraya Apartments", "Apartment", "sale", 198000, 936, 3, 2, "2026-03-26"),
    ("500972831", "Jemerlang Apartment", "Apartment", "sale", 160380, 807, 3, 2, "2026-03-26"),
    ("500963480", "Gardenia Court", "Condominium", "rent", 950, 893, 3, 2, "2026-03-25"),
    ("500963444", "Gardenia Court", "Condominium", "sale", 246050, 893, 3, 2, "2026-03-25"),
    ("500961857", "Teratak Muhibbah", "Apartment", "sale", 137000, 602, 3, 2, "2026-03-25"),
    ("500961810", "Sri Penara", "Apartment", "sale", 219000, 645, 3, 2, "2026-03-25"),
    ("500961715", "Pangsapuri Putra Indah", "Apartment", "sale", 229000, 850, 4, 2, "2026-03-25"),
]

HOUSE_TYPES = {"1-storey Terraced House", "2-storey Terrace House", "Bungalow"}


def category(ptype):
    return "House" if ptype in HOUSE_TYPES else "Apartment / Condominium"


def main():
    out_dir = os.path.join(os.path.dirname(__file__), "..", "src", "lib", "data")
    items = []
    seen = set()
    for lid, title, ptype, ltype, price, sqft, beds, baths, posted in ROWS:
        assert lid not in seen, f"duplicate id {lid}"
        seen.add(lid)
        items.append(
            {
                "id": lid,
                "title": title,
                "listingType": ltype,
                "price": price,
                "category": category(ptype),
                "propertyType": ptype,
                "size": sqft,
                "sizeUnit": "sq.ft.",
                "bedrooms": beds,
                "bathrooms": baths,
                "subarea": "",
                "region": "",
                "location": "",
                "advertiser": "eHartanah",
                "phone": "",
                "imageCount": 0,
                "postedAt": f"{posted} 00:00:00",
                "url": "",
                "featured": True,
            }
        )
    out = os.path.join(out_dir, "own-listings.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=1)
    rent = sum(1 for i in items if i["listingType"] == "rent")
    print(f"{len(items)} own listings ({rent} rent, {len(items) - rent} sale) -> {out}")


if __name__ == "__main__":
    main()
