import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chai from 'chai';
const expect = chai.expect;

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
let minify = require('html-minifier').minify;


import {statement, htmlStatement} from '../src/statement';
describe('Bill', () => {
  let invoice = null;
  let plays = null;

  beforeEach('Read in the invoice and plays objects', async()=>{
    invoice = await readInJSON('data/invoice.json');
    plays = await readInJSON('data/plays.json');
  });

  it('returns a text bill string', async () => {
    let actual = statement(invoice, plays);
    let expected = await readFile('data/expected.txt', 'utf8');
    expect(actual).to.be.equal(expected);
  });
  it('returns a html bill string', async () => {
    let actual = htmlStatement(invoice, plays);
    let expected = await readFile('data/expected.html', 'utf8');
    expect(minifyHtml(actual)).to.be.equal(minifyHtml(expected));
  });
});

async function readInJSON(invoice) {
  return JSON.parse(await readFile(invoice, 'utf8'));
}

function minifyHtml(str){
  minify(str, {
    collapseWhitespace: true
  });
}
