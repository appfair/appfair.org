// Alternative GitHub operations for the Releases & updates guide. These are display-only.
export const ciMethods = [
  { id: 'gh', title: 'GitHub CLI', text: 'List recent runs and check the run for your tag.',
    command: 'gh run list --repo Orbit-Notes/Orbit-Notes --workflow ci.yml --limit 5' },
  { id: 'web', title: 'GitHub website', text: 'Open Actions and select the CI run for your release tag.',
    operations: [['Open Actions', 'https://github.com/Orbit-Notes/Orbit-Notes/actions/workflows/ci.yml']],
    instructions: ['Check that the run uses the intended tag and commit.', 'Wait for the build, tests and asset uploads to finish. Open any failed job to read its logs.'] },
];

export const assetMethods = [
  { id: 'gh', title: 'GitHub CLI', text: 'Inspect the release and list its assets.',
    command: `gh release view v0.2.0 --repo Orbit-Notes/Orbit-Notes
gh release view v0.2.0 --repo Orbit-Notes/Orbit-Notes \\
  --json assets --jq '.assets[].name'` },
  { id: 'web', title: 'GitHub website', text: 'Open the release created by CI.',
    operations: [['Open v0.2.0', 'https://github.com/Orbit-Notes/Orbit-Notes/releases/tag/v0.2.0']],
    instructions: ['Expand Assets beneath the release notes.', 'Check the package and screenshot files against the list below.'] },
];

export const notesMethods = [
  { id: 'gh', title: 'GitHub CLI', text: 'Write your notes in release-notes.md, then update the existing release.',
    command: `gh release edit v0.2.0 --repo Orbit-Notes/Orbit-Notes \\
  --notes-file release-notes.md` },
  { id: 'web', title: 'GitHub website', text: 'Edit the release that CI created.',
    operations: [['Open v0.2.0', 'https://github.com/Orbit-Notes/Orbit-Notes/releases/tag/v0.2.0']],
    instructions: ['Select the pencil icon to edit the release.', 'Update the release notes, keep the pre-release status, and save with Update release.'] },
];

const prepareSubmission = `git fetch upstream main
git switch -c add-Orbit-Notes-v0.1.0 upstream/main
python3 -m venv ../appfair-submit-venv
../appfair-submit-venv/bin/python -m pip install PyYAML
../appfair-submit-venv/bin/python scripts/queue.py add Orbit-Notes --tag v0.1.0
../appfair-submit-venv/bin/python scripts/queue.py validate apps/Orbit-Notes.yaml
cat apps/Orbit-Notes.yaml
git add apps/Orbit-Notes.yaml
git diff --cached
git commit -m 'Add Field Notes v0.1.0'
git push -u origin HEAD`;

export const firstSubmissionMethods = [
  { id: 'gh', title: 'GitHub CLI', text: 'With gh authenticated, fork the catalog, prepare the submission, and open a pull request. Review the generated file before committing.',
    command: `gh repo fork appfair/appfair-apps --clone --remote -- appfair-submission
cd appfair-submission
${prepareSubmission}
GH_USER=$(gh api user --jq .login)
gh pr create --repo appfair/appfair-apps --base main \\
  --head "$GH_USER:add-Orbit-Notes-v0.1.0" \\
  --title 'Add Field Notes v0.1.0' \\
  --body 'Release: https://github.com/Orbit-Notes/Orbit-Notes/releases/tag/v0.1.0'`,
    instructions: ['Add the first-app discussion link to the pull request description.'] },
  { id: 'web', title: 'GitHub website', text: 'Create a personal fork, then run the Git commands below. Replace YOUR-LOGIN with your GitHub username and configure Git HTTPS credentials or SSH access before pushing.',
    operations: [['Fork the catalog', 'https://github.com/appfair/appfair-apps/fork']],
    command: `git clone https://github.com/YOUR-LOGIN/appfair-apps.git appfair-submission
cd appfair-submission
git remote add upstream https://github.com/appfair/appfair-apps.git
${prepareSubmission}`,
    instructions: ['Open your fork on GitHub and select Compare & pull request.', 'Set the base repository to appfair/appfair-apps, base branch to main, and head branch to add-Orbit-Notes-v0.1.0.', 'Link the app release and first-app discussion in the description, then create the pull request.'] },
];

export const updateMethods = [
  { id: 'gh', title: 'GitHub CLI', text: 'Open the catalog pull request from the branch you pushed.',
    command: `GH_USER=$(gh api user --jq .login)
gh pr create --repo appfair/appfair-apps --base main \\
  --head "$GH_USER:update-Orbit-Notes-v0.2.0" \\
  --title 'Update Field Notes to v0.2.0' \\
  --body 'Release: https://github.com/Orbit-Notes/Orbit-Notes/releases/tag/v0.2.0'` },
  { id: 'web', title: 'GitHub website', text: 'Open your catalog fork on GitHub after pushing the update branch.',
    instructions: ['Select Compare & pull request for update-Orbit-Notes-v0.2.0.', 'Set the base repository to appfair/appfair-apps and base branch to main.', 'Describe the changes, link the v0.2.0 app release, and create the pull request.'] },
];
