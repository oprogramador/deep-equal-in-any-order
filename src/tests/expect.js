const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiSubset = require('chai-subset');
const dirtyChai = require('dirty-chai');
const sinonChai = require('sinon-chai');

chai.use(chaiSubset);
chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(dirtyChai);

const { expect } = chai;

module.exports = expect;
