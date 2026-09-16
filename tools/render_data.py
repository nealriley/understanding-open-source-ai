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
    return '<div class="table-scroll" role="region" aria-label="Scrollable data table" tabindex="0"><table><caption>'+escape(c['title'])+'</caption><thead><tr>'+''.join('<th scope="col">'+h+'</th>' for h in heads)+'</tr></thead><tbody>'+''.join('<tr><th scope="row">'+escape(str(r[0]))+'</th>'+''.join('<td>'+escape(str(v))+'</td>' for v in r[1:])+'</tr>' for r in rows)+'</tbody></table></div><p class="small">'+escape(c['provenance'])+' Reviewed '+c['reviewed_on']+'. Calculation: '+escape(c['transformation'])+'.</p>'
def main():
    outputs={}
    active={c['file'] for c in records('chapters')}
    for c in records('charts'):
        if c.get('target') not in active: raise SystemExit('Chart target is not an active chapter')
        path=ROOT/c['target']; new=outputs.get(path,path.read_text())
        start=f'<!-- data:{c["id"]} -->'; end=f'<!-- /data:{c["id"]} -->'
        if start not in new or end not in new: raise SystemExit('Missing chart table markers')
        outputs[path]=re.sub(re.escape(start)+r'[\s\S]*?'+re.escape(end),lambda _:start+chart_table(c)+end,new)
    primer=ROOT/'chapters/00-primer.html'
    example=next(e for e in records('teachingExamples') if e['id']=='next-token')
    start='<!-- teaching:next-token -->';end='<!-- /teaching:next-token -->'
    table='<div class="table-scroll" role="region" aria-label="Fictional next-token probabilities" tabindex="0"><table><caption>One fictional prediction after “'+escape(example['context'])+'”</caption><thead><tr><th scope="col">Possible next token</th><th scope="col">Probability</th></tr></thead><tbody>'+''.join('<tr><th scope="row">'+escape(r['label'])+'</th><td>'+str(r['value'])+'%</td></tr>' for r in example['rows'])+'</tbody></table></div>'
    outputs[primer]=re.sub(re.escape(start)+r'[\s\S]*?'+re.escape(end),lambda _:start+table+end,primer.read_text())
    def replace(file, start, end, content):
        page=ROOT/file; original=page.read_text(); a=original.index(start)+len(start);b=original.index(end,a)
        outputs[page]=original[:a]+content+original[b:]
    glossary=''.join('<dt id="'+k+'">'+escape(v[0])+'</dt><dd>'+escape(v[1])+'</dd>' for k,v in sorted(records('glossary').items(),key=lambda kv:kv[1][0]))
    replace('glossary.html','<dl class="glossary" id="glossary-list">','</dl>',glossary)
    timeline=''.join('<div class="tl-item cat-'+e['cat']+'" data-claim="'+e['claim_id']+'"><span class="date">'+e['d']+'</span><b>'+escape(e['t'])+'</b><p>'+escape(e['p'])+' <a href="'+e['source']+'">Source</a> · reviewed '+e['reviewed_on']+'</p></div>' for e in records('timeline'))
    if records('timeline'): replace('timeline.html','<div class="timeline" id="timeline">','</div>\n    </article>',timeline)
    if '--check' in sys.argv:
        if any(p.read_text()!=value for p,value in outputs.items()): raise SystemExit('Static data views are stale: run python3 tools/render_data.py')
        print('PASS: chart tables, glossary and timeline match shared records')
    else:
        for page,value in outputs.items(): page.write_text(value)
if __name__=='__main__': main()
