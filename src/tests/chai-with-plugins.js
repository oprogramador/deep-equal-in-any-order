const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiSubset = require('chai-subset');
const chaiRoughly = require('chai-roughly-v2');
const dirtyChai = require('dirty-chai');
const sinonChai = require('sinon-chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order/index');

chai.use(chaiSubset);
chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(deepEqualInAnyOrder);
chai.use(chaiRoughly);
chai.use(dirtyChai);

const { assert, expect } = chai;

module.exports = { assert, expect };
