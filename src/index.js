import mapValues from 'lodash.mapvalues';
import sortAny from 'sort-any';

const sortDeep = (object) => {
  if (!Array.isArray(object)) {
    // == null checks for undefined as well as null.
    if (object == null || (typeof object !== 'object')) {
      return object;
    }

    try {
      return mapValues(object, sortDeep);
    } catch {
      return object;
    }
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
};
