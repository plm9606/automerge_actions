const core = require("@actions/core");
const github = require("@actions/github");
const { Toolkit } = require("actions-toolkit");
const tools = new Toolkit();

async function autoMerge() {
  try {
    const labelName = core.getInput("label-name");
    const reviewersNumber = core.getInput("reviewers-number");
    const merge_method = core.getInput("merge-method");
    const autoDelete = core.getInput("auto-delete");
    const myToken = core.getInput("github-token");
    const octokit = new github.GitHub(myToken);

    const ref = tools.context.ref;
    const pull_number = Number(ref.split("/")[2]);

    const reviews = await octokit.pulls.listReviews({
      ...github.context.repo,
      pull_number,
    });
    const pr = await octokit.pulls.get({
      ...github.context.repo,
      pull_number,
    });

    const labels = pr.data.labels;
    const hasAutomerge = labels.some((label) => label.name === labelName);

    if (hasAutomerge) {
      if (reviews.data.length >= +reviewersNumber) {
        octokit.pulls.merge({
          ...github.context.repo,
          pull_number,
          merge_method,
        });
        core.info(`Success Merge PR!`);
      } else throw Error("You need to get other's review!");
    } else core.info(`You don't labeled auto merge label::"${labelName}"`);

    if (autoDelete.toUpperCase() === "TRUE") {
      core.info("The Bot will remove merged branch.");
      octokit.git.deleteRef({
        ...github.context.repo,
        ref,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

autoMerge();
