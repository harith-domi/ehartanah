"""Convert Mudah Excel exports into JSON data files for the site."""
import json
import os
import re

import openpyxl

BASE = r"G:\.shortcut-targets-by-id\1cSdRVFzMixbXhC7zx7istZrn0uk3kTVc\Claude Project\Website\Ehartanahmalaysia"
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "lib", "data")

FILES = [
    ("Copy of Subsales Listing Private owner mudah_private_rent_20260520_203836.xlsx", "rent", "rent-listings.json"),
    ("Subsales Listing Private owner_mudah_private_sale_20260521_203812.xlsx", "sale", "sale-listings.json"),
]


def clean_size(val, unit):
    if val is None:
        return None, unit
    s = str(val).replace(",", "").strip()
    try:
        n = float(s)
    except ValueError:
        return None, unit
    return n, (unit or "sq.ft.")


def to_int(v):
    if v is None:
        return None
    s = re.sub(r"[^0-9]", "", str(v))
    return int(s) if s else None


def convert(path, listing_type, out):
    wb = openpyxl.load_workbook(path, read_only=True)
    ws = wb["Listings"]
    rows = ws.iter_rows(values_only=True)
    headers = [str(h) for h in next(rows)]
    idx = {h: i for i, h in enumerate(headers)}
    price_col = "Price (RM)" if "Price (RM)" in idx else "Sale Price (RM)"
    items = []
    seen = set()
    for r in rows:
        lid = r[idx["Listing ID"]]
        if lid is None or lid in seen:
            continue
        seen.add(lid)
        price = r[idx[price_col]]
        try:
            price = float(price) if price is not None else None
        except (TypeError, ValueError):
            price = None
        size, unit = clean_size(r[idx["Size"]], r[idx["Size Unit"]])
        posted = r[idx["Posted Date"]]
        items.append(
            {
                "id": str(lid),
                "title": (str(r[idx["Title"]]) or "").strip(),
                "listingType": listing_type,
                "price": price,
                "category": r[idx["Category"]] or "",
                "propertyType": r[idx["Property Type"]] or "",
                "size": size,
                "sizeUnit": str(unit) if unit else "sq.ft.",
                "bedrooms": to_int(r[idx["Bedrooms"]]),
                "bathrooms": to_int(r[idx["Bathrooms"]]),
                "subarea": r[idx["Subarea"]] or "",
                "region": r[idx["Region"]] or "",
                "location": r[idx["Location"]] or "",
                "advertiser": r[idx["Advertiser"]] or "",
                "phone": str(r[idx["Phone"]] or ""),
                "imageCount": r[idx["Image Count"]] or 0,
                "postedAt": str(posted) if posted else "",
                "url": r[idx["URL"]] or "",
            }
        )
    with open(out, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, separators=(",", ":"))
    print(listing_type, len(items), "listings ->", out, round(os.path.getsize(out) / 1048576, 2), "MB")


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    for fname, ltype, out in FILES:
        convert(os.path.join(BASE, fname), ltype, os.path.join(OUT_DIR, out))
