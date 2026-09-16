#!/usr/bin/env python3
"""Render active study paths and bibliography from the authoring maps; no runtime build."""
import json,re,sys
from html import escape as e
from render_data import ROOT,records

def outputs():
    model=json.loads((ROOT/'docs/learning-design/curriculum-map.json').read_text())
    register=json.loads((ROOT/'docs/learning-design/claim-register.json').read_text())
    used={sid for c in register['claims'] if c['affected_locations'] and c['status'] in ('supported','attributed') for sid in c['source_ids']}
    sources='<h1>Annotated reading list</h1><p id="opening-sources">Sources supporting the available chapters. Reviewed 16 September 2026. Each annotation states the passage inspected, not independent replication. Required explanations and practice are contained in the book; technical reading is optional.</p>'
    sources+=''.join('<section class="rl-item" id="source-'+s['id']+'"><h2><a href="'+e(s['url'],quote=True)+'">'+e(s['title'])+'</a></h2><p>'+e(s['passage'])+'</p><p class="small">'+e(s['kind'])+' · '+e(s['publication_date'] or 'Publication date not established')+' · reviewed '+s['reviewed_on']+'</p></section>' for s in register['sources'] if s['id'] in used)
    sections=list(dict.fromkeys(c['part'] for c in records('chapters')))
    guide='<h1>Study guide</h1><p>This developing draft contains '+str(len(model['units']))+' chapters in '+str(len(sections))+' sections. No programming experience is required. Read in order and attempt each application before opening its feedback. Later economic, historical and governance sections remain in development; the full-book final memo is not yet part of the draft.</p><h2>Choose a path</h2><ul><li><b>New to models:</b> start with the two foundations chapters, then follow the data, adaptation and evaluation section.</li><li><b>Already familiar:</b> use the foundations’ applications to check that you can distinguish context from training and assess a release’s materials and permissions. Then begin with data; use prerequisite links when needed.</li><li><b>Review a decision:</b> revisit your record inventory, controlled experiment and evaluation note together. Check whether they describe the same task and conditions.</li></ul><p>Reading-completion marks and quiz scores stay in your browser. A correct quiz does not establish mastery of a chapter’s written task. Optional disclosures add depth; core tasks need no coding, external documents or JavaScript.</p>'
    for u in model['units']:
        guide+='<section id="unit-'+u['id']+'"><h2>'+str(u['chapter'])+'. '+e(u['title'])+'</h2><ul>'+''.join('<li>'+e(o)+'</li>' for o in u['outcomes'])+'</ul><p><b>Make:</b> '+e(u['activity'])+'</p><p><b>Review:</b> '+e(u['criteria'])+'</p><p><a href="'+u['source_path']+'#practice">Application and feedback</a></p></section>'
    guide+='<h2>Review the section as a whole</h2><p>Can another reader trace your recommendation back through the scoring rule, comparison conditions and source records? Correct the earliest weak link, then revise the conclusion. An explicit reason to defer can be as sound as a bounded proposal to proceed. The new evaluation chapter includes two defensible responses and a review rubric.</p><h2>What comes later</h2><p>The provisional roadmap moves to operating models and economics, then history and competition, then risk, governance and synthesis. Each section will contain at most three chapters, and the order may change as its prerequisites become clearer. These are planned areas, not links to unwritten lessons.</p>'
    result={}
    for name,body in [('study-guide.html',guide),('reading-list.html',sources)]:
        p=ROOT/name;s=p.read_text()
        result[p]=re.sub(r'(<main id="main"><article class="content[^\"]*">)[\s\S]*?</article>',lambda m:m[1]+body+'</article>',s)
    return result

def main():
    for p,text in outputs().items():
        if '--check' in sys.argv:
            if p.read_text()!=text:raise SystemExit('Active study/reference page stale: '+str(p.relative_to(ROOT)))
        else:p.write_text(text)
    print('PASS: study guide and source annotations match active learning/evidence records')
if __name__=='__main__':main()
