import spies from 'chai-spies';
import chai, { expect } from 'chai';
import * as github from '@actions/github';

chai.use(spies);

describe('index.ts', () => {
  beforeEach(() => {
    process.env['GITHUB_REPOSITORY'] = 'test/test-repo';
    process.env['INPUT_GITHUB_TOKEN'] = 'test-token';
    process.env['NODE_ENV'] = 'test';
  });

  afterEach(() => {
    chai.spy.restore(github);
    delete require.cache[require.resolve('../src/index')];
  });

  it('removes all labels from repository', (): Promise<void> => {
    const removeAllLabels = chai.spy();
    chai.spy.on(github, 'getOctokit', () => ({ issues: { removeAllLabels } }));

    return import('../src/index')
      .then(() => {
        expect(removeAllLabels).to.have.been.called();
      });
  });

  it('removes \'wip\' label from repository', (): Promise<void> => {
    process.env['INPUT_LABELS'] = 'wip';

    const removeLabel = chai.spy();
    chai.spy.on(github, 'getOctokit', () => ({ issues: { removeLabel } }));

    return import('../src/index')
      .then(() => {
        expect(removeLabel).to.have.been.called();
      });
  });
});