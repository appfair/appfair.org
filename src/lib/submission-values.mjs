// Display values shared by server-rendered prose and live checklist edits.
export function guideValues(values) {
  const repo = `${values.token}/${values.token}`;
  return { ...values, repo, repoUrl: `https://github.com/${repo}`, pagesUrl: `https://github.com/${repo}/settings/pages`, catalogFile: `apps/${values.token}.yaml` };
}
