"""Stand-in white fill for the game's glyph icons (issue 56), until the game's own fill layer is exported.

The wiki's icons hold only each glyph's line layer. In the game a glyph also has a white fill under
those lines. This fills everything enclosed by the lines: a flood fill from the image border marks the
outside, and every pixel not reached (the lines and what they enclose) gets white underneath, with the
original lines composited on top unchanged. Nothing is drawn by hand. A hole meant to show the tile
colour through the glyph would come out white; when tools/export_frames.py output (tiles.json) is
committed, the site uses the game's composited tiles instead and ignores these files.

Usage: python3 tools/fill_icons.py   (reads content/reference/artwork.json, writes assets/wiki-artwork/filled/)
"""
import collections,json
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
art=json.load(open(ROOT/'content/reference/artwork.json'))
ids=sorted({v['icon_asset_id'] for g in ('buildings','resources') for v in art[g].values()})
out=ROOT/'assets/wiki-artwork/filled';out.mkdir(parents=True,exist_ok=True)
def fill(im,threshold=100):
    W,H=im.size;a=im.getchannel('A').load();outside=bytearray(W*H);q=collections.deque((x,y) for x in range(W) for y in (0,H-1))
    q.extend((x,y) for y in range(H) for x in (0,W-1))
    while q:
        x,y=q.popleft()
        if x<0 or y<0 or x>=W or y>=H or outside[y*W+x] or a[x,y]>threshold:continue
        outside[y*W+x]=1;q.extend(((x+1,y),(x-1,y),(x,y+1),(x,y-1)))
    base=Image.new('RGBA',(W,H),(0,0,0,0));px=base.load()
    for y in range(H):
        for x in range(W):
            if not outside[y*W+x]:px[x,y]=(255,255,255,255)
    base.alpha_composite(im);return base
done=[]
for i in ids:
    src=ROOT/f'assets/wiki-artwork/icon-{i}.png'
    if not src.exists():continue
    fill(Image.open(src).convert('RGBA')).save(out/f'icon-{i}.png',optimize=True);done.append(i)
(out/'manifest.json').write_text(json.dumps({'note':'White fill computed from each glyph line layer by tools/fill_icons.py; stand-in until the game fill layer is exported.','icons':done})+'\n')
print('filled',len(done),'icons')
