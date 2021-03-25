import * as github from '@actions/github';
import * as core from '@actions/core';

const execute = async (): Promise<void> => {
  core.info('Hello, World!');
};

execute();