import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chai from 'chai';
const expect = chai.expect;

//TODO: use consistent import style
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

import statement from '../src/statement';

describe('Bill', () => {
  it('returns a bill string', async () => {
    let invoice = await readFile('data/invoice.json', 'utf8');
    let plays = await readFile('data/plays.json', 'utf8');
    invoice = JSON.parse(invoice);
    plays = JSON.parse(plays);
    let actual = statement(invoice, plays);
    let expected = await readFile('data/expected.txt', 'utf8');
    expect(actual).to.be.equal(expected);
  });
});
