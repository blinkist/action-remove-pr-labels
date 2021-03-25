import { expect } from 'chai';

describe('index', () => {
  it('foo !== bar', () => {
    expect('foo').to.not.equal('bar');
  });
});