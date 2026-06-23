import json, re

path = r'C:\Users\maxco\Downloads\Domi code\ehartanah\src\lib\data\own-listings.json'
with open(path, encoding='utf-8') as f:
    data = json.load(f)

def clean(s):
    return re.sub(r'[^a-zA-Z0-9\s]', '', s or '').strip()

def make_slug(item):
    loc = item.get('location', '')
    subarea = item.get('subarea', '')
    prop_type = item.get('propertyType', '')

    # Strip unit/floor/block/tingkat prefix
    loc = re.sub(r'^(Tingkat \d+|Block [A-Z\d]+|\d+\w* Floor|Tower [A-Z\d]+|Blok [A-Z\d]+),\s*', '', loc, flags=re.IGNORECASE)

    building = loc.split(',')[0].strip()

    # If building starts with "No." or is just a street, use propertyType + subarea
    if re.match(r'^No\.?', building, re.IGNORECASE) or re.match(r'^Jalan', building, re.IGNORECASE):
        building = prop_type

    # If building is blank (auction-083)
    if not building:
        building = prop_type

    part1 = clean(building)
    part2 = clean(subarea)

    slug = (part1 + ' ' + part2).lower().strip()
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug).strip('-')
    return slug

seen = {}
mapping = {}
for item in data:
    if re.match(r'eh-auction-0[5-9]\d', item.get('id', '')):
        base = make_slug(item)
        if base in seen:
            seen[base] += 1
            slug = f'{base}-{seen[base]}'
        else:
            seen[base] = 1
            slug = base
        mapping[item['id']] = slug
        print(f"{item['id']} -> {slug}")

# Apply mapping
for item in data:
    if item['id'] in mapping:
        item['id'] = mapping[item['id']]

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('\nDone — IDs updated in own-listings.json')
