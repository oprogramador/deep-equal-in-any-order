const expect = require('deep-equal-in-any-order/tests/expect');

const expectToDeepEqualInAnyOrder = (a, b) => {
  expect(a).to.deep.equalInAnyOrder(b);
  expect(() => expect(a).to.not.deep.equalInAnyOrder(b)).to.throw();
};

const expectToNotDeepEqualInAnyOrder = (a, b) => {
  expect(a).to.not.deep.equalInAnyOrder(b);
  expect(() => expect(a).to.deep.equalInAnyOrder(b)).to.throw();
};

describe('equalInAnyOrder', () => {
  it('matches true with true', () => {
    expectToDeepEqualInAnyOrder(true, true);
  });

  it('matches false with false', () => {
    expectToDeepEqualInAnyOrder(false, false);
  });

  it('does not match false with true', () => {
    expectToNotDeepEqualInAnyOrder(false, true);
  });

  it('matches null with null', () => {
    expectToDeepEqualInAnyOrder(null, null);
  });

  it('matches zero with zero', () => {
    expectToDeepEqualInAnyOrder(0, 0);
  });

  it('matches positive number with the same number', () => {
    expectToDeepEqualInAnyOrder(7, 7);
  });

  it('does not match different numbers', () => {
    expectToNotDeepEqualInAnyOrder(7, 2);
  });

  it('matches empty string with empty string', () => {
    expectToDeepEqualInAnyOrder('', '');
  });

  it('matches non-empty string with the same string', () => {
    expectToDeepEqualInAnyOrder('foo', 'foo');
  });

  it('does not match different strings', () => {
    expectToNotDeepEqualInAnyOrder('foo', 'bar');
  });

  it('matches empty object with empty object', () => {
    expectToDeepEqualInAnyOrder({}, {});
  });

  it('matches empty array with empty array', () => {
    expectToDeepEqualInAnyOrder([], []);
  });

  it('does not match empty object with empty array', () => {
    expectToNotDeepEqualInAnyOrder({}, []);
  });

  it('does not match empty array with empty object', () => {
    expectToNotDeepEqualInAnyOrder([], {});
  });

  it('matches same flat objects', () => {
    const a = {
      foo: 'bar',
      foo2: 'bar2',
    };
    const b = {
      foo: 'bar',
      foo2: 'bar2',
    };
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('matches same flat objects with different keys order', () => {
    const a = {
      foo: 'bar',
      foo2: 'bar2',
    };
    const b = {
      foo2: 'bar2',
      foo: 'bar',
    };
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match different flat objects', () => {
    const a = {
      foo: 'bar',
      foo2: 'bar',
    };
    const b = {
      foo: 'bar',
      foo2: 'bar2',
    };
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('matches same flat arrays', () => {
    const a = [
      'foo',
      'bar',
    ];
    const b = [
      'foo',
      'bar',
    ];
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('matches same flat arrays in different order', () => {
    const a = [
      'foo',
      'bar',
    ];
    const b = [
      'bar',
      'foo',
    ];
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match different flat arrays', () => {
    const a = [
      'foo',
      'bar',
    ];
    const b = [
      'foo',
      'bar',
      'baz',
    ];
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('matches same nested objects', () => {
    const a = {
      foo: 'bar',
      foo2: {
        foo3: [
          'foo4',
          {
            foo5: 'bar5',
            foo6: 'bar6',
            foo7: {
              foo8: 'bar8',
              foo9: [
                'foo10',
                'foo11',
                'foo12',
              ],
            },
          },
        ],
      },
    };
    const b = {
      foo: 'bar',
      foo2: {
        foo3: [
          'foo4',
          {
            foo5: 'bar5',
            foo6: 'bar6',
            foo7: {
              foo8: 'bar8',
              foo9: [
                'foo10',
                'foo11',
                'foo12',
              ],
            },
          },
        ],
      },
    };
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('matches same nested objects with different items order', () => {
    const a = {
      foo: 'bar',
      foo2: {
        foo3: [
          {
            foo5: 'bar5',
            foo6: 'bar6',
            foo7: {
              foo8: 'bar8',
              foo9: [
                'foo11',
                'foo10',
                'foo12',
              ],
            },
          },
          'foo4',
        ],
      },
    };
    const b = {
      foo: 'bar',
      foo2: {
        foo3: [
          'foo4',
          {
            foo5: 'bar5',
            foo6: 'bar6',
            foo7: {
              foo8: 'bar8',
              foo9: [
                'foo10',
                'foo11',
                'foo12',
              ],
            },
          },
        ],
      },
    };
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match different nested objects', () => {
    const a = {
      foo: 'bar',
      foo2: {
        foo3: [
          'foo4',
          {
            foo5: 'bar5',
            foo6: 'bar6',
            foo7: {
              foo8: 'bar8',
              foo9: [
                'foo10',
                'foo11',
                'foo12',
              ],
            },
          },
        ],
      },
    };
    const b = {
      foo: 'bar',
      foo2: {
        foo3: [
          'foo4-different',
          {
            foo5: 'bar5',
            foo6: 'bar6',
            foo7: {
              foo8: 'bar8',
              foo9: [
                'foo10',
                'foo11',
                'foo12',
              ],
            },
          },
        ],
      },
    };
    expectToNotDeepEqualInAnyOrder(a, b);
  });
});
