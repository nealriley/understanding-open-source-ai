#!/usr/bin/env python3
"""Check local textbook structure and learning-map integrity; standard library only.

This does not fetch external URLs or verify subject claims or learning outcomes.
"""
import json
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.quiz_ids = []
        self.quizzes = []
        self.chapter = None
        self.quiz = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'body':
            self.chapter = attrs.get('data-chapter')
        if tag in ('a', 'link') and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag in ('script', 'img') and 'src' in attrs:
            self.links.append(attrs['src'])
        if tag == 'script' and 'data-quiz' in attrs:
            self.quiz_ids.append(attrs['data-quiz'])
            self.quiz = ''

    def handle_data(self, data):
        if self.quiz is not None:
            self.quiz += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.quiz is not None:
            self.quizzes.append(json.loads(self.quiz))
            self.quiz = None


def main():
    pages = {p.relative_to(ROOT).as_posix(): Page(p.read_text())
             for p in ROOT.rglob('*.html') if '.git' not in p.parts}
    errors = []
    quiz_ids = []
    question_count = 0
    data = (ROOT / 'js/data.js').read_text()
    glossary = data.split('OMT.glossary = {', 1)[1].split('\n};', 1)[0]
    dynamic_glossary_ids = set(re.findall(r'^\s*"([^"]+)":', glossary, re.M))
    for name, page in pages.items():
        if len(page.ids) != len(set(page.ids)):
            errors.append(f'{name}: duplicate HTML id')
        quiz_ids.extend(page.quiz_ids)
        for quiz in page.quizzes:
            if not isinstance(quiz, list) or not quiz:
                errors.append(f'{name}: empty or invalid quiz')
                continue
            for q in quiz:
                question_count += 1
                if not (isinstance(q.get('q'), str) and q['q'].strip()
                        and isinstance(q.get('a'), list) and len(q['a']) >= 2
                        and all(isinstance(a, str) and a.strip() for a in q['a'])
                        and type(q.get('c')) is int and 0 <= q['c'] < len(q['a'])
                        and isinstance(q.get('x'), str) and q['x'].strip()):
                    errors.append(f'{name}: invalid question or missing feedback')
        for link in page.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            target = (ROOT / name).parent / unquote(url.path) if url.path else ROOT / name
            target = target.resolve()
            if not target.is_relative_to(ROOT) or not target.is_file():
                errors.append(f'{name}: missing local target {link}')
                continue
            target_name = target.relative_to(ROOT).as_posix()
            if url.fragment and target_name in pages:
                ids = set(pages[target_name].ids)
                if target_name == 'glossary.html':
                    ids |= dynamic_glossary_ids
                if unquote(url.fragment) not in ids:
                    errors.append(f'{name}: missing anchor {link}')
    if len(quiz_ids) != len(set(quiz_ids)):
        errors.append('Duplicate quiz storage IDs')
    model = json.loads((ROOT / 'docs/learning-design/curriculum-map.json').read_text())
    units = {u['id']: u for u in model['units']}
    if len(units) != len(model['units']):
        errors.append('Duplicate curriculum unit IDs')
    chapters = {p.chapter for p in pages.values() if p.chapter}
    if set(units) != chapters:
        errors.append('Curriculum units do not match chapter IDs')
    for field in ('outcome_id', 'activity_id', 'output_anchor'):
        values = [u[field] for u in units.values()]
        if len(set(values)) != len(values):
            errors.append(f'Duplicate {field}')
    for uid, unit in units.items():
        source = pages.get(unit['source_path'])
        output = pages.get(unit['output_path'])
        if not source or source.chapter != uid:
            errors.append(f'{uid}: source chapter mismatch')
        if not output or unit['output_anchor'] not in output.ids:
            errors.append(f'{uid}: output anchor missing')
        for field in ('outcome', 'activity', 'criteria'):
            if not unit[field].strip():
                errors.append(f'{uid}: missing {field}')
        for dep in unit['prerequisites']:
            if dep not in units:
                errors.append(f'{uid}: unknown prerequisite {dep}')
    visiting, visited = set(), set()

    def visit(uid):
        if uid in visiting:
            errors.append(f'Prerequisite cycle at {uid}')
            return
        if uid in visited or uid not in units:
            return
        visiting.add(uid)
        for dep in units[uid]['prerequisites']:
            visit(dep)
        visiting.remove(uid)
        visited.add(uid)

    for uid in units:
        visit(uid)
    from check_evidence import check
    errors.extend(check(pages))
    if errors:
        print('\n'.join(errors), file=sys.stderr)
        return 1
    print(f'PASS: {len(pages)} HTML pages, {len(units)} curriculum units, '
          f'{question_count} quiz questions; local targets, anchors, IDs, '
          'quiz feedback and prerequisite graph checked.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
