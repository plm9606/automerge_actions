# Automatically Merge PR Actions
A GitHub Action to merge PR Autometically.
If you put a specific label, the action will then check the number of reviews in PR.
If the number of reviews is more than one, the PR is automatically merged.
If you put other lables, the action will be passed.

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
    runs-on: [ubuntu-latest]
    steps:
    - name: Automatically Merge PR
      uses: plm9606/automerge_actions@1.0.0
      with:
        # The PR label name you want to use when merge PR automatically.
        label-name: # If you don't write it, default is automerge
        # GitHub WebHook Secret Token
        github-token: ${{ secrets.GITHUB_TOKEN }}
```

## inputs
### 1. label-name

  It is not required.(default is `automerge`)
  
  You must put a label with this name. The action will then check the number of reviews in PR.
  
### 2. github-token

  Required.
  You have to get `Personal access token` from GitHub. And create GitHub secrets in your repo.([How to?](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets))
  
  The secret name may be different from the example above.
  
  ## Log Messages
  `Success Merge PR!`: Success merge automatically.
  
  `You don't labeled auto merge label::"${labelName}"`: If you intend to merge automatically, check the merge label name.
  
  `You need to get other's review!` : Error. You must receive at least one review. 
