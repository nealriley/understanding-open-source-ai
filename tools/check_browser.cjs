/* Optional browser regression checks: NODE_PATH must provide playwright. No app build. */
const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req,res) => {
  const filename = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  const file = fs.existsSync(filename) && fs.statSync(filename).isDirectory() ? path.join(filename,'index.html') : filename;
  if (!file.startsWith(root+path.sep) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.setHeader('Content-Type', ({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(file)] || 'text/plain');
  res.end(fs.readFileSync(file));
});
(async () => {
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({headless:true,...(process.env.BOOK_BROWSER_PATH ? {executablePath:process.env.BOOK_BROWSER_PATH} : {})});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:1000}});
    const page = await context.newPage(); const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base); const chapters=await page.evaluate(()=>OMT.chapters);
    // Simulate an earlier edition's scores; completion must survive.
    await page.evaluate(()=>localStorage.setItem('omt-progress',JSON.stringify({primer:true,openness:true,'quiz-primer':'4/4','quiz-primer-v2':'3/3','quiz-openness-v2':'4/4'})));
    await page.reload();
    assert.match(await page.locator('#chapter-cards a').first().innerText(),/done/);
    assert.doesNotMatch(await page.locator('#chapter-cards a').first().innerText(),/quiz/);
    assert.match(await page.locator('#chapter-cards a').nth(1).innerText(),/done/);
    assert.doesNotMatch(await page.locator('#chapter-cards a').nth(1).innerText(),/quiz/);
    await page.getByRole('searchbox',{name:'Search',exact:true}).fill('distillation');
    assert(await page.locator('#search-results a').count()>0);
    await page.locator('#search-results a').first().click();
    assert(new URL(page.url()).pathname.endsWith('.html'));
    // Every chapter renders a quiz, application and feedback; answer all correctly.
    for (const c of chapters) {
      await page.goto(base+'/'+c.file);
      assert(await page.locator('#practice').count());
      await page.locator('#practice-feedback summary').click();
      assert(await page.locator('#practice-feedback').evaluate(e=>e.open));
      const html=fs.readFileSync(path.join(root,c.file),'utf8');
      const questions=JSON.parse(html.match(/<script type="application\/json" data-quiz="[^"]+">([\s\S]*?)<\/script>/)[1]);
      assert.equal(await page.locator('.quiz .q').count(),questions.length);
      for (let i=0;i<questions.length;i++) await page.locator('.quiz .q').nth(i).locator('input').nth(questions[i].c).check();
      assert.match(await page.locator('.score').innerText(),new RegExp(`${questions.length} / ${questions.length}`));
      assert.equal(await page.evaluate(id=>JSON.parse(localStorage.getItem('omt-progress'))['quiz-'+id],c.quizId),`${questions.length}/${questions.length}`);
      assert(await page.locator('.chapter-nav a').count());
    }
    await page.goto(base+'/chapters/06-measuring-the-gap.html');
    await page.locator('#manual-weight').focus();
    await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');
    assert.match(await page.locator('#gap-widget .note').innerText(),/Alder 72.0%; Birch 64.0%/);
    assert.match(await page.locator('#gap-widget table').innerText(),/72/);
    const wrong=page.locator('.quiz .q').first();await wrong.locator('input').first().check();
    assert.equal(await wrong.locator('.wrong').count(),1);
    assert(await wrong.locator('.explain').isVisible());
    assert.equal(await page.evaluate(()=>document.activeElement.className),'explain');
    await page.locator('#complete-btn').click();
    await page.reload();assert.match(await page.locator('#complete-row').innerText(),/marked this chapter complete/);
    const primerQuestions=JSON.parse(fs.readFileSync(path.join(root,chapters[0].file),'utf8').match(/<script type="application\/json" data-quiz="[^"]+">([\s\S]*?)<\/script>/)[1]);
    await page.goto(base);assert.match(await page.locator('#chapter-cards a').first().innerText(),new RegExp(`quiz ${primerQuestions.length}/${primerQuestions.length}`));
    await page.getByRole('button',{name:'◐ Theme'}).click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    await page.goto(base+'/chapters/06-measuring-the-gap.html');
    await page.locator('#gap-widget').screenshot({path:'/tmp/book-desktop-dark.png'});
    await page.getByRole('button',{name:'◐ Theme'}).click();
    await page.locator('#gap-widget').screenshot({path:'/tmp/book-desktop-light.png'});
    await page.goto(base+'/timeline.html');const before=await page.locator('.tl-item:not(.hidden)').count();
    await page.getByRole('button',{name:'Models',exact:true}).click();assert(await page.locator('.tl-item:not(.hidden)').count()<before);
    await page.goto(base+'/glossary.html#distillation');assert(await page.locator('#distillation').isVisible());
    // Opening explanations and worked documents remain readable in both themes.
    for (const c of chapters.slice(0,2)) {
      await page.goto(base+'/'+c.file);
      await page.locator('.concept-figure').first().screenshot({path:`/tmp/opening-${c.id}-desktop-light.png`});
      await page.getByRole('button',{name:'◐ Theme'}).click();
      await page.locator('.concept-figure').first().screenshot({path:`/tmp/opening-${c.id}-desktop-dark.png`});
      await page.getByRole('button',{name:'◐ Theme'}).click();
      const q=page.locator('.quiz .q').first();
      const quiz=JSON.parse(fs.readFileSync(path.join(root,c.file),'utf8').match(/<script type="application\/json" data-quiz="[^"]+">([\s\S]*?)<\/script>/)[1]);
      await q.locator('input').nth((quiz[0].c+1)%quiz[0].a.length).check();
      assert.equal(await q.locator('.wrong').count(),1);
      assert(await q.locator('.explain').isVisible());
      assert(await q.locator('input').first().isDisabled());
    }
    // Mobile overflow, keyboard menu and disclosure.
    await page.setViewportSize({width:390,height:844});
    for (const file of [...chapters.map(c=>c.file),'index.html','study-guide.html','timeline.html','glossary.html','reading-list.html']) {
      await page.goto(base+'/'+file);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`mobile overflow: ${file}`);
    }
    for (const c of chapters.slice(0,2)) {
      await page.goto(base+'/'+c.file);
      await page.locator('.concept-figure').first().screenshot({path:`/tmp/opening-${c.id}-mobile.png`});
      await page.locator('#practice-feedback summary').focus();await page.keyboard.press('Enter');
      assert(await page.locator('#practice-feedback').evaluate(e=>e.open));
    }
    await page.goto(base+'/chapters/06-measuring-the-gap.html');
    await page.locator('#menu-btn').focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('#menu-btn').getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');assert.equal(await page.locator('#menu-btn').getAttribute('aria-expanded'),'false');
    await page.locator('#practice-feedback summary').focus();await page.keyboard.press('Enter');assert(await page.locator('#practice-feedback').evaluate(e=>e.open));
    await page.locator('#gap-widget .table-scroll').focus();await page.keyboard.press('ArrowRight');
    await page.waitForFunction(()=>document.querySelector('#gap-widget .table-scroll').scrollLeft>0);
    await page.locator('#gap-widget').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/book-mobile.png'});
    // A separate context disables JavaScript entirely.
    const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const nojs=await plain.newPage();
    for (const file of [...chapters.map(c=>c.file),'index.html','study-guide.html','timeline.html','glossary.html','reading-list.html']) {
      await nojs.goto(base+'/'+file);assert((await nojs.locator('main').innerText()).length>500,`empty core: ${file}`);
      assert(await nojs.locator('#sidebar a').count()>=10,`missing static nav: ${file}`);
      assert(await nojs.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`no-JS overflow: ${file}`);
    }
    await nojs.goto(base+'/chapters/06-measuring-the-gap.html');assert.equal(await nojs.locator('#gap-widget table tbody tr').count(),2);
    await nojs.locator('#practice-feedback summary').click();assert(await nojs.locator('#practice-feedback').evaluate(e=>e.open));
    assert.deepEqual(errors,[]);
    console.log('PASS: 10 chapter quizzes; correct/incorrect feedback; persisted versioned scores and reading records; search/navigation; keyboard disclosures, slider and mobile menu; light/dark; 15 mobile and no-JavaScript pages; tables; no page errors.');
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
