"""Numbers for game 2 (curly wings, recessive lethal). Run: python3 game2_numbers.py
Two curly flies (Cy/+ x Cy/+). If Curly were a plain dominant allele, 3/4 of offspring would be curly (3:1, pp. 317-318).
Because Cy/Cy dies before hatching, 2/3 of the flies that hatch are curly (2:1, p. 326).
Question: after n hatched flies, how often does an exact two-sided binomial test at 5% reject "3/4 curly"?"""
from math import comb

def pmf(k, n, p): return comb(n, k) * p**k * (1 - p)**(n - k)

def two_sided_p(k, n, p0):
    # exact test: sum of probabilities of outcomes no more likely than the observed one
    pk = pmf(k, n, p0)
    return min(1.0, sum(pmf(i, n, p0) for i in range(n + 1) if pmf(i, n, p0) <= pk * (1 + 1e-9)))

def power(n, p_true=2/3, p0=0.75, alpha=0.05):
    return sum(pmf(k, n, p_true) for k in range(n + 1) if two_sided_p(k, n, p0) <= alpha)

print('n   expected curly if 3/4   expected if 2/3   P(reject 3/4 | true 2/3)')
for n in (20, 50, 100, 150, 200, 300):
    print(f'{n:<4}{0.75*n:>14.1f}{(2/3)*n:>18.1f}{power(n):>22.2f}')
print()
for n, k in ((30, 20), (90, 60), (150, 100), (150, 105)):
    print(f'example: {k} curly of {n} ({k/n:.3f}) -> p-value vs 3/4 = {two_sided_p(k, n, 0.75):.4f}')

# The sharper test: test-cross single curly offspring with straight flies (+/+), 10 offspring per test.
# If Curly were a plain dominant allele, 1/3 of curly offspring would be Cy/Cy and give 10 of 10 curly.
# If Cy/Cy dies (the truth), every curly fly is Cy/+ and gives about half curly.
print()
print('k curly flies tested, none Cy/Cy:  chance of that if Cy/Cy flies did survive = (2/3)^k')
for k in range(1, 11):
    print(f'  k={k:<2} {(2/3)**k:.3f}' + ('   <= 5%' if (2/3)**k <= 0.05 else ''))
print(f'a Cy/+ fly giving 10 of 10 curly by chance: (1/2)^10 = {0.5**10:.4f}')
