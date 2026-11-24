# Hypothesis Bench

A browser game for the OpenStax *Biology 2e* textbook. The student chooses an experiment that can tell two ideas apart, predicts its result, runs it on simulated data, and commits to a verdict that is judged against their own evidence.
ELEC 631 (Fall 2026), team Hypotheticals (Group 3).

## Motivation

- **Problem.** Under Figure 12.5 (p. 319), *Biology 2e* asks: a test cross gives three plants, all with round peas; is the round parent *RR* or *Rr*? The book leaves the question open. Exams rarely test this kind of reasoning: only 7% of 4,337 lower-division biology exam items asked students to use a scientific practice (Uminski et al., 2024).
- **Goal.** Students practice two skills: picking an experiment whose result differs under each idea, and judging how strongly the data support a claim (no over-claiming from too few offspring).
- **Course standard: the learner thinks more, not less.** The game never shows a result before the student has committed to a prediction, and it gives hints, not answers.
- **No AI model at run time.** Every scored answer comes from a fixed key with a *Biology 2e* page reference. Offspring and enzyme readings are simulated from fixed ratios.

## Built so far, compared with the project proposal

| Proposal | This version |
|---|---|
| 4 cases: hidden genotype, 2:1 ratio, reciprocal fly cross, pedigree | Only the hidden-genotype case (test cross) is built. The 2:1 curly-wing case is a design only ([design/GAME2.md](design/GAME2.md)). The reciprocal cross and the pedigree are not in this game; they were in the earlier Cross Examiner prototype, which is not in this repo. |
| Verdict with a confidence rating and a written reason | Removed. There is no typing; the verdict is one of three cards. |
| Further chapters | Two activities outside genetics, ported from teammates' prototypes: §1.1 (broken toaster) and §6.5 (enzyme inhibitors). |
| One engine; each chapter is a data "pack" | Not built. Each activity is its own block of code with its own rules and screens. There is no shared pack format. |
| Orchestrator connection: shared content IDs, one standard event record | Not built. The only output is the JSON answer log. |
| A/B learning test | Not reported here. The game saves each student's answers as a JSON file that such a study could use ([design/EXPORT.md](design/EXPORT.md)). |

## Run it

Open `hypothesis-bench.html` in a web browser. There is no install and no build step.

- The page loads three.js r128 (from cdnjs, for the 3D farm) and the Fredoka font (Google Fonts). Offline, the farm becomes a flat card with the same buttons, and the text uses the system font.
- Development checks ran on a local server: run `python3 -m http.server` in this folder and open <http://localhost:8000/hypothesis-bench.html>. The Save download was not checked from a file opened directly (`file://`).

Add switches to the address, e.g. `hypothesis-bench.html?farm&test`:

| Switch | Effect |
|---|---|
| `?farm` | Skips the first round. Starts on the farm with 200 sun points and no tour. |
| `?test` | Tester mode. A TEST bar and the ← → keys move one screen back or forward and fill in default answers. Logged events are marked `"test": true`. |
| `?map2d` | Forces the flat farm (no 3D). |

## What the student does

On the first visit, the student plays one introductory round of the test cross. They then get 200 sun points and a 4-step spotlight tour, and the 3D farm becomes the home screen. Each activity is a place on the farm.

| Activity (place on the farm) | *Biology 2e* | The student… | Design |
|---|---|---|---|
| Test cross (pea plot) | §12.2, pp. 318–319 | finds out whether a round-pea plant is *RR* or *Rr*: picks a partner (*rr*, *RR* or itself), predicts the result for both genotypes, grows seeds from a 60-seed budget, gives a verdict | [TECHNICAL.md](TECHNICAL.md#game-1-test-cross) |
| Inside the pea (greenhouse) | pp. 316–318, 328; fruit fly Fig. 13.3, p. 344 | builds genotypes and predicts their phenotypes, sees gametes form, fills a Punnett square, predicts the wrinkled share, grows 40 seeds | [design/PLOT-inside-the-pea.md](design/PLOT-inside-the-pea.md) |
| Broken toaster (kitchen, "Chapter 1.1" yard) | §1.1, pp. 13–15 | finds which of 3 ideas explains a toaster that won't toast, with at most 3 tests | [design/PLOT-toaster.md](design/PLOT-toaster.md) |
| Enzyme lab ("Chapter 6.5" yard) | §6.5, p. 177 | finds whether a drug is a competitive or a noncompetitive inhibitor, with at most 8 test wells | [design/PLOT-enzyme.md](design/PLOT-enzyme.md) |

All activities follow the same 5 steps: **Choose → Predict → Run → Commit → Feedback**. Each plot gives +50 sun points the first time it is finished. Sun points buy pets in the pet shop, and tapping a pet shows a fact from *Biology 2e* with its figure number. A "Chapter 13" sign on the farm is a locked placeholder.

## Design rules

1. **Predict before the result.** No data appear until the prediction is locked, and a locked prediction can't be changed. In the toaster and enzyme plots, Back is hidden after locking. In the test cross, Back is hidden once the verdict is locked, so the student can't grow more seeds after deciding.
2. **A hint, not the answer.** In the test cross, hints get stronger over 3 tries (list the gametes → empty Punnett grids → "count the boxes with an *R*") and never fill in the fraction. In the toaster and enzyme plots, the 1st wrong try gets a hint and the 2nd shows the answer.
3. **Uninformative experiments are flagged.** Crossing with *RR*, a toaster test whose result is the same under every idea still possible, and low substrate in the enzyme lab can't tell the ideas apart. The game says so and asks for another choice.
4. **The verdict is judged against the evidence.** Feedback says whether the verdict matches what the student's own data support (or claims more or less than that). The hidden truth is shown separately, because chance can produce misleading data.
5. **No typing.** Every answer is a tap or a click. The layout was checked at phone-sized windows in a desktop browser, not on a real phone.

## Data

The game logs each answer and screen change in the browser (localStorage). On the farm, **Save** downloads `hypothesis-bench-answers-YYYY-MM-DD.json`. No name or student ID is recorded. Format: [design/EXPORT.md](design/EXPORT.md).

## Files

| File | Contents |
|---|---|
| `hypothesis-bench.html` | The whole game: HTML, CSS and JavaScript in one file |
| [TECHNICAL.md](TECHNICAL.md) | Code structure, scoring rules, simulations, how it was checked, known limits |
| [NOTES.md](NOTES.md) | Development log by screen: what was built, checked and not checked |
| [design/](design/) | One design file per activity, the answer-file format, check scripts |

## Credits and sources

- Team Hypotheticals (Group 3): Vivian Zhu, Qichang Lei, Thomas Duong, Yash Vakilna.
- The Broken toaster and Enzyme lab plots port Yash's Toaster Bench and Enzyme Bench prototypes; their rules, answer keys and simulation are unchanged.
- Content quoted or adapted from Clark, M. A., Choi, J., & Douglas, M. (2018). *Biology 2e*. OpenStax. <https://openstax.org/details/books/biology-2e>, licensed CC BY-NC-SA 4.0.
- Uminski, C., Burbach, S. M., & Couch, B. A. (2024). Undergraduate biology lecture courses predominantly test facts about science rather than scientific practices. *CBE—Life Sciences Education, 23*(2), Article ar19. <https://doi.org/10.1187/cbe.23-12-0244>
- Libraries: three.js r128 and the Fredoka font, both loaded from the web at run time.
