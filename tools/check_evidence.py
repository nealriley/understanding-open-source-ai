#!/usr/bin/env python3
"""Internal consistency, not automated fact checking. Called by check_learning.py."""
import json,re
from pathlib import Path
from datetime import date
from render_data import records,main as check_tables
ROOT=Path(__file__).resolve().parents[1]
def check(pages):
    errors=[]
    register=json.loads((ROOT/'docs/learning-design/claim-register.json').read_text())
    claims={c['id']:c for c in register['claims']}; sources={s['id']:s for s in register['sources']}
    if len(claims)!=len(register['claims']) or len(sources)!=len(register['sources']): errors.append('Duplicate evidence IDs')
    for s in sources.values():
        if not s['url'].startswith('https://') or not s['passage'].strip(): errors.append(f'{s["id"]}: source URL/passage missing')
        date.fromisoformat(s['reviewed_on'])
        if s['publication_date']: date.fromisoformat(s['publication_date'])
    for c in claims.values():
        if c['status'] not in ('supported','attributed','unresolved','retired'): errors.append('Unknown claim status')
        if c['status'] in ('supported','attributed') and not c['source_ids']: errors.append(f'{c["id"]}: missing support')
        for sid in c['source_ids']:
            if sid not in sources: errors.append(f'{c["id"]}: unknown source {sid}')
        if not c['decision'].strip(): errors.append(f'{c["id"]}: missing editorial decision')
    for name,page in pages.items():
        text=(ROOT/name).read_text()
        for cid in re.findall(r'data-claim="([^"]+)"',text):
            if cid not in claims or claims[cid]['status'] in ('unresolved','retired'): errors.append(f'{name}: invalid or unresolved rendered claim {cid}')
        for quiz in page.quizzes:
            for question in quiz:
                for cid in question.get('claim_ids',[]):
                    if cid not in claims or claims[cid]['status']!='supported': errors.append(f'{name}: unsupported quiz key {cid}')
    manifest={c['id']:c for c in records('chapters')}
    model=json.loads((ROOT/'docs/learning-design/curriculum-map.json').read_text())
    outcome_ids=set()
    for u in model['units']:
        c=manifest[u['id']]; page=pages[u['source_path']]
        if page.quiz_ids!=[c.get('quizId',c['id'])]: errors.append(f'{u["id"]}: manifest/quiz version mismatch')
        if u['status'].startswith('revised'):
            if u.get('quiz_id')!=c.get('quizId'): errors.append(f'{u["id"]}: learning/quiz version mismatch')
            for field in ('preparation_anchor','task_anchor','feedback_anchor'):
                if u.get(field) not in page.ids: errors.append(f'{u["id"]}: missing {field}')
            if not u.get('outcomes'): errors.append(f'{u["id"]}: no outcomes')
            if 'learning_mappings' in u:
                if len(u['learning_mappings'])!=len(u['outcomes']): errors.append(f'{u["id"]}: incomplete outcome mappings')
                for mapping in u['learning_mappings']:
                    if mapping['outcome_id'] in outcome_ids: errors.append('Duplicate mapped outcome ID')
                    outcome_ids.add(mapping['outcome_id'])
                    for field in ('preparation','task','feedback'):
                        filename,anchor=mapping[field].split('#')
                        if filename not in pages or anchor not in pages[filename].ids: errors.append(f'{u["id"]}: broken {field} mapping')
                valid={x['outcome_id'] for x in u['learning_mappings']}
                for quiz in page.quizzes:
                    for question in quiz:
                        if not question.get('outcome_ids') or not set(question['outcome_ids'])<=valid: errors.append(f'{u["id"]}: quiz outcome mapping invalid')
    for c in records('charts'):
        if c['kind'] not in ('fictional','reported') or not c['provenance'] or not c['transformation'] or not c['unit']: errors.append('Chart provenance incomplete')
        date.fromisoformat(c['reviewed_on'])
        if c['kind']=='reported' and (not c.get('source_ids') or any(x not in sources for x in c['source_ids'])): errors.append('Reported chart missing sources')
        if c['id']=='task-scores':
            for row in c['rows']:
                if not (row['total']>0 and 0<=row['manuals']<=row['total'] and 0<=row['arithmetic']<=row['total']): errors.append('Invalid task counts')
        elif c['id']=='threshold-delay':
            if any(r['meadow']<r['harbor'] for r in c['rows']): errors.append('Invalid threshold chronology')
    for event in records('timeline'):
        cid=event.get('claim_id')
        if cid not in claims or claims[cid]['status'] in ('unresolved','retired'): errors.append('Timeline has unsupported claim reference')
        if not event.get('source','').startswith('https://') or not event.get('reviewed_on'): errors.append('Timeline provenance incomplete')
    for c in claims.values():
        if c['status'] in ('unresolved','retired'): continue
        if not c['affected_locations']: errors.append(f'{c["id"]}: no affected locations')
        for location in c['affected_locations']:
            filename,_,anchor=location.partition('#')
            if not (ROOT/filename).is_file(): errors.append(f'{c["id"]}: missing affected file')
            elif filename in pages and anchor and anchor not in pages[filename].ids: errors.append(f'{c["id"]}: missing affected anchor')
    # Compare committed fallback table with output of the shared-record renderer.
    import sys
    old=sys.argv;sys.argv=['render_data.py','--check']
    try: check_tables()
    except SystemExit as exc: errors.append(str(exc))
    finally: sys.argv=old
    return errors
