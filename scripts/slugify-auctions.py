import json, re

path = r'C:\Users\maxco\Downloads\Domi code\ehartanah\src\lib\data\auction-listings.json'
with open(path, encoding='utf-8') as f:
    data = json.load(f)

def clean(s):
    return re.sub(r'[^a-zA-Z0-9\s]', '', s or '').strip()

def extract_city(address):
    # Extract city from postcode pattern "NNNNN City, State"
    m = re.search(r'\d{5}\s+([^,]+)', address)
    return m.group(1).strip() if m else ''

def make_slug(item):
    address = item.get('address', '')
    prop_type = item.get('propertyType', '')
    region = item.get('region', '')

    # Strip "Unit No. XXXX, " prefix
    addr = re.sub(r'^Unit No\. [^,]+,\s*', '', address)
    # Strip floor/block/tingkat prefix
    addr = re.sub(r'^(Tingkat \d+|Block [A-Z\d]+|\d+\w* Floor|Tower [A-Z\d]+|Blok [A-Z\d]+),\s*', '', addr, flags=re.IGNORECASE)

    building = addr.split(',')[0].strip()

    # If building is a street number or jalan, use propertyType + city
    if re.match(r'^No\.?', building, re.IGNORECASE) or re.match(r'^Jalan', building, re.IGNORECASE) or not building:
        city = extract_city(address)
        building = prop_type + (' ' + city if city else ' ' + region)

    slug = clean(building).lower()
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug).strip('-')
    return slug

seen = {}
mapping = {}
for item in data:
    base = make_slug(item)
    if not base:
        base = item['id']
    if base in seen:
        seen[base] += 1
        slug = f'{base}-{seen[base]}'
    else:
        seen[base] = 1
        slug = base
    mapping[item['id']] = slug

# Apply
for item in data:
    old_id = item['id']
    item['id'] = mapping[old_id]

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Done. Sample:')
for old, new in list(mapping.items())[:10]:
    print(f'  {old} -> {new}')
