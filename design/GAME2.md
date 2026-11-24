# Game 2 design: the curly-wing flies (draft, 2026-11-19)

**Short version:** two curly-winged flies have fewer curly offspring than the 3:1 rule predicts. The student finds out why by reusing game 1's test cross. Nothing is built yet.

**Why this game next:**
- It is capability 2 in the team's Week 8 list ("explain a 2:1 ratio that should be 3:1"). [checked: `ELEC631-brain-shared/wiki/course/hypothesis-bench.md`]
- It reuses game 1's skill on a new problem. That tests the team's biggest open question, whether the skill transfers. [inference]

## Screens (one idea each)

| # | Screen | The one idea | What the student does |
|---|---|---|---|
| 1 | Meet the flies | "Both parents have curly wings. One copy of *Cy* gives curly wings. Both are *Cy/+*." | Next |
| 2 | Predict | "What share of their offspring will be curly?" | Pick from the pea-row style choices. The answer is 3/4 (Punnett, as in game 1). Hints never give the answer. |
| 3 | Hatch | "60 eggs hatch: 40 curly, 20 straight" (simulated, true rate 2/3) | One tap. The screen compares with the 3/4 they predicted (45 expected) and says counts alone can't settle it (see numbers). |
| 4 | Two ideas | "Just chance?" vs "Do *Cy/Cy* flies never hatch?" | Read. Both ideas are shown as Punnett squares, the second with the *Cy/Cy* box crossed out. |
| 5 | Test the curly flies | "Test-cross curly offspring with straight flies (+/+)" | Choose how many curly flies to test (up to 10). Each test gives 10 offspring: about half curly means *Cy/+*; 10 of 10 curly means *Cy/Cy*. |
| 6 | Verdict | "Do *Cy/Cy* flies survive?" | Yes / No / Can't tell yet (one tap, no typing). |
| 7 | Reveal | "*Cy/Cy* dies before hatching, so 2 curly : 1 straight." | The Punnett square with the *Cy/Cy* box crossed out. Sun points reward. Back to farm. |

## Scoring rule (same idea as game 1, judged against the evidence)

- **Any tested curly fly gives 10 of 10 curly** → it is *Cy/Cy*, so they survive. This never happens with the true model; a *Cy/+* fly does it by chance only 0.1% of the time.
- **None of k tested flies is *Cy/Cy*:** if *Cy/Cy* flies did survive, this would happen (2/3)^k of the time.
  - (2/3)^k > 5%, i.e. k ≤ 7 → "can't tell yet" is the supported verdict.
  - (2/3)^k ≤ 5%, i.e. k ≥ 8 → "No, they don't survive" is supported.

## Numbers

All computed by [`game2_numbers.py`](game2_numbers.py) (`python3 game2_numbers.py`).

**Why counting alone is weak:** a two-sided test at 5% rejects 3/4 when the truth is 2/3 only this often:

| Hatched flies | 50 | 100 | 150 | 200 | 300 |
|---|---|---|---|---|---|
| Chance the test notices 2/3 ≠ 3/4 | 29% | 48% | 60% | 73% | 88% |

40 curly of 60 gives p = 0.29 against 3/4, so screen 3 can't decide.

**Why testing single flies works:**

| Curly flies tested, none *Cy/Cy* | 3 | 5 | 7 | 8 | 10 |
|---|---|---|---|---|---|
| Chance of that if *Cy/Cy* survived | 30% | 13% | 5.9% | 3.9% | 1.7% |

## Sources (Biology 2e, PDF; text extracted in this project)

- **p. 326:** a recessive lethal allele that kills homozygotes before birth gives a 2:1 genotypic ratio. "the recessive lethal Curly allele in Drosophila affects wing shape in the heterozygote form but is lethal in the homozygote."
- **pp. 317–318:** a self-cross of a heterozygote gives 3:1.
- **p. 319:** test cross.
- **Our inference (for the team's expert review):**
  - "one copy gives curly wings", read from "affects wing shape in the heterozygote".
  - The 10-offspring test crosses and the counts are simulated.

## Design decisions (open)

Game 2 is not built, so none of these is decided yet.

1. **Which game:**
   - **Curly wings (recommended)**
   - Morgan's reciprocal fruit-fly cross (pp. 323–325)
   - Pedigree (pp. 319–320)
2. **Screens 4–5 (the test-cross step):**
   - **Keep (recommended):** it is the decisive, thinking-heavy part.
   - Drop: shorter, but the game ends at "counts can't tell".
3. **The farm:** a padlocked plot becomes a screened **fly house** (from the old 3D farm), labelled "Lethal alleles", which unlocks after the test cross. (2026-11-20: the toaster and enzyme plots now sit in their own yards east of the farm, so both padlocked plots are free.)
