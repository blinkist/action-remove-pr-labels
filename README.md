# Remove PR Labels

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/blinkist/action-remove-pr-labels/blob/main/LICENSE)
![CI](https://github.com/blinkist/action-remove-pr-labels/actions/workflows/test.yml/badge.svg?branch=main)

A GitHub action to remove labels from pull requests.

## Input

| Input                             | Description                                                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`                      | GitHub access token for authorizing access to the repository.<br>_Defaults to **${{ github.token }}**_.                 |
| `LABELS`                            | An array of labels to remove, separated by commas. If not specified, all labels will be removed from the issue. |

## Usage

```yaml
name: 'Remove all PR labels'
on:
  pull_request:
    types: [closed]

jobs:
  remove-labels:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: blinkist/action-remove-pr-labels@main
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
