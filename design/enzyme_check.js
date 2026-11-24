// Checks the enzyme plot's support rule against Yash's own code (from-team/enzyme-bench/index.html), on identical well values.
// Run: serve the folder that holds game-ui/ and from-team/ on a local server, open game-ui/hypothesis-bench.html?farm, paste this into the console.
// Expected (2026-11-20): mismatches 0 (about 60,000 checks); one high well: 98% -> unsure (94.68% competitive), 99% -> comp (95.26%).
(async () => {
  const html = await fetch('/from-team/enzyme-bench/index.html').then(r => r.text());
  const cut = (a, b) => { const i = html.indexOf(a), j = html.indexOf(b, i); if (i < 0 || j < 0) throw new Error('missing ' + a); return html.slice(i, j); };
  // Yash's helpers, the enzyme pack, posterior(); the 95% rule is inline in Yash's commit handler, so it is restated here line for line
  const src = cut('function gauss()', 'function radios(') + '\nvar PACKS = {};\n' + cut('var ENZ_SIGMA', '/* ---- Pack 1') + '\n' + cut('function posterior(P, runs)', 'function bench()') +
    '\nreturn {P: PACKS.enz, posterior: posterior, licensed: function(post){ var best = "unsure"; PACKS.enz.hyps.forEach(function(hy){ if (post[hy[0]] >= 0.95) best = hy[0]; }); return best; }};';
  const V = new Function('inhibSketch', 'FIG_6_17', src)(null, '');
  const E = GAME.enzyme, KEY = E.key();
  let checks = 0; const bad = [];
  const eq = (a, b, w) => { checks++; if (JSON.stringify(a) !== JSON.stringify(b)) bad.push(w); };
  const close = (a, b, w) => { checks++; if (Math.abs(a - b) > 1e-12) bad.push(w); };
  ['low', 'high'].forEach(e => ['comp', 'non'].forEach(h => { eq(KEY[e].key[h], V.P.exps[e].key[h], 'key'); eq(KEY[e].mu[h], V.P.exps[e].mu[h], 'mean'); }));
  for (let t = 0; t < 20000; t++){   // random runs: 1-4 batches of 1, 2 or 4 wells, readings 0-160
    const runs = [], k = 1 + Math.floor(Math.random() * 4);
    for (let j = 0; j < k; j++){ const n = [1, 2, 4][Math.floor(Math.random() * 3)]; runs.push({exp: Math.random() < 0.8 ? 'high' : 'low', values: Array.from({length: n}, () => Math.floor(Math.random() * 161))}); }
    const a = E.posterior(runs), b = V.posterior(V.P, runs);
    close(a.comp, b.comp, 'support'); close(a.non, b.non, 'support'); eq(E.licensed(a), V.licensed(b), 'verdict');
  }
  const edge = [];
  for (let x = 0; x <= 160; x++){   // one high well, every reading
    const a = E.posterior([{exp: 'high', values: [x]}]), b = V.posterior(V.P, [{exp: 'high', values: [x]}]);
    eq(E.licensed(a), V.licensed(b), 'edge ' + x);
    if (x === 98 || x === 99) edge.push(x + '%: ' + (a.comp * 100).toFixed(2) + '% competitive -> ' + E.licensed(a));
  }
  console.log({checks, mismatches: bad.length, firstBad: bad.slice(0, 3), edge});
})();
