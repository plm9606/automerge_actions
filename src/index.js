const core = require("@actions/core");
const github = require("@actions/github");
const { Toolkit } = require("actions-toolkit");
const tools = new Toolkit();

async function autoMerge() {
  try {
    const labelName = core.getInput("label-name");

    console.log(`context.repo: ${JSON.stringify(context.repo)}`);
    console.log(` tools.context.ref: \n${JSON.stringify(tools.context.ref)}`);
    const ref = tools.context.ref;
    const pull_number = Number(ref.split("/")[2]);
    const reviews = await tools.github.pulls.listReviews({
      ...context.repo,
      pull_number
    });
    const pr = await tools.github.pulls.get({
      ...context.repo,
      pull_number
    });

    const labels = pr.data.labels;
    const hasAutomerge = labels.some(label => label.name === labelName);
    console.log("result is", hasAutomerge);

    if (hasAutomerge) {
      if (reviews.data.length <= 0) throw "### You need to get other's review!";
      else
        tools.github.pulls.merge({
          ...context.repo,
          pull_number
        });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

autoMerge();
