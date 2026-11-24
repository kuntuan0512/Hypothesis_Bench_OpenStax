"""Numbers for the 'inside the pea' plot. Run: python3 mechanism_numbers.py
Equal segregation: an Rr plant's gametes are R or r, half each (law of segregation, p. 328).
Rr x Rr: genotypes 1 RR : 2 Rr : 1 rr, phenotypes 3 round : 1 wrinkled (p. 318)."""
from math import comb
def pmf(k, n, p): return comb(n, k) * p**k * (1 - p)**(n - k)
def central95(n, p):
    # smallest k-range [lo, hi] around the mean that holds at least 95% of the probability
    lo = hi = round(n * p); mass = pmf(lo, n, p)
    while mass < 0.95:
        a = pmf(lo - 1, n, p) if lo > 0 else -1; b = pmf(hi + 1, n, p) if hi < n else -1
        if a >= b: lo -= 1; mass += a
        else: hi += 1; mass += b
    return lo, hi, mass
for n in (20, 40):
    lo, hi, m = central95(n, 0.5); print(f'{n} gametes from an Rr plant: R count usually {lo}-{hi} (holds {m:.0%})')
for n in (40, 100):
    lo, hi, m = central95(n, 0.25); print(f'{n} offspring of Rr x Rr: wrinkled usually {lo}-{hi} of {n} (holds {m:.0%}); none wrinkled: {(0.75)**n:.1e}')
# why 40 seeds (screen 7 tip): with few seeds, chance can hide the 1-in-4 pattern
for n in (4, 40):
    print(f'{n} offspring of Rr x Rr: none wrinkled {(0.75)**n:.1%} of the time')
