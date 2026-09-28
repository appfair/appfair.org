import { defaults, steps } from './submission.mjs';
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
    command: `gh release view v0.1.2 --repo Orbit-Notes/Orbit-Notes
gh release view v0.1.2 --repo Orbit-Notes/Orbit-Notes \\
  --json assets --jq '.assets[].name'` },
  { id: 'web', title: 'GitHub website', text: 'Open the release created by CI.',
    operations: [['Open v0.1.2', 'https://github.com/Orbit-Notes/Orbit-Notes/releases/tag/v0.1.2']],
    instructions: ['Expand Assets beneath the release notes.', 'Check the package and screenshot files against the list below.'] },
];

export const notesMethods = [
  { id: 'gh', title: 'GitHub CLI', text: 'Write your notes in release-notes.md, then update the existing release.',
    command: `gh release edit v0.1.2 --repo Orbit-Notes/Orbit-Notes \\
  --notes-file release-notes.md` },
  { id: 'web', title: 'GitHub website', text: 'Edit the release that CI created.',
    operations: [['Open v0.1.2', 'https://github.com/Orbit-Notes/Orbit-Notes/releases/tag/v0.1.2']],
    instructions: ['Select the pencil icon to edit the release.', 'Update the release notes, keep the pre-release status, and save with Update release.'] },
];

// Keep the first-submission alternatives identical to Getting started.
export const firstSubmissionMethods = steps({ ...defaults, title: 'Field Notes' }).find(step => step.id === 'submit').methods;

export const updateMethods = [
  { id: 'gh', title: 'GitHub CLI', text: 'Open the catalog pull request from the branch you pushed.',
    command: `GH_USER=$(gh api user --jq .login)
gh pr create --repo appfair/appfair-apps --base main \\
  --head "$GH_USER:update-Orbit-Notes-v0.1.2" \\
  --title 'Update Field Notes to v0.1.2' \\
  --body 'Release: https://github.com/Orbit-Notes/Orbit-Notes/releases/tag/v0.1.2'` },
  { id: 'web', title: 'GitHub website', text: 'Open your catalog fork on GitHub after pushing the update branch.',
    instructions: ['Select Compare & pull request for update-Orbit-Notes-v0.1.2.', 'Set the base repository to appfair/appfair-apps and base branch to main.', 'Describe the changes, link the v0.1.2 app release, and create the pull request.'] },
];
