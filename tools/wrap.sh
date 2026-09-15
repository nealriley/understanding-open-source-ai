#!/bin/sh
# Usage: tools/wrap.sh <chapter-id> "<Title>" "<Kicker>" < body.html > chapters/NN-file.html
ID="$1"; TITLE="$2"; KICKER="$3"
cat <<HEAD
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${TITLE} · Open Models</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23b0492c'/><text x='50' y='68' font-size='58' text-anchor='middle' fill='white' font-family='Georgia'>O</text></svg>">
<link rel="stylesheet" href="../css/style.css">
</head>
<body data-depth="1" data-chapter="${ID}">
<a class="skip" href="#main">Skip to content</a>
<div class="site">
  <nav class="sidebar" id="sidebar" aria-label="Table of contents"></nav>
  <div class="scrim" id="scrim"></div>
  <div class="main">
    <div class="topbar"><a class="brand" href="../index.html"><span class="mark">O</span>Open Models</a><button class="btn" id="menu-btn">☰ Contents</button></div>
    <main id="main"><article class="content">
      <div class="chapter-kicker">${KICKER}</div>
      <h1>${TITLE}</h1>
      <div class="chapter-meta" id="chapter-meta"></div>
HEAD
cat
cat <<FOOT
      <div class="complete-row" id="complete-row"></div>
      <nav class="chapter-nav" id="chapter-nav" aria-label="Chapter navigation"></nav>
    </article></main>
    <footer class="footer">Open Models: A Field Guide · Sources are linked inline and collected in the <a href="../reading-list.html">reading list</a>.</footer>
  </div>
</div>
<script src="../js/data.js"></script>
<script src="../js/app.js"></script>
</body>
</html>
FOOT
