// Checks the toaster plot's rules against Yash's own engine (from-team/toaster-bench/index.html).
// Run: serve the folder that holds game-ui/ and from-team/ on a local server, open game-ui/hypothesis-bench.html?farm, paste this into the console.
// Expected (2026-11-19): {sequences: 84, checks: 5268, mismatches: 0, oneTestSettlesAll: [], settle: outlet 2, toaster 1, power 2}.
(async () => {
  const html = await fetch('/from-team/toaster-bench/index.html').then(r => r.text());
  const HB = new Function(html.match(/<script id="hb-engine">([\s\S]*?)<\/script>/)[1] + '\n;return HB;')();
  const P = HB.PACKS.toaster, K = GAME.toaster, KEY = K.key();
  const H = ['outlet', 'toaster', 'power'], T = ['same', 'coffee', 'lights', 'other'];
  let checks = 0; const bad = [], kinds = {};
  const eq = (a, b, what) => { checks++; if (JSON.stringify(a) !== JSON.stringify(b)) bad.push(what); };
  T.forEach(e => H.forEach(h => eq(KEY[e].key[h], P.exps[e].key[h], 'key ' + e + '/' + h)));   // the answer key, cell by cell
  const seqs = []; (function gen(s){ if (s.length) seqs.push(s.slice()); if (s.length < 3) T.forEach(e => { s.push(e); gen(s); s.pop(); }); })([]);
  H.forEach(truth => seqs.forEach(seq => {   // every hidden fault × every sequence of 1-3 tests × every marking
    const runs = [];
    seq.forEach(e => { T.forEach(x => eq(K.flagged(x, runs), HB.isFlagged(P, x, runs), 'flag')); runs.push({exp: e, result: P.exps[e].key[truth]}); });
    eq(K.inPlay(runs), HB.inPlay(P, runs), 'inPlay'); eq(K.ruledOutBy(runs), HB.ruledOutBy(P, runs), 'ruledOutBy');
    for (let mask = 0; mask < 8; mask++){
      const status = {}; H.forEach((h, i) => status[h] = (mask >> i) & 1 ? 'possible' : 'out');
      const poss = H.filter(h => status[h] === 'possible'), concl = poss.length === 1 ? poss[0] : 'unsure';   // our conclusion comes from the marks
      const a = K.grade(runs, status), b = HB.gradeVerdict(P, runs, {status, conclusion: concl});
      eq([a.kind, a.perHyp, a.conclusion, a.inPlay], [b.kind, b.perHyp, b.conclusion, b.inPlay], 'grade');
      kinds[a.kind] = (kinds[a.kind] || 0) + 1;
    }
  }));
  const settle = H.map(t => { const r = [{exp: 'coffee', result: P.exps.coffee.key[t]}]; if (K.inPlay(r).length > 1) r.push({exp: 'lights', result: P.exps.lights.key[t]}); return t + ' ' + r.length; });
  const oneTestSettlesAll = T.filter(e => H.every(t => K.inPlay([{exp: e, result: P.exps[e].key[t]}]).length === 1));
  console.log({sequences: seqs.length, checks, mismatches: bad.length, firstBad: bad.slice(0, 5), kinds, settle, oneTestSettlesAll});
})();
