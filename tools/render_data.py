#!/usr/bin/env python3
"""Generate committed, no-JavaScript chart tables from js/data.js. --check is read-only."""
import json,re,sys
from html import escape
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def records(name):
    text=(ROOT/'js/data.js').read_text()
    match=re.search(r'OMT\.'+name+r' = ([\s\S]*?);(?:\n|$)',text)
    return json.loads(match[1])
def chart_table(c):
    if c['id']=='task-scores':
        heads=['Fictional system','Manual correct / total','Arithmetic correct / total','Equal mean (%)','80% manual mean (%)']
        rows=[[r['label'],f"{r['manuals']} / {r['total']}",f"{r['arithmetic']} / {r['total']}",f"{50*(r['manuals']+r['arithmetic'])/r['total']:g}",f"{100*(.8*r['manuals']+.2*r['arithmetic'])/r['total']:g}"] for r in c['rows']]
    else:
        heads=['Fictional task','Threshold (%)','Harbor first month','Meadow first month','Delay (months)']
        rows=[[r['label'],r['threshold'],r['harbor'],r['meadow'],r['meadow']-r['harbor']] for r in c['rows']]
    return '<div class="table-scroll"><table><caption>'+escape(c['title'])+'</caption><thead><tr>'+''.join('<th scope="col">'+h+'</th>' for h in heads)+'</tr></thead><tbody>'+''.join('<tr><th scope="row">'+escape(str(r[0]))+'</th>'+''.join('<td>'+escape(str(v))+'</td>' for v in r[1:])+'</tr>' for r in rows)+'</tbody></table></div><p class="small">'+escape(c['provenance'])+' Reviewed '+c['reviewed_on']+'. Calculation: '+escape(c['transformation'])+'.</p>'
def main():
    path=ROOT/'chapters/06-measuring-the-gap.html'; text=path.read_text(); new=text
    for c in records('charts'):
        start=f'<!-- data:{c["id"]} -->'; end=f'<!-- /data:{c["id"]} -->'
        replacement=start+chart_table(c)+end
        if start in new: new=re.sub(re.escape(start)+r'[\s\S]*?'+re.escape(end),lambda _:replacement,new)
        else:
            pattern=r'(<div class="widget" id="'+('gap-widget' if c['id']=='task-scores' else 'catchup-widget')+r'"[\s\S]*?<div class="data-table">)</div>'
            new=re.sub(pattern,lambda m:m[1]+replacement+'</div>',new)
    if '--check' in sys.argv:
        if new!=text: raise SystemExit('Chart tables are stale: run python3 tools/render_data.py')
        print('PASS: chart tables match shared records')
    else: path.write_text(new)
if __name__=='__main__': main()
