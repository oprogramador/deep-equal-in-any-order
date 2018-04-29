import _ from 'lodash';
import sortAny from 'sort-any';

const sortDeep = (object) => {
  if (!Array.isArray(object)) {
    if (!(typeof object === 'object') || object === null) {
      return object;
    }

    return _.mapValues(object, sortDeep);
  }

  return sortAny(object.map(sortDeep));
};

module.exports = (chai, utils) => {
  const { Assertion } = chai;
  utils.addMethod(Assertion.prototype, 'equalInAnyOrder', function equalInAnyOrder(b) {
    const a = this.__flags.object;
    const { negate } = this.__flags;
    if (negate) {
      new Assertion(sortDeep(a)).to.not.deep.equal(sortDeep(b));
    } else {
      new Assertion(sortDeep(a)).to.deep.equal(sortDeep(b));
    }
  });
};
