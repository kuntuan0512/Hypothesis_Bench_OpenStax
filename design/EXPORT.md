# Answer file format (Hypothesis Bench, format 1)

**Short version:** the game logs each answer and screen change in the student's browser (localStorage, key `hypothesis-bench-log-v1`). The **Save** button on the farm downloads it as `hypothesis-bench-answers-YYYY-MM-DD.json`. No name or ID is recorded.

## File

```json
{"app": "Hypothesis Bench", "format": 1, "savedAt": "<ISO time>", "events": [ ... ]}
```

Every event has `time` (ISO, UTC), `session` (a random code, new on each page load), `screen` and `event`. Events from tester mode (`?test`) also have `"test": true`.

## Events

| event | when | extra fields |
|---|---|---|
| `start` | page opened | — |
| `screen` | a screen appears | — (`screen` is the new one) |
| `partner` | game 1: "Cross them" | `partner`: rr / RR / self |
| `prediction` | game 1: each "Lock prediction" try | `partner`, `ifRR`, `ifRr` (share round, 0–1), `correct`, `informative` (false for the RR partner: that cross can't tell RR from Rr, so even a correct prediction doesn't lock) |
| `grow` | game 1: each Grow | `partner`, `seeds`, `round`, `wrinkled` |
| `verdict` | game 1: verdict locked | `said` and `evidencePointsTo` (RR / Rr / unsure), `matchesEvidence`, `truth` (RR / Rr) |
| `reward` | sun points given | `sun` |
| `build` | plot screens 2–2f: a prediction | `organism` (pea / fly), `genotype`, `predicted`, `correct` |
| `xray` | plot screen 3 | `answer` (A / B / cant), `correct` |
| `pollen` | plot screens 4–4b | `cell` (Rr / RR / rr), `answer` (RRRR / RRrr / rrrr), `correct` |
| `seed` | plot screen 5: "Make a seed" | `egg`, `pollen`, `genotype` |
| `grid` | plot screen 6: "Check the grid" | `wrongBoxes` (0 = all right) |
| `share` | plot screen 6: share guess | `answer` (0–1), `correct` |
| `grow40` | plot screen 7: each grow | `round`, `wrinkled` |
| `toaster-prediction` | toaster plot: each "Lock predictions" try | `experiment` (same / coffee / lights / other), `outlet`, `toaster`, `power` (the predicted result if that idea is true: works / fails / on / off), `correct`, `try` |
| `toaster-run` | toaster plot: each test run | `experiment`, `result`, `uninformative` (true: the ideas still in play all predicted the same result) |
| `toaster-verdict` | toaster plot: "Commit" | `outlet`, `toaster`, `power` (possible / out), `conclusion` and `evidencePointsTo` (outlet / toaster / power / unsure), `kind` (correct / over / under / mixed / contradicts), `truth`, `testsUsed` |
| `enzyme-prediction` | enzyme plot: each "Lock predictions" try | `experiment` (low / high), `comp`, `non` (the predicted rate if that idea is true: lower / same / higher), `correct`, `try` |
| `enzyme-run` | enzyme plot: each Run | `experiment`, `values` (each well's rate, % of the no-drug rate; simulated) |
| `enzyme-verdict` | enzyme plot: "Commit" | `said` and `evidencePointsTo` (comp / non / unsure; 95% support rule), `supportComp`, `supportNon`, `wellCount`, `average`, `truth` |
| `pet` | pet shop | `action` (buy / try / bring / away), `pet` (pea / snapdragon / fly / rabbit / dog / cat), `price` (buy only) |

## Limits

- The log stays in one browser until the site data is cleared. On a shared computer, Save would include earlier students' sessions (open question, see NOTES.md).
- A browser can't write a file silently, so "store locally" means localStorage plus the downloaded file.
