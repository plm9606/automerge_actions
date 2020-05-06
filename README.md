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
      - develop/*       # The branch you want to automatically merge pull request
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
