---
title: GitHub Actions Status in Polybar
date: 2021-04-12
---
Monitoring the status of GitHub Actions workflows to display status in Polybar.
---

curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/stuartthompson/table-format/actions/workflows/ci.yml/runs | jq '.workflow_runs[0].conclusion'

## Polybar Colored Output

Polybar colors can be specified as part of script output, as described in this
[guide](https://github.com/polybar/polybar/wiki/Formatting#foreground-color-f)

### Foreground Color

### Underline Color



