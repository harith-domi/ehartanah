import json, re

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'-+', '-', text).strip('-')
    return text[:80]  # cap length

def make_slug(item):
    title = item.get('title', '') or ''
    subarea = item.get('subarea', '') or ''
    base = slugify(title + (' ' + subarea if subarea else ''))
    return base or str(item.get('id', ''))

for filename in ['sale-listings.json', 'rent-listings.json']:
    path = fr'C:\Users\maxco\Downloads\Domi code\ehartanah\src\lib\data\{filename}'
    with open(path, encoding='utf-8') as f:
        data = json.load(f)

    seen = {}
    for item in data:
        base = make_slug(item)
        if base in seen:
            seen[base] += 1
            item['id'] = f'{base}-{seen[base]}'
        else:
            seen[base] = 1
            item['id'] = base

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f'{filename}: {len(data)} listings updated')
    print('  Sample:', data[0]['id'])
    print('  Sample:', data[1]['id'])
    print('  Sample:', data[2]['id'])
