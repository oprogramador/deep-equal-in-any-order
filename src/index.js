import mapValues from 'lodash.mapvalues';
import sortAny from 'sort-any';

const sortDeep = (object) => {
  if (!Array.isArray(object)) {
    if (typeof object !== 'object' || object === null || object instanceof Date) {
      return object;
    }

    return mapValues(object, sortDeep);
  }

  return sortAny(object.map(sortDeep));
};

module.exports = (chai, utils) => {
  const { Assertion } = chai;
  utils.addMethod(Assertion.prototype, 'equalInAnyOrder', function equalInAnyOrder(b, m) {
    const a = this.__flags.object;
    const { negate, message } = this.__flags;

    const msg = m || message;

    if (negate) {
      new Assertion(sortDeep(a), msg).to.not.deep.equal(sortDeep(b));
    } else {
      new Assertion(sortDeep(a), msg).to.deep.equal(sortDeep(b));
    }
  });

  chai.assert.deepEqualInAnyOrder = (actual, expected, message) => chai.expect(actual).to.deep.equalInAnyOrder(expected);
  chai.assert.notDeepEqualInAnyOrder = (actual, expected, message) => chai.expect(actual).to.not.deep.equalInAnyOrder(expected);
};
