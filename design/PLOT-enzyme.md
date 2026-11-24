# Plot 4 design: "Enzyme lab" (2026-11-20)

**Short version:** Yash's Enzyme Bench (pack 2, §6.5) rebuilt as game screens with drawings, in a lab building in its own fenced "CHAPTER 6.5" yard east of the farm. A new drug slows an enzyme. The student finds out whether it is a competitive or a noncompetitive inhibitor with at most 8 test wells. It uses the same 5 steps and the same rules as the toaster plot.

Source: `project/from-team/enzyme-bench/` (Yash, 2026-11-18/19). Unchanged: the hypotheses, the answer key, the simulation (well = max(0, round(mean + 20 × noise)); means below) and the 95% support rule.

## Screens (one idea each, no typing)

| # | Screen | What the student does |
|---|---|---|
| e1 | A new drug slows an enzyme | Sees the enzyme, its substrate and the drug. Next. |
| e2 | Two ideas, one is true | Competitive: binds the active site. Noncompetitive: binds an allosteric site (p. 177). Next. |
| e3 | 1 Choose | Low or very high substrate. |
| e4 | 2 Predict | For each idea: with the drug the rate is lower / about the same / higher. Hint, then answer. Low substrate: "both ideas predict lower", pick another level. |
| e5 | 3 Run | Run 1, 2 or 4 wells (8 in all). Each well is a bar against the 100% no-drug line. |
| e6 | 4 Commit | Competitive / noncompetitive / can't tell yet. Needs at least 1 well. |
| e7 | 5 Feedback | The hidden answer, the support for each idea (needs 95%), and the wells' average. |
| e8 | The idea | Rate vs substrate sketch drawn from the simulation, after Fig. 6.17. +50 sun points, star. |

## Simulated numbers (Yash's model, not the book)

- Mean rate with the drug, % of no drug: high substrate 99 (competitive) / 50 (noncompetitive); low substrate 60 / 50.
- Chance the true idea reaches 95% support, by number of high-substrate wells, fixed in advance: 1 → 51%, 2 → 81%, 4 → 97%, 8 → 99.9%. With 8 low-substrate wells: 8%. From [`enzyme_numbers.py`](enzyme_numbers.py) (100,000 runs each).

## Changed from Yash's version (team to confirm)

1. **Fig. 6.17 is not shown before Predict.** This reverses Yash's version 4 request ("show the book's diagram before the question"). Reason: our rule is predict before the reveal, and Yash's own note says the figure turns Predict into reading the figure. A sketch drawn from the simulation comes after Feedback. The hints point to the p. 177 text, not the figure.
2. **Low substrate can never be run.** In Yash's code it could be run after two wrong predictions.
3. No typed reason, no confidence slider (same as the toaster plot).
4. Shorter feedback: the average and the two simulated means, but not the tail probability.
5. No pea-pack switch (the game already has the pea test cross).
6. Answers go to the game's shared answer log (`EXPORT.md`).

## Book (text extracted 2026-11-20 from the Biology 2e PDF)

- p. 174: learning objective "Explain how enzymes function as molecular catalysts".
- p. 177: a competitive inhibitor "competes with the substrate for active site binding"; a noncompetitive one binds "a location other than the active site, called an allosteric site". Fig. 6.17 caption: competitive inhibitors "affect the initial rate but do not affect the maximal rate"; noncompetitive inhibitors "affect the maximal rate".
- p. 178: statins inhibit the enzyme HMG-CoA reductase.
- Ours: the enzyme drawings (we do not draw a shape change; that is Fig. 6.18's allosteric case).

## On the farm

The lab sits in a fenced "CHAPTER 6.5" yard east of the farm (front right), next to the toaster's "CHAPTER 1.1" yard. Both padlocked plots in the field stay free.
