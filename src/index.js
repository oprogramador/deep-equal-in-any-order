import mapValues from 'lodash.mapvalues';
import sortAny from 'sort-any';

const sortDeep = (object) => {
  if (object instanceof Set) {
    return sortAny([...object]);
  }
  if (object instanceof Map) {
    return sortAny([...object]);
  }
  if (Array.isArray(object)) {
    return sortAny(object.map(sortDeep));
  }
  if (typeof object !== 'object' || object === null || object instanceof Date) {
    return object;
  }

  return mapValues(object, sortDeep);
};

module.exports = (chai, utils) => {
  const { Assertion } = chai;
  utils.addMethod(Assertion.prototype, 'equalInAnyOrder', function equalInAnyOrder(b, m) {
    const a = utils.flag(this, 'object');
    utils.flag(this, 'object', sortDeep(a));
    this.equal(sortDeep(b), m);
  });

  chai.assert.deepEqualInAnyOrder = (actual, expected, message) => chai.expect(actual)
    .to.deep.equalInAnyOrder(expected, message);
  chai.assert.notDeepEqualInAnyOrder = (actual, expected, message) => chai.expect(actual)
    .to.not.deep.equalInAnyOrder(expected, message);
};
