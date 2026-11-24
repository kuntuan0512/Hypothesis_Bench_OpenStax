# New plot design: "Inside the pea" (draft, 2026-11-19)

**Short version:** the student looks inside a pea plant. They see that two gene copies decide what a pea looks like, that each pollen grain or egg carries only one copy, and that a seed gets one copy from each parent. They predict before each reveal. Nothing is built yet.

**Why:**
- It shows the hidden mechanism behind game 1. Students can see why an *Rr* plant looks round and why a test cross works.
- It practises §12.2's first objective: genotype ↔ phenotype in dominant and recessive systems (p. 316). [checked]

## Picture language (the same on every screen)

| Thing | How it looks |
|---|---|
| Gene copy (allele) | A bead on a chromosome bar: *R* = green round bead, *r* = tan wrinkled bead (the pea icons from game 1) |
| Where a copy came from | Bar colour: purple = from the mother plant, orange = from the father plant |
| A plant cell | A circle holding **two** bars (diploid, p. 316) |
| Pollen or egg (gamete) | A small circle holding **one** bar (haploid, p. 316) |

## Screens (one idea each; the student predicts before every reveal)

| # | Screen | The one idea | What the student does |
|---|---|---|---|
| 1 | Inside a pea plant | "Every cell holds two copies of the seed-shape gene, one from each parent." | Watch a zoom from the plant into one cell with two bars. Next. |
| 2 | Build a pea | "The two copies decide the shape. One *R* is enough for round." | Put two beads in the slots, **predict** round or wrinkled, then the pea grows. Make all three: *RR*, *Rr*, *rr*. |
| 3 | Same outside, different inside | "*RR* and *Rr* look the same; only the inside differs." | An "x-ray" toggle on two round peas. This is the question from game 1. |
| 4 | Making pollen and eggs | "Each gamete gets **one** copy; an *Rr* plant makes half *R*, half *r*." | **Predict** which gametes an *Rr* cell makes, then watch it divide: the two bars separate (meiosis I, p. 328) into exactly 2 *R* and 2 *r*. Then quick checks for *RR* and *rr*. |
| 5 | A new seed | "Pollen + egg = a new pair: one copy from each parent." | Drag one pollen grain onto one egg. The seed's two beads (one purple, one orange) and its shape appear. |
| 6 | All the pairings | "A Punnett square lists every pollen–egg pairing, each equally likely." | Fill the 2×2 grid for *Rr* × *Rr* by dragging gametes to the top and side, then **predict** the share of wrinkled seeds. |
| 7 | Grow 40 seeds | "Chance picks the pairings; the count lands near 1 wrinkled in 4." | One tap: 40 random pairings fly in and a tally builds (usually 5–15 wrinkled of 40). Compare with the prediction. |
| 8 | Done | Recap: the three ideas as three pictures. Gold star and sun points. | Back to farm. |

## Rules

- **Feedback:**
  - Hints get stronger but never give the answer. Same rule as game 1.
  - Each prediction locks before the reveal.
  - No typing.
- **Where the randomness is:**
  - Screen 4 shows meiosis exactly: one *Rr* cell → 2 *R* + 2 *r*.
  - Randomness enters only at screen 7, when gametes meet.
  - That keeps the "half and half" rule clear: the count isn't noisy at that step.

## Numbers

Computed by [`mechanism_numbers.py`](mechanism_numbers.py).
- 40 seeds from *Rr* × *Rr*: wrinkled is usually 5–15 (96% of runs), and "none wrinkled" is 1 in 100,000.
- 20 random gametes would usually show 6–14 *R*. That spread is too noisy to teach "half and half", hence the exact split on screen 4.

## Sources (Biology 2e, text extracted 2026-11-19)

- **p. 316:**
  - genotype = "underlying genetic makeup"; phenotype = "observable traits"
  - "haploid gametes, which contain one copy of each homologous chromosome that unite at fertilization"
  - one allele dominant, one recessive
- **p. 317:** the Punnett square lists the parents' alleles "along the top … and side … representing their meiotic segregation into haploid gametes"; "every possible combination of unit factors was equally likely".
- **p. 318:** "fertilization is a random event … 1:2:1"; *RR* and *Rr* "phenotypically identical".
- **p. 328:**
  - the law of segregation: "segregate equally into gametes"
  - "The physical basis … is the first division of meiosis"
  - the recessive allele "will be transmitted to offspring"
- **Our choices:** the bead/bar pictures, colours and the number 40.
- **Inference:** one *Rr* cell → exactly 2 *R* + 2 *r* gametes (full meiosis). The book names only meiosis I as the separating step, so this needs the team's expert check.

## Design decisions

1. **2D or 3D cell:**
   - **2D animated drawings (recommended):** clearer and quicker to test.
   - 3D: reuse the old 3D meiosis cell.
   - **Decided:** 2D drawings (SVG, no 3D).
2. **Where it sits:**
   - **A greenhouse plot on the farm, open from the start (recommended)**
   - Unlocked after the test cross
   - **Decided:** a greenhouse on the farm, playable as soon as the farm appears (after the introductory test-cross round).
3. **Order with game 2 (curly wings):**
   - **Build this plot first (recommended):** game 2's crossed-out *Cy/Cy* box builds on screen 6 here.
   - Build game 2 first.
   - **Decided:** this plot was built first. Game 2 is not built.
