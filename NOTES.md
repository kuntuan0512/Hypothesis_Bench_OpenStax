# Game UI, built one screen at a time

## Screen 1: welcome (2026-11-12)

**What it shows:** a title, one line of tagline (since 2026-11-19: "Every round pea hides a secret. Run experiments to find it."; on a phone it breaks between the two sentences), a mascot (a pea pod with a "?" pea) and a Start button. Start goes to a "Next screen" placeholder, which has a Back button.

**Checked in the built-in browser:**
- Start works by mouse click, by Enter or Space, and when clicked 3 times fast (it switches only once).
- Back returns to the title.
- Keyboard focus moves to the new screen's button.
- No sideways scrolling and nothing overlaps at 1280×800, 375×812 (phone upright) and 812×375 (phone sideways).
- No console errors.

**Not tested:**
- a real phone
- reduced-motion mode (the rule is in the CSS but wasn't switched on)
- offline (the font then falls back to the system font)

## The flow (changed 2026-11-13)

1. **First visit:** Title → 1b plant → 2 partner → 3 predict → 4 grow → 5 verdict → 6 reveal (the introductory task).
2. **The reveal's button reads "Collect your reward":**
   - +200 sun points
   - spotlight on the sun counter, then on Pets
   - the 3D farm, with the spotlight on the pea plot
3. **After that:** the farm is home. The pea plot → 1b (new plant) → … → reveal → "Back to farm".
   - The plant slide always comes right before the partner choice, so the question sits next to the choice.
   - Before the reward, the sun counter and Pets button are hidden.

## Screen 1b: meet your plant (added 2026-11-13)

**What it shows:** a big pea pod with a "?" and the heading "Your plant has round peas". Below are two cards, *RR* or *Rr*?, the line "Both look round, so we can't tell yet", a key (*R* = round, dominant; *r* = wrinkled; p. 319) and Next. It replaced the reminder box that used to sit on screen 2.

Back goes to the title before the reward and to the farm after it.

## Reward + spotlight tour (moved to after the first round, 2026-11-13)

**What it shows:**
- A "Task complete! +200 sun points" pop-up.
- Then a 3-step spotlight. The screen dims and a light circle frames:
  1. the sun counter
  2. the Pets button
  3. the pea plot on the farm
- On the farm step, a tap on the plot goes straight through and starts a round.
- Skip or Escape ends the tour and goes to the farm.
- **Pets** opens a "Pet shop: coming in the next step" note.

The reward is given once per visit. Nothing is saved: a reload starts at 0.

**Checked:**
- The counter stays hidden until the reward, and the reward is given once.
- The spotlight frames each target (measured with the glide switched off).
- A tap on the plot during step 3 starts a round.
- Skip and Escape work.
- No overlaps at 3 sizes.

**Bugs found and fixed:**
- The spotlight was too small for the counter, because the number grew after the light was placed.
- Skipping during the count-up made the number jump back.
- The counter covered the prediction line on the grow screen with the phone sideways.
- The tour waited for the pop-up's close event, which some browsers deliver late, so it never started. The button now starts it directly.
- A late animation frame could overwrite the final 200.

## Farm home (3D, added 2026-11-13)

**What it shows:** a full-screen 3D farm in the old farm file's style (three.js r128 from cdnjs): fenced field, dirt path, barn "MENDEL'S FARM", windmill, pond, hay and trees.
- **One playable plot:** the pea bed with a floating "?", a pulsing gold ring and a "Pea plot · PLAY" label.
- **Three padlocked plots:** decoration only (levels not built yet).
- **Corner items:** "Your farm" top left, the sun counter and Pets top right, the hint and the turn/zoom/reset buttons at the bottom.

**Controls:**
- Drag to turn and tilt.
- Mouse wheel or trackpad pinch to zoom.
- The buttons ⟲ ⟳ + − ⌂.
- A short opening swing, which is skipped during the tour.

**Fallback:** if three.js can't load (offline), WebGL fails, or `?map2d` is in the address, a flat card with a "Pea plot: play" button appears.

**Checked:**
- The view buttons change the view and zoom stops at its limit.
- A drag that ends on the plot only turns the farm.
- Enter on the plot starts a round.
- The farm draws while it is shown (45 → 49 frames) and stops when you leave (stays at 49).
- All three fallback causes show the flat card, and the tour and its Skip find the flat button.
- At 1280×800, 375×812 and 812×375 the title, counter, controls, hint and plot label don't overlap, and the plot and tour tip are on screen.

**Not tested:**
- a real phone or touch drag
- reduced motion
- the farm's speed on a slow laptop

**Testing note:** the browser pane was hidden during these tests. That freezes animation frames and CSS glides, so timing checks were done with the glide switched off or by forcing a frame with a screenshot.

## Screen 2: pick a mate (2026-11-12)

**What it shows:** one task, "Pick a partner to cross it with". There are 3 cards: Wrinkled plant (*rr*), Round plant (*RR*) and Itself (self-pollinate). The "your plant is round" reminder was moved to screen 1b. "Cross them" unlocks after a pick and goes to a placeholder for screen 3 (predict). Nothing on this screen says whether the pick is good; feedback comes later.

**Checked:**
- Click a card, click another: only one stays picked.
- Arrow keys move the pick.
- Cross is locked until a pick is made.
- Back from screen 3, and leaving to the title and coming back, both keep the pick.
- Fits without scrolling at 1280×800 and 375×812. At 812×375 the Cross button is on screen; the page is 13 px taller than the screen.
- No errors.

## Screen 3: predict (2026-11-12)

**What it shows:** one task, "Predict before you grow". There are two rows: "If your plant is *RR*" and "If *Rr*". Each row has 5 choices drawn as 4 peas: all, 3/4, 1/2, 1/4, none round. "Lock prediction" unlocks once both rows are picked. Feedback opens in a pop-up.

**How the pop-up answers:**
- **Wrong:** a hint, never the answer.
  - Try 1: list the gametes first.
  - Try 2: the gametes in words, plus empty Punnett grids.
  - Try 3+: also "count the boxes with an *R*".
  - Tries are counted per partner.
- **Partner *RR*, answered correctly:** "Right, and that's the problem". Both possibilities give all round, so the student is sent back to pick another partner.
- **Correct, *rr* or itself:** "Prediction locked" → Grow seeds (a placeholder screen).
- The answers are from the book: test cross p. 319, self-cross 3:1 p. 318.

**Checked:** all 3 partners; hint levels 1–3 with the grids empty and no answer in the text; tries counted per partner; the locked state kept after going back; mouse, arrow keys, Enter and Escape; fits 1280×800, 375×812 and 812×375 without scrolling; no errors.

**Known limits:**
- A student can still guess through the 25 answer pairs.
- Only one locked prediction is remembered. Switching partner means predicting again.

## Screen 4: grow seeds (2026-11-12)

**What it shows:**
- A line with your partner and your prediction.
- A big "60 seeds left" counter.
- Batch sizes 1/3/4/5/10/20.
- A planter where the newest batch pops in, with its count, e.g. "20 seeds: 7 round, 13 wrinkled".
- A per-partner total once there are 2 or more batches.
- Grow, and "I'm ready to decide", which is a placeholder for screen 5.

**How it works:** the hidden plant is *RR* or *Rr* (50/50), drawn when the page loads. Each seed is round with the chance from the book. The 60 seeds are shared across partners, and switching partner keeps the earlier batches.

**Checked:**
- Round share over 6,000 seeds: test cross 0.496 (expected 0.5), self-cross 0.751 (expected 0.75). An *RR* plant always gives round peas.
- Sizes larger than the seeds left are disabled. At 0 left, Grow is disabled and focus moves to "ready".
- Switching partner keeps the batches.
- Back keeps everything.
- Arrow keys and Enter work.
- Fits 1280×800, 375×812 and 812×375 without scrolling. No errors.

## Screen 5: verdict (2026-11-13)

**What it shows:**
- Your data at the top: totals per partner, round and wrinkled.
- "What's your verdict?" with 3 cards: It's *RR* / It's *Rr* / Can't tell yet.
- "Lock in my verdict" unlocks once a card is picked. It goes to screen 6.
- There is no written reason box. It was removed on 2026-11-13 because this is an introductory task.

**After locking:** the cards are read-only and the Back button is hidden, so a student can't go back and grow more.

**Checked:**
- Lock stays off until a card is picked.
- Arrow keys and Enter work.
- Fits 1280×800, 375×812 and 812×375 without scrolling. No errors.

**Bug found and fixed:** picking a verdict card cleared the partner card's highlight on screen 2 (the highlight code wasn't limited to its own screen).

## Screen 6: reveal (2026-11-13)

**What it shows:**
- The "?" pea flips to show the real genotype, with the heading "Your plant was *Rr*".
- One result line: "Your verdict matches your evidence" (✓), or "Your evidence pointed to: …" (!).
- 1–3 short sentences on why, then "You said: …".
- Button: "Collect your reward" after the first round, then "Back to farm". Both give a new hidden plant with everything cleared.

**Scoring rule** (same as `step1-test-cross/SPEC.md`):
- Any wrinkled pea → *Rr*.
- Otherwise p = the chance an *Rr* plant gives all round.
  - p > 5% → can't tell yet
  - p ≤ 5% → *RR*
- The 5% cut-off is our choice, not the book's.
- The verdict is judged against the evidence. The true genotype is shown separately.

**Checked:**
- **Rule:** test cross with 3, 4 and 5 seeds; self-cross with 10 and 11; mixed 3 + 5; wrinkled. All 7 match the values computed earlier in Python.
- **Feedback cases:**
  - wrinkled → *Rr* matches
  - 4 round + *RR* → over-claim, 6.3%
  - *Rr* plant with 5 round + *RR* → matches, plus "this plant was *Rr* anyway", 3.1%
  - 20 round + "can't tell" → under-claim, "less than 0.1%"
  - 3 round + *Rr* → "nothing shows an *r*", 12.5%
- The button clears everything for the next round.
- Keyboard works. Fits all 3 sizes. No errors.

**Known limit (unchanged):** growing 1 seed and answering "can't tell yet", or *Rr* if the pea is wrinkled, always "matches the evidence".

**Note:** `GAME.state()` and `GAME.test` in the browser console show and set the hidden plant. They are for testing, and a student could use them.

**Design ideas taken from:** general title-screen advice (one clear Start, art that sets the mood, little clutter) and kids' learning-app start screens (mascot plus a short tagline). The art is original.

## Plot 2: "Inside the pea" (built 2026-11-19; design in `design/PLOT-inside-the-pea.md`)

**On the farm:** a glass greenhouse (the old farm's model) replaces one padlocked plot.
- **Before it is played:** "Inside the pea · NEW" with a gold ring.
- **After:** a gold star and PLAY.
- The tour has a 4th step that points at it.

**Screens (no typing; predict before each reveal):**
1. A cell has two copies, one from each parent.
2. Build a pea: *RR*, *Rr*, *rr* → round/wrinkled.
3. **Fruit fly**: *b⁺b⁺*, *b⁺b*, *bb* → gray/black. Biology 2e Fig. 13.3, p. 344: "a dominant gray color b⁺, or a recessive black color b". A "Why +?" chip opens a tip: + marks the wild type. Source, p. 321: "the most common phenotype or genotype among wild animals as the wild type (often abbreviated “+”)". "Gray is the wild type" is our inference from Fig. 13.3 writing gray as b⁺.
4. Same outside, different inside: an x-ray of *RR* vs *Rr*.
5. An *Rr* cell makes 2 *R* + 2 *r* pollen. The *RR* and *rr* quick checks are on their own screen after it (split 2026-11-19: the page was dense).
6. Egg + pollen → a seed (make 2).
7. Punnett grid: fill the edges and the boxes, check, then predict the share of wrinkled (1/4). Since 2026-11-19, a hint line leads the student through 3 steps (mother's eggs → father's pollen → boxes). Only one step is tappable at a time. Tapping a box lights up its egg and pollen in blue. Two hints for wrong moves: if both eggs (or both pollen) match, a question points back to the pollen screen; after a wrong check, the red boxes stay red until changed.
8. 40 random seeds (can be repeated). Since 2026-11-19, the result is shown as two big tiles: round count and wrinkled count. The wrinkled tile is highlighted and says "you predicted ~10". Both counts tick up as the seeds appear. The RR/Rr/rr breakdown was removed. A "Why 40?" chip opens a tip on why so many seeds: with only 4 seeds there's no wrinkled seed at all 31.6% of the time, while 40 seeds usually give 5–15 wrinkled (`design/mechanism_numbers.py`).
9. Recap; +50 sun points the first time. Since 2026-11-19, a reward card pops up for this: a sun with turning rays, 3 stars, +50 counting up, and confetti. **Collect** flies the sun to the counter at the top, which counts up. Escape also collects (not tested).

**Back (2026-11-19):** every screen except the title and the farm now has "‹ Back" in the top-left corner. New on the two end screens:
- The plot's end screen goes back to the 40 seeds. Going forward again gives no second reward.
- Game 1's reveal goes back to the verdict screen. The verdict stays locked, and its button reads "See the result ›".

**Farm button (2026-11-19):** "⌂ Farm" in the top bar (icon only on phones) returns to the farm from any screen. It is hidden on the farm, on the title, in the first round and during the tour.
- The plot resumes at the screen where the student left.
- In game 1, leaving after the verdict starts a fresh round next time.

**Greenhouse hover card (2026-11-19):** hovering over (or tabbing to) "Inside the pea" on the farm shows a card titled "Genotype → appearance", with a picture (an *Rr* cell → a round pea) and one sentence on what the plot shows. It sits on the side of the plot with more room. Touch screens have no hover, so a tap just opens the plot. The flip to the left side was not seen in action.

**Test cross hover card (2026-11-20):** hovering over (or tabbing to) "Test cross" shows a card titled "RR or Rr?" with your round pea × a wrinkled *rr* pea, and one sentence: cross it with a wrinkled plant, grow seeds, decide what the seeds show. Checked by hovering at 1280×800.

**Tester mode (2026-11-19):** add `?test` to the address (e.g. `?farm&test`). A "TEST" bar with ‹ › appears on the left (bottom-left on phones). The ← → keys do the same.
- › moves to the next screen without doing its task.
- In game 1, › fills in a default answer: the *rr* partner, a locked prediction, 10 simulated seeds, and the first verdict card.
- It also clicks through pop-ups, the tour and the reward card.
- Checked: the whole first round from the title to the farm, the plot forward and back, and game 1 from the farm.

**Farmer and Chapter 13 sign (2026-11-19):**
- **Farmer:** a small farmer (straw hat, blue shirt) walks to the plot you tap, then the plot opens. A walk takes at most 1.1 s. He crosses the fence only at the gate, and he stays at the last plot.
  - He is drawn 1.5× bigger on phones.
  - No walk with reduced motion, in `?test`, or on the flat farm.
  - A timer opens the plot even if animation stalls, and extra taps during a walk are ignored.
- **Sign:** a "CHAPTER 13 ↑" sign stands beside the road just outside the gate.
  - Its label reads "Chapter 13 SOON". It has a hover card.
  - Tapping it walks the farmer there, then shows "Chapter 13 is coming".
  - The title and "13.1 Chromosomal Theory and Genetic Linkage" come from the chapter's opening page. "Genes sit in a line" paraphrases its "genes are arranged in a linear order on chromosomes".
  - It is locked, and **when it unlocks is not decided.**
- **Not seen:** the walk animating in a visible pane (checked only with screenshots).
- **2026-11-20, farmer too small to see:** with the wider farm he was about 8 px tall and stood under the test-cross star. He is now drawn 1.7× (2.2× on phones), stands beside the test-cross plot, waves every 4 s, and faces you after a walk.
- **2026-11-20, fences:** the south and west fences had slipped into a code comment during the toaster-plot edit; they are restored.
- **2026-11-20, roads and drone camera:**
  - **Roads:** three new dirt roads join every plot.
    - a branch from the main road to the greenhouse door
    - an east road at z −2.4
    - a road inside the east fence linking both yard paths
    - The roads miss the two padlocked plots.
  - **Route:** the farmer walks only along the roads, by the shortest route: a road graph with Dijkstra's shortest path. He stands on the main road just north of the Test cross plot.
  - **Camera (changed the same day):** the camera moves only when the farmer walks into a different area: the field, the road north of the gate, the Chapter 1 yard or the Chapter 6 yard.
    - On an area change it glides to frame the new area, easing in and out, and zooms to 0.6 for the yards and the north road. Back in the field it returns to the field's earlier zoom.
    - A walk inside one area (e.g. Test cross → greenhouse) leaves the camera still, and returning from a plot does not move it.
    - Labels of plots that are off screen are pinned to the screen edge, so they can still be tapped. ⌂ glides back to the whole farm.
    - A walk takes 0.7 s + length/14, at most 2.4 s. Tester mode and reduced motion skip the walk and the glide.
  - **Checked:** at 1280×800, every plot and the sign, a same-area walk (no camera move), area changes in and out, ⌂, and `?test`. At 375×812, the kitchen view with pinned labels. No errors.
- **2026-11-20, crowded labels (fixed):** on phones and short screens the farm labels are smaller. On every screen, a label that would be cut off slides back in from the edge, and a label that overlaps another moves down below it. This reruns whenever the camera moves. Checked at 375×812, 812×375, 405×693 and 1280×800: no overlaps and nothing off screen. On the wide desktop no label moves.

**Answer export (2026-11-19):** each answer and screen change is logged and kept in the browser's localStorage, so it survives a reload. **Save** (top bar, farm only) downloads `hypothesis-bench-answers-<local date>.json`. There is no name field.
- Format: [design/EXPORT.md](design/EXPORT.md).
- Checked: game 1 and every plot answer by real clicks, the log surviving a reload, the file contents, tester-mode marking, and the phone top bar.
- **Open question:** on a shared computer, Save also includes earlier students' sessions. Options: save only this session, clear after Save, or a Clear button.
- **Not checked:** a real download and reload from `file://` in Chrome (tested on localhost with the download caught).

**Blur check (2026-11-19):** no blur filters and no raster images in the page; the 3D canvas buffer matched its on-screen size. The app's browser pane reports devicePixelRatio 1, so on a 2× Mac screen it looks soft there. The farm now re-reads the pixel ratio on every resize (browser zoom). Not tested on a 2× screen.

**Checked:**
- All 9 screens, twice. The second time every screen starts clean and gives no second reward.
- Wrong grid boxes are marked; a wrong share guess gets a hint, not the answer.
- Wrinkled share over 10,000 simulated seeds: 0.249 (expected 0.25).
- Fits 1280×800 and 375×812 on every screen.
- The flat fallback shows both plots.
- No errors.

**Bugs fixed:**
- The greenhouse showed a "done" star before it was played.
- Restarting the plot left the last 40 seeds on screen.
- A new class name clashed with the reveal card.
- The phone layouts were too tall.

**Known limits:**
- **Phone held sideways (812×375):** these screens scroll by 96–203 px. Each answer scrolls into view when it appears.
- **Expert check needed:**
  - "One *Rr* cell → 2 *R* + 2 *r* pollen" is our simplification. The book names only meiosis I as the separating step.
  - The fly appears only as a drawing; the book's figure is about linkage (Ch. 13).
- **Not tested:** a real phone, touch, and the animations with the pane visible.

**Test switch (2026-11-19):** add `?farm` to the address to skip the first round and start on the farm with 200 sun points (no tour). Without it, the game starts at the title as before.

## Plot 3: "Broken toaster" (built 2026-11-19; design in `design/PLOT-toaster.md`)

Yash's Toaster Bench (`project/from-team/toaster-bench/`, Biology 2e §1.1) as 8 screens with drawings. A "KITCHEN" house: "Broken toaster · NEW", then a star and PLAY. The gold ring moves to it once "Inside the pea" is done.

**Own region (2026-11-20):** chapters outside genetics get their own fenced yard east of the farm. The kitchen stands in the "CHAPTER 1.1" yard (back right), the enzyme lab in the "CHAPTER 6.5" yard (front right). Each yard has a gate, a sign, and a dirt path from its own gate in the farm's east fence. The farmer crosses fences only at gates and walks round the pea bed. A trip to or from a yard takes 2.2 s (1.1 s inside the field). Both padlocked plots are back in the field. Checked: all 20 trips between the 5 places (test cross, greenhouse, Chapter 13 sign, two yards), none crosses a fence, a building or the pea bed; 2 of them go round the bed.

**Screens (no typing):** the toaster won't toast → three ideas → 1 Choose (4 tests, 3 allowed) → 2 Predict (works / doesn't work for each idea; a hint after the 1st wrong try, the answer after the 2nd; a warning if the test can't rule anything out) → 3 Run → 4 Commit (mark each idea possible / ruled out) → 5 Feedback (the hidden fault, and claimed more / less) → the 5-step loop, +50 sun points the first time.

**Checked (2026-11-19):**
- Rules against the engine code in Yash's Toaster Bench page: 3 faults × 84 test sequences × 8 markings, 5,268 checks, 0 differences. The answer key matches cell by cell. Rerun: `design/toaster_check.js` (paste into the console on `?farm`).
- No result before a locked prediction: Back is hidden after locking and after a run. Back before locking and "Pick another test" cost nothing.
- Farm button mid-round: comes back to the same screen with the same hidden fault. Play again: a new fault, no second reward.
- Fits 1280×800 and 375×812 without scrolling; 812×375 scrolls 46–177 px (as plot 2). No console errors; game 1 and plot 2 still run start to finish in `?test`.
- Answer log: `toaster-prediction`, `toaster-run`, `toaster-verdict` (fields in `design/EXPORT.md`).

**Not tested:** a real phone, touch, the kitchen hover card, the walk animation with the pane visible.

**Known limit:** on a portrait phone (375×812) the five plot labels crowd and some overlap or run off the edge. This was already so before the yards were added; the yards make the farm draw smaller. Landscape and desktop show all labels.

## Plot 4: "Enzyme lab" (built 2026-11-20; design in `design/PLOT-enzyme.md`)

Yash's Enzyme Bench (`project/from-team/enzyme-bench/`, Biology 2e §6.5) as 8 screens with drawings, in a lab building (blue roof, flask) in the fenced "CHAPTER 6.5" yard (see Plot 3): "Enzyme lab · NEW", then a star and PLAY. The ring moves to it after the toaster.

**Screens (no typing):** a new drug slows an enzyme → two ideas (competitive: takes the active site; noncompetitive: binds an allosteric site, p. 177) → 1 Choose (low or very high substrate) → 2 Predict (lower / about the same / higher for each idea; low substrate: "both predict lower", pick another level) → 3 Run (1, 2 or 4 wells, 8 in all; each well a bar against the 100% no-drug line, simulated) → 4 Commit (competitive / noncompetitive / can't tell yet) → 5 Feedback (the hidden answer, support for each idea, a verdict needs 95%) → a rate-vs-substrate sketch drawn from the simulation, +50 sun points.

**Checked (2026-11-20):**
- Support rule against Yash's own code on identical well values: about 60,000 checks, 0 differences. One well at 98% gives 94.7% support (can't tell yet), 99% gives 95.3% (competitive). Rerun: `design/enzyme_check.js`.
- How many wells: 1 high well reaches 95% support 51% of the time, 2 → 81%, 4 → 97%; 8 low wells only 8% (`design/enzyme_numbers.py`, simulated).
- Low substrate can't be run, even after the answer is shown. Wells are drawn once, on Run; Farm and back keeps them.
- Fits 1280×800 and 375×812 without scrolling; 812×375 scrolls up to 171 px. No console errors; every game and plot runs start to finish in `?test`.
- Answer log: `enzyme-prediction`, `enzyme-run`, `enzyme-verdict` (fields in `design/EXPORT.md`).

**Not tested:** a real phone, touch, the lab hover card.

## Pets (2026-11-20)

The **Pets** button opens a pet shop, ported from `old_3D farm and pet system.html`:
- **The pets:** the same 6 pets and art, priced in sun points: Pea 120, Snapdragon 150, Fruit fly 180, Rabbit 220, Dog 250, Cat 250.
- **Buying:** Buy spends sun points. **Try** shows a pet free for 30 s. Owned pets can be put away and brought back.
- **On screen:** the pet floats on every screen, bottom-right, and can be dragged or moved with the arrow keys.
- **Facts:** tapping the pet shows its fact from Biology 2e. The figure and section numbers were checked against the PDF on 2026-11-20: Fig. 12.4, 12.7, 12.12, 12.8, 18.9 (§18.2) and 13.9 (§13.2).
- **Reactions:** the pet hops with happy eyes after any right answer or reward.
- **Logging:** shop actions go into the answer log as `pet` events.
- **Not ported yet:** the dress-up panel (colour, hat, glasses, clothes). Its data is already in the code.
- **Not saved:** a reload loses pets and sun points, the same as before.
- **Checked:** buying, the facts, put away and bring back, the try (except waiting out the full 30 s), dragging with the mouse, the hop after a right answer, and the phone shop layout, with no errors.
