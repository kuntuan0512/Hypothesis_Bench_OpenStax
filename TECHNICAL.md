# Hypothesis Bench: technical notes

## Architecture

- **One file.** `hypothesis-bench.html` holds all HTML, CSS and JavaScript. There is no framework, no build step and no server code. The script is a single function, `(function(){ 'use strict'; … })()`.
- **Network.** The page loads only three.js r128 (cdnjs) and the Fredoka font (Google Fonts). It makes no other network requests and sends no data anywhere.
- **Screens.** Each screen is a `<section>`. The object `screens` maps a name (`title`, `farm`, `meet` … `reveal`, `in1`–`in8` plus `in2f` and `in4b`, `t1`–`t8`, `e1`–`e8`) to its section. `go(name, focusEl)` hides the current screen, shows the next one, moves keyboard focus and logs a `screen` event. When the system asks for reduced motion, the slide animation is skipped.
- **Drawings.** All pictures are inline SVG built in JavaScript; the 3D farm is drawn by three.js. The page uses no image files.
- **Randomness.** `Math.random()` everywhere (no fixed seed), so every visit is different. The console hooks below set the hidden answers when a fixed case is needed.

## Code map

Line numbers change with every edit, so search `hypothesis-bench.html` for these comment headers and names.

| Search for | Contents |
|---|---|
| `var MATES`, `BUDGET`, `state` | Game 1 data: the three partners with the round share if the plant is *RR* / *Rr*, the 60-seed budget, the batch sizes 1/3/4/5/10/20, and the hidden genotype |
| `answer log` | `logEvent`, `saveLog`: localStorage key `hypothesis-bench-log-v1`, JSON download |
| `screen 3: predict` … `screen 6: reveal` | Game 1 screens. `judge(runs)` is the scoring rule |
| `reward after the introductory round` | Sun points (`wallet`), the reward pop-up, the spotlight tour (`TOUR`) |
| `pets` | `PETS` (price, *Biology 2e* fact, drawing), the shop, the floating pet |
| `farm home: 3D map` | `FARM`: the three.js scene, the road graph (`ROAD`, `ROAD_EDGES`, `roadRoute`), the farmer's walk, the camera, the label layout and the flat fallback |
| `"Inside the pea" plot` | Screens `in1`–`in8` |
| `"Broken toaster" plot` | `K_EXPS` (answer key), `kInPlay`, `kFlagged`, `kGrade`; screens `t1`–`t8` |
| `"Enzyme lab" plot` | `E_EXPS` (answer key and simulation means), `eSample`, `ePosterior`, `eLicensed`; screens `e1`–`e8` |
| `?farm`, `?test`, `window.GAME` | Address switches and test hooks, at the end of the script |

## Game 1: test cross

- **Hidden plant:** *RR* or *Rr*, 50/50, drawn on page load and again at each new round.
- **Seeds:** each seed is round with the share for the chosen partner (pp. 318–319):

| Partner | Round share if *RR* | Round share if *Rr* |
|---|---|---|
| Wrinkled plant *rr* (test cross) | 1 | 1/2 |
| Itself (self-cross) | 1 | 3/4 |
| Round plant *RR* | 1 | 1 (flagged: can't tell them apart) |

- **Scoring rule (`judge`):**
  - Any wrinkled seed → *Rr*.
  - Otherwise *p* = the chance that an *Rr* plant gives only round seeds in every batch so far = the product over batches of (round share if *Rr*)^(batch size).
  - *p* ≤ 5% → *RR*; *p* > 5% → "can't tell yet". **The 5% cut-off is the team's choice, not the book's.**

| All-round data | *p* | Supported verdict |
|---|---|---|
| Test cross, 3 seeds (the book's question) | 12.5% | can't tell yet |
| Test cross, 4 seeds | 6.25% | can't tell yet |
| Test cross, 5 seeds | 3.1% | *RR* |
| Self-cross, 10 seeds | 5.6% | can't tell yet |
| Self-cross, 11 seeds | 4.2% | *RR* |

  The values are 0.5^n and 0.75^n.

- **Feedback** compares the student's verdict with the supported verdict ("matches your evidence", over-claim or under-claim) and then shows the true genotype.

## Inside the pea

Each screen shows one step: genotype → phenotype, *RR* vs *Rr* look the same, gametes carry one copy, egg + pollen → seed, Punnett square, 40 random seeds. Only the 40 seeds are random (wrinkled share 1/4, from *Rr* × *Rr*); the gamete step is shown exactly as 2 *R* + 2 *r*. Details: [design/PLOT-inside-the-pea.md](design/PLOT-inside-the-pea.md).

## Broken toaster

- **Hidden fault:** outlet A, the toaster, or no power, chosen at random. Budget: 3 tests.
- **Answer key (`K_EXPS`):**

| Test | Outlet A broken | Toaster broken | No power |
|---|---|---|---|
| Toaster → outlet A again | fails | fails | fails (always flagged) |
| Coffeemaker → outlet A | fails (book, p. 15) | works | fails |
| Light switch | on | on | off (book, p. 13) |
| Toaster → outlet B | works | fails | fails |

  Cells without a page reference are the team's own predictions.

- **Rules:**
  - An idea is still possible if every test so far gave the result it predicts.
  - A test is flagged when all ideas still possible predict the same result.
  - The student marks each idea "possible" or "ruled out"; the conclusion is the one idea left, otherwise "not settled".
  - `kGrade` grades each mark: *over* = ruled out an idea the data still allow; *under* = kept an idea the data ruled out. The result is correct, claimed more, claimed less, mixed, or contradicts the data.
- Details: [design/PLOT-toaster.md](design/PLOT-toaster.md).

## Enzyme lab

- **Hidden answer:** competitive or noncompetitive inhibitor, 50/50. Budget: 8 wells, run in groups of 1, 2 or 4.
- **Simulation (teammate's model, not from the book):** a well reads max(0, round(μ + 20·z)) % of the no-drug rate, where z is a standard normal draw.

| Substrate | μ if competitive | μ if noncompetitive | Allowed |
|---|---|---|---|
| Very high | 99 | 50 | yes |
| Low | 60 | 50 | no: both ideas predict "lower" (flagged) |

- **Support rule (`ePosterior`, `eLicensed`):** a Gaussian likelihood with SD 20 for each idea, starting from 50:50. A verdict is supported when one idea reaches **95% support** (the team's choice).
- Chance that the true idea reaches 95% (100,000 simulated runs per row, [design/enzyme_numbers.py](design/enzyme_numbers.py)): 1 high-substrate well 51%, 2 wells 81%, 4 wells 97%, 8 wells 99.9%; 8 low-substrate wells 8%.
- Details: [design/PLOT-enzyme.md](design/PLOT-enzyme.md).

## Farm

- three.js scene: a field with the pea plot and greenhouse, two fenced yards for Chapter 1.1 and Chapter 6.5, a barn, roads and a farmer.
- Tapping a place makes the farmer walk there along the roads (shortest route over the road graph, `roadRoute`). The plot opens when he arrives; a timer opens it anyway if the animation stalls.
- The camera glides only when the farmer enters a different area. Place labels are HTML buttons placed over the 3D view, and they are moved so they don't overlap or leave the screen.
- **Flat fallback** (`farmFallback`): used when three.js does not load, WebGL fails, or `?map2d` is set. It shows the same places as buttons.

## Test hooks (browser console)

- `GAME.state()`, `GAME.wallet()`, `GAME.farm()`: read the current state.
- `GAME.test.setTruth('RR')`, `GAME.test.setRuns([...])`, `GAME.test.judge(runs)`: set the hidden plant or the seeds, and run the scoring rule.
- `GAME.toaster.*`: the same for the toaster plot.

## How it was checked

| Check | How to rerun | Result |
|---|---|---|
| Toaster rules = the teammate's original engine | [design/toaster_check.js](design/toaster_check.js), pasted in the console on `?farm` | every sequence of 1–3 tests (84), each fault and each marking: 5,268 checks, 0 differences (last run 2026-11-19) |
| Enzyme support rule = the original code, on the same well values | [design/enzyme_check.js](design/enzyme_check.js), same way | about 60,000 checks, 0 differences (last run 2026-11-20) |
| Enzyme: wells needed | `python3 design/enzyme_numbers.py` | numbers in the Enzyme lab section |
| Inside the pea: why 40 seeds | `python3 design/mechanism_numbers.py` | 40 seeds give 5–15 wrinkled 96% of the time; 4 seeds give none wrinkled 31.6% of the time |
| Game 1 seed shares | console runs, no saved script (NOTES.md) | round share over 6,000 seeds: test cross 0.496, self-cross 0.751 |
| Each screen | by hand in a browser at 1280×800, 375×812 and 812×375 | keyboard use, layout, no console errors; per screen in [NOTES.md](NOTES.md) |

Both `.js` check scripts fetch the teammates' original pages from `/from-team/toaster-bench/index.html` and `/from-team/enzyme-bench/index.html`, so they only run when those files are served next to this folder.

**Not tested:** a real phone, touch input, reduced-motion mode, the walk and camera animations in a visible browser window, and the Save download from `file://`.

## Known limits

- **One-seed shortcut.** Grow 1 test-cross seed, then answer *Rr* if it is wrinkled and "can't tell yet" if it is round. This always "matches the evidence", without designing a deciding experiment.
- **Guessing.** A student can try all 25 prediction pairs (5 × 5) on the predict screen.
- **Visible answer.** `GAME.state()` in the console shows the hidden plant.
- **Shared computers.** The answer log stays in the browser until site data is cleared, so Save also includes earlier students' sessions.
- **No saved progress.** A reload loses sun points and pets. Only the answer log is kept.
- **Phone held sideways (812×375).** Plot screens scroll by up to about 200 px.
- **Needs expert review.** "One *Rr* cell → 2 *R* + 2 *r* pollen" is the team's simplification; the book names only meiosis I as the separating step. "Gray is the wild type" for the fruit fly is inferred from Fig. 13.3 writing gray as *b⁺*.
