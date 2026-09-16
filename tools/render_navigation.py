#!/usr/bin/env python3
"""Keep no-JavaScript navigation and cards aligned with the active manifest."""
import re,sys
from html import escape
from pathlib import Path
from render_data import ROOT,records

def outputs():
    chapters=records('chapters'); extras=records('extraPages'); result={}
    for path in ROOT.rglob('*.html'):
        if '.git' in path.parts: continue
        prefix='../' if path.parent.name=='chapters' else ''
        text=path.read_text()
        nav='<a class="brand" href="'+prefix+'index.html">Open Models</a><ul class="toc">'
        part=None
        for c in chapters:
            if c['part']!=part:
                part=c['part'];nav+='<li class="part">'+escape(part)+'</li>'
            nav+='<li><a href="'+prefix+c['file']+'">'+c['num']+'. '+escape(c['title'])+'</a></li>'
        nav+=''.join('<li><a href="'+prefix+x['file']+'">'+escape(x['title'])+'</a></li>' for x in extras)+'</ul>'
        text=re.sub(r'(<nav class="sidebar"[^>]*>)[\s\S]*?</nav>',lambda m:m[1]+nav+'</nav>',text)
        current=next((i for i,c in enumerate(chapters) if ROOT/c['file']==path),None)
        if current is not None:
            links=[]
            if current: links.append(('Previous',chapters[current-1]['file'],chapters[current-1]['title']))
            if current+1<len(chapters):links.append(('Next',chapters[current+1]['file'],chapters[current+1]['title']))
            else:links.append(('Continue','reading-list.html','Annotated reading list'))
            content=''.join('<a href="'+prefix+f+'">'+label+': '+escape(title)+'</a>' for label,f,title in links)
            text=re.sub(r'(<nav class="chapter-nav"[^>]*>)[\s\S]*?</nav>',lambda m:m[1]+content+'</nav>',text)
        if path.name=='index.html':
            cards=''.join('<a class="card" href="'+c['file']+'"><span class="num">'+escape(c['part'])+'</span><h3>'+c['num']+'. '+escape(c['title'])+'</h3><p>'+escape(c['blurb'])+'</p></a>' for c in chapters)
            text=re.sub(r'(<div class="card-grid" id="chapter-cards">)[\s\S]*?</div>',lambda m:m[1]+cards+'</div>',text)
        result[path]=text
    return result

def main():
    for p,text in outputs().items():
        if '--check' in sys.argv:
            if p.read_text()!=text:raise SystemExit('Static navigation is stale: '+str(p.relative_to(ROOT)))
        else:p.write_text(text)
    print('PASS: static navigation and cards match the active manifest')
if __name__=='__main__':main()
