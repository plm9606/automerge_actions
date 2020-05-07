[ENG 🇺🇸](#Automatically-Merge-PR-Actions) / [한국어 🇰🇷](#자동-머지-Actions)

# Automatically Merge PR Actions

A GitHub Action to automatically merge Pull Requests.

If you add a specific label, the action will then check the number of reviews.

If the number of reviews is more than one, the PR is automatically merged.

If you add other lables, the action will be passed.

<!-- Screenshot -->

# Usage

Create a `.github/workflows/${YOUR_WORKFLOW_NAME}.yml` file in your GitHub repo and add the following code.

```yml
name: Check PR can be merged
on:
  pull_request:
    types: [labeled]
    branches:
      - develop/* # The branch you want to automatically merge pull request
jobs:
  Run Actions:
    runs-on: ubuntu-latest
    steps:
      - name: Automatically Merge PR
        uses: plm9606/automerge_actions@1.1.0
        with:
          # The label name to automatically merge. Default is "automerge".
          label-name:
          # The number of reviewers to automatically merge. Default is 1.
          reviewers-number:
          # GitHub WebHook Secret Token
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

### 1. label-name

Not required, default is `automerge`.

The label name the action uses to merge, before checking for reviews.

### 2. reviewers-number

Not required, default is `1`.

The number of reviewers the action uses to merge, after checking the label.

### 3. github-token

Required.
You have to get `Personal access token` from GitHub. And create GitHub secrets in your repo.([How to?](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets))

The secret name may be different from the example above.

## Log Messages

`Success Merge PR!`: Success merge automatically.

`You don't labeled auto merge label::"${labelName}"`: If you intend to merge automatically, check the merge label name.

`You need to get other's review!` : Error. You must receive PR review(s).

# 자동 머지 Actions

PR에 특정 라벨을 달게 되면 해당 PR에 달린 리뷰의 수를 확인합니다.

설정한 수 이상의 리뷰가 달릴 경우 자동으로 풀리퀘스트가 머지됩니다.

action에서 설정하지 않은 라벨을 달게되면 스킵됩니다.

<!-- Screenshot -->

# 사용법

`.github/workflows/${YOUR_WORKFLOW_NAME}.yml` 에 아래와 같이 액션 설정 스크립트를 작성합니다.

```yml
name: Check PR can be merged
on:
  pull_request:
    types: [labeled]
    branches:
      - develop/* # 해당 기능을 사용하고 싶은 브랜치를 정의합니다
jobs:
  Run Actions:
    runs-on: ubuntu-latest
    steps:
      - name: Automatically Merge PR
        uses: plm9606/automerge_actions@1.1.0
        with:
          # 이벤트를 트리거하고 싶은 라벨 이름을 설정합니다. 기본 이름은 "automerge" 입니다.
          label-name:
          # 최소 리뷰어 수를 지정할 수 있습니다. 기본은 1명입니다.
          reviewers-number:
          # GitHub WebHook Secret Token
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

### 1. label-name

Not required, default is `automerge`.

자동 머지 이벤트를 트리거하기 위한 라벨 이름입니다.

### 2. reviewers-number

Not required, default is `1`.

리뷰어의 수를 지정합니다.

### 3. github-token

**Required.**

깃허브의 `Personal access token` 가 필요합니다. 그리고 해당 토큰을 사용하고자 하는 레포의 secrets로 등록해주어야 합니다.([How to?](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets))

## Log Messages

`Success Merge PR!`: 성공적으로 머지가 되었습니다

`You don't labeled auto merge label::"${labelName}"`: 머지 라벨로 설정한 라벨이 달려있지 않을 경우 나타납니다. 해당 액션을 사용하고자 한 것이었다면 라벨을 달아주어야 합니다.

`You need to get other's review!` : 리뷰수가 부족합니다.
