"""Enzyme plot: how many high-substrate wells it takes to reach Yash's 95% support rule.

Model copied from from-team/enzyme-bench/index.html (PACKS.enz):
a well reads max(0, round(mu + 20 * gauss)) % of the no-drug rate;
high substrate: mu = 99 (competitive) or 50 (noncompetitive); low substrate: 60 or 50.
Support = Gaussian likelihood (SD 20) from a 50:50 start. A verdict is supported at >= 95%.
Run: python3 enzyme_numbers.py
"""
import math, random

SD = 20
MU = {'high': {'comp': 99, 'non': 50}, 'low': {'comp': 60, 'non': 50}}


def support(level, values):
    ll = {h: sum(-(x - MU[level][h]) ** 2 / (2 * SD * SD) for x in values) for h in ('comp', 'non')}
    m = max(ll.values())
    z = sum(math.exp(v - m) for v in ll.values())
    return {h: math.exp(v - m) / z for h, v in ll.items()}


def well(mu, rng):
    return max(0, round(mu + SD * rng.gauss(0, 1)))


rng = random.Random(1)
N = 100_000
print('wells  truth  P(true idea >= 95%)  P(wrong idea >= 95%)')
for level, sizes in (('high', (1, 2, 4, 8)), ('low', (8,))):
    for n in sizes:
        for truth in ('comp', 'non'):
            other = 'non' if truth == 'comp' else 'comp'
            ok = bad = 0
            for _ in range(N):
                s = support(level, [well(MU[level][truth], rng) for _ in range(n)])
                ok += s[truth] >= 0.95
                bad += s[other] >= 0.95
            print(f'{n} {level:4s}  {truth:4s}  {ok / N:6.3f}  {bad / N:6.4f}')
