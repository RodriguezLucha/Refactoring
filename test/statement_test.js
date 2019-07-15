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
  it('returns a text bill string', async () => {
    let invoice = await readFile('data/invoice.json', 'utf8');
    let plays = await readFile('data/plays.json', 'utf8');
    invoice = JSON.parse(invoice);
    plays = JSON.parse(plays);
    let actual = statement(invoice, plays);
    let expected = await readFile('data/expected.txt', 'utf8');
    expect(actual).to.be.equal(expected);
  });
  it('returns a html bill string', async () => {
    let invoice = await readFile('data/invoice.json', 'utf8');
    let plays = await readFile('data/plays.json', 'utf8');
    invoice = JSON.parse(invoice);
    plays = JSON.parse(plays);
    let actual = htmlStatement(invoice, plays);
    let expected = await readFile('data/expected.html', 'utf8');
    expect(minifyHtml(actual)).to.be.equal(minifyHtml(expected));
  });
});

function minifyHtml(str){
  minify(str, {
    collapseWhitespace: true
  });
}