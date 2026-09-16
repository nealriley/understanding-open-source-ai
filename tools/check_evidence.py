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
                    if u['status']=='revised_opening' and mapping['preparation'].endswith('#learning-outcomes'):
                        errors.append(f'{u["id"]}: preparation points to an objective rather than instruction')
                    for section in mapping.get('preparation_sections',[]):
                        filename,anchor=section.split('#')
                        if filename not in pages or anchor not in pages[filename].ids: errors.append(f'{u["id"]}: broken additional preparation section')
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
    for example in records('teachingExamples'):
        if example['kind']!='fictional' or not example['provenance']: errors.append('Teaching example missing fictional provenance')
        date.fromisoformat(example['reviewed_on'])
        if example['id']=='next-token':
            values=[r['value'] for r in example['rows']]
            if any(v<0 or v>100 for v in values) or sum(values)!=100: errors.append('Next-token probabilities must sum to 100%')
            if '<!-- teaching:next-token -->' not in (ROOT/'chapters/00-primer.html').read_text(): errors.append('Missing static teaching table')
    for c in claims.values():
        if c['status'] in ('unresolved','retired'): continue
        if not c['affected_locations'] and not c.get('archived_locations'): errors.append(f'{c["id"]}: no affected locations')
        for location in c['affected_locations']:
            filename,_,anchor=location.partition('#')
            if not (ROOT/filename).is_file(): errors.append(f'{c["id"]}: missing affected file')
            elif filename in pages and anchor and anchor not in pages[filename].ids: errors.append(f'{c["id"]}: missing affected anchor')
    for c in claims.values():
        for location in c.get('archived_locations',[]):
            if not re.fullmatch(r'[0-9a-f]{40}',location.get('commit','')) or not location.get('location'):
                errors.append(f'{c["id"]}: invalid archived location')
        for location in c['affected_locations']:
            if location.split('#')[0] in records('retiredPages'):
                errors.append(f'{c["id"]}: active claim points to withdrawn content')
    from collections import Counter
    counts=Counter(c['part'] for c in manifest.values())
    if any(n>3 for n in counts.values()): errors.append('A section exceeds three chapters')
    ordered=list(manifest)
    if len({c['num'] for c in manifest.values()})!=len(manifest): errors.append('Duplicate display numbers')
    for u in model['units']:
        if any(ordered.index(dep)>=ordered.index(u['id']) for dep in u['prerequisites'] if dep in ordered):
            errors.append(f'{u["id"]}: prerequisite follows chapter')
    for name in records('retiredPages'):
        page=pages.get(name)
        if not page or page.chapter or page.quizzes: errors.append('Withdrawn page contains active learning content: '+name)
    from render_navigation import outputs
    if any(p.read_text()!=value for p,value in outputs().items()): errors.append('Static navigation differs from active manifest')
    # Compare committed fallback table with output of the shared-record renderer.
    import sys
    old=sys.argv;sys.argv=['render_data.py','--check']
    try: check_tables()
    except SystemExit as exc: errors.append(str(exc))
    finally: sys.argv=old
    return errors
