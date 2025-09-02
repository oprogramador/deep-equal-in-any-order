const { assert, expect } = require('deep-equal-in-any-order/tests/chai-with-plugins');

const expectToDeepEqualInAnyOrder = (a, b) => {
  expect(a).to.deep.equalInAnyOrder(b);
  expect(() => expect(a).to.not.deep.equalInAnyOrder(b, 'TEST')).to.throw(/^TEST: /);

  assert.deepEqualInAnyOrder(a, b);
  assert.throws(() => assert.notDeepEqualInAnyOrder(a, b, 'TEST'), /^TEST: /);
};

const expectToNotDeepEqualInAnyOrder = (a, b) => {
  expect(a).to.not.deep.equalInAnyOrder(b);
  expect(() => expect(a).to.deep.equalInAnyOrder(b, 'TEST')).to.throw(/^TEST: /);

  assert.notDeepEqualInAnyOrder(a, b);
  assert.throws(() => assert.deepEqualInAnyOrder(a, b, 'TEST'), /^TEST: /);
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

  it('does not match null with empty object', () => {
    expectToNotDeepEqualInAnyOrder(null, {});
  });

  it('does not match a date with empty object', () => {
    expectToNotDeepEqualInAnyOrder(new Date('2021-01-01'), {});
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

  it('matches same empty sets', () => {
    const a = new Set([]);
    const b = new Set([]);
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('matches same sets', () => {
    const a = new Set([1, 20]);
    const b = new Set([20, 1]);
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match different sets', () => {
    const a = new Set([1, 5]);
    const b = new Set([1, 3]);
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('matches same set nested inside another set', () => {
    const a = new Set([1, new Set([3, 4, 100, 20])]);
    const b = new Set([new Set([100, 3, 4, 20]), 1]);
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match a different set nested inside another set', () => {
    const a = new Set([1, new Set([3, 4, 21])]);
    const b = new Set([new Set([3, 4, 20]), 1]);
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('matches same empty maps', () => {
    const a = new Map([]);
    const b = new Map([]);
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('matches same maps', () => {
    const a = new Map([['a', 1], ['b', 3]]);
    const b = new Map([['a', 1], ['b', 3]]);
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('matches same maps nested', () => {
    const a = { x: new Map([['a', 1], ['b', 3]]), y: new Map([['c', 5]]) };
    const b = { x: new Map([['a', 1], ['b', 3]]), y: new Map([['c', 5]]) };
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('matches same maps nested inside another map', () => {
    const a = { x: new Map([['a', 1], [new Map([['c', 25]]), new Map([['c', 5]])]]), y: new Map([['c', 5]]) };
    const b = { x: new Map([['a', 1], [new Map([['c', 25]]), new Map([['c', 5]])]]), y: new Map([['c', 5]]) };
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match different maps nested inside another map - as a key', () => {
    const a = { x: new Map([['a', 1], [new Map([['c', 20]]), new Map([['c', 5]])]]), y: new Map([['c', 5]]) };
    const b = { x: new Map([['a', 1], [new Map([['c', 25]]), new Map([['c', 5]])]]), y: new Map([['c', 5]]) };
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('does not match different maps nested inside another map - as a value', () => {
    const a = { x: new Map([['a', 1], [new Map([['c', 25]]), new Map([['c', 5]])]]), y: new Map([['c', 5]]) };
    const b = { x: new Map([['a', 1], [new Map([['c', 25]]), new Map([['c', 50]])]]), y: new Map([['c', 5]]) };
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('does not match different maps', () => {
    const a = new Map([['a', 1], ['b', 3]]);
    const b = new Map([['a', 1], ['b', 2]]);
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('does not match different maps nested', () => {
    const a = { x: new Map([['a', 1], ['b', 3]]), y: new Map([['c', 5]]) };
    const b = { x: new Map([['a', 1], ['b', 0]]), y: new Map([['c', 5]]) };
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('matches same set nested inside a map', () => {
    const a = { x: new Map([[new Set('a0'), 1], ['b', 3]]), y: new Map([['c', 5]]) };
    const b = { x: new Map([[new Set('a0'), 1], ['b', 3]]), y: new Map([['c', 5]]) };
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match a different set nested inside a map', () => {
    const a = { x: new Map([[new Set('a'), 1], ['b', 3]]), y: new Map([['c', 5]]) };
    const b = { x: new Map([[new Set('a0'), 1], ['b', 3]]), y: new Map([['c', 5]]) };
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('matches same map nested inside a set ', () => {
    const a = { x: new Set([123, new Map([[new Set('a0'), 1], ['b', 3]])]), y: new Map([['c', 5]]) };
    const b = { x: new Set([new Map([[new Set('a0'), 1], ['b', 3]]), 123]), y: new Map([['c', 5]]) };
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match different map (different value) nested inside a set', () => {
    const a = { x: new Set([123, new Map([[new Set('a0'), 1], ['b', 3]])]), y: new Map([['c', 5]]) };
    const b = { x: new Set([new Map([[new Set('a0'), 1], ['b', 30]]), 123]), y: new Map([['c', 5]]) };
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('does not match different map (different key) nested inside a set', () => {
    const a = { x: new Set([123, new Map([[new Set('a0'), 1], ['b', 3]])]), y: new Map([['c', 5]]) };
    const b = { x: new Set([new Map([[new Set('a0'), 1], ['b0', 3]]), 123]), y: new Map([['c', 5]]) };
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('matches exact dates', () => {
    const a = new Date('2021-01-01');
    const b = new Date('2021-01-01');
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match distinct dates', () => {
    const a = new Date('2021-01-01');
    const b = new Date('2021-01-02');
    expectToNotDeepEqualInAnyOrder(a, b);
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

  it('matches same flat objects with different keys order, with a date', () => {
    const a = {
      foo: 'bar',
      foo2: 'bar2',
      foo3: new Date('2021-01-01'),
    };
    const b = {
      foo2: 'bar2',
      foo3: new Date('2021-01-01'),
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

  it('does not match flat objects with different dates', () => {
    const a = {
      foo: 'bar',
      foo2: new Date('2021-01-01'),
    };
    const b = {
      foo: 'bar',
      foo2: new Date('2021-01-02'),
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

  it('matches same flat arrays of dates in different order', () => {
    const a = [
      new Date('2021-01-01'),
      new Date('2021-01-02'),
    ];
    const b = [
      new Date('2021-01-02'),
      new Date('2021-01-01'),
    ];
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match flat arrays of different dates', () => {
    const a = [
      new Date('2021-01-01'),
      new Date('2021-01-02'),
    ];
    const b = [
      new Date('2021-01-01'),
      new Date('2021-01-01'),
    ];
    expectToNotDeepEqualInAnyOrder(a, b);
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
                new Map([['a', 1], ['b', 3]]),
                'foo10',
                'foo12',
                new Date('2021-01-01'),
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
                new Date('2021-01-01'),
                'foo11',
                'foo12',
                new Map([['a', 1], ['b', 3]]),
              ],
            },
          },
        ],
      },
    };
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('does not match same nested objects with different items order and different maps', () => {
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
                new Map([['a', 10], ['b', 3]]),
                'foo10',
                'foo12',
                new Date('2021-01-01'),
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
                new Date('2021-01-01'),
                'foo11',
                'foo12',
                new Map([['a', 1], ['b', 3]]),
              ],
            },
          },
        ],
      },
    };
    expectToNotDeepEqualInAnyOrder(a, b);
  });

  it('does not match same nested objects with different items order and different dates', () => {
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
                new Date('2021-01-01'),
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
                new Date('2021-01-02'),
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

  it('prepends message from expect', () => {
    expect(
      () => expect(true, 'message1').to.deep.equalInAnyOrder(false),
    ).to.throw().and.satisfy(e => /^message1:/.test(e.message));
  });

  it('prepends message from equalInAnyOrder', () => {
    expect(
      () => expect(true).to.deep.equalInAnyOrder(false, 'message1'),
    ).to.throw().and.satisfy(e => /^message1:/.test(e.message));
  });

  it('prefers message from chain over expect', () => {
    expect(
      () => expect(true, 'message1').to.deep.equalInAnyOrder(false, 'message2'),
    ).to.throw().and.satisfy(e => /^message2:/.test(e.message));
  });

  it('matches arrays of objects in different ordering', () => {
    const a = [{ foo: 'foo' }, { bar: 'bar' }];
    const b = [{ bar: 'bar' }, { foo: 'foo' }];
    expectToDeepEqualInAnyOrder(a, b);
  });

  it('works in combination with chai-roughly', () => {
    const a = {
      values: [122.9, 0],
    };
    const b = {
      values: [0, 123],
    };
    expect(a).to.roughly(0.1).to.deep.equalInAnyOrder(b);
  });

  it('works in combination with chai-roughly - negate', () => {
    const a = {
      values: [122.8, 0],
    };
    const b = {
      values: [0, 123],
    };
    expect(a).to.roughly(0.1).to.not.deep.equalInAnyOrder(b);
  });

  it('works in combination with chai-roughly - nested', () => {
    const a = {
      lorem: [
        {
          foo: {
            foo1: [122.9, 0],
          },
          bar: {
            bar1: [299.9, 0, 499.9, 199.9],
          },
        },
        9.9,
        5.1,
      ],
    };
    const b = {
      lorem: [
        5,
        10,
        {
          foo: {
            foo1: [0, 123],
          },
          bar: {
            bar1: [0, 500, 200, 300],
          },
        },
      ],
    };
    expect(a).to.roughly(0.2).to.deep.equalInAnyOrder(b);
  });
});
