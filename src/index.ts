import * as github from '@actions/github';
import * as core from '@actions/core';

const execute = async (
  token: string,
  repo: string,
  owner: string,
  issueNumber: number,
  labels: string[]
): Promise<void> => {
  const client = github.getOctokit(token);

  try {
    if (labels.length !== 0) {
      for (const label of labels) {
        if (process.env['NODE_ENV'] !== 'test') {
          core.info(`Removing label '${label}' from ${owner}/${repo}:${issueNumber}`);
        }

        await client.issues.removeLabel({
          owner,
          repo,
          issue_number: issueNumber,
          name: label
        });
      }
    } else {
      if (process.env['NODE_ENV'] !== 'test') {
        core.info(`Removing all labels from ${owner}/${repo}:${issueNumber}`);
      }

      await client.issues.removeAllLabels({
        owner,
        repo,
        issue_number: issueNumber
      });
    }
  } catch (error) {
    if (process.env['NODE_ENV'] !== 'test') {
      core.error(error.message);
    }
  }
};

const labels = ((): string[] => {
  const input = core.getInput('LABELS', { required: false });
  return input === '' ? [] : input.split(',');
})();

const token = core.getInput('GITHUB_TOKEN', { required: true });
const { repo, owner } = github.context.repo;
const issueNumber = github.context.issue.number;

execute(token, repo, owner, issueNumber, labels);