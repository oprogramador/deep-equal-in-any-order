const expect = require('deep-equal-in-any-order/tests/expect');

describe('equalInAnyOrder', () => {
  it('matches true with true', () => {
    expect(true).to.deep.equalInAnyOrder(true);
  });

  it('matches false with false', () => {
    expect(false).to.deep.equalInAnyOrder(false);
  });

  it('does not match false with true', () => {
    expect(false).to.not.deep.equalInAnyOrder(true);
  });

  it('matches null with null', () => {
    expect(null).to.deep.equalInAnyOrder(null);
  });

  it('matches zero with zero', () => {
    expect(0).to.deep.equalInAnyOrder(0);
  });

  it('matches positive number with the same number', () => {
    expect(7).to.deep.equalInAnyOrder(7);
  });

  it('does not match different numbers', () => {
    expect(7).to.not.deep.equalInAnyOrder(2);
  });

  it('matches empty string with empty string', () => {
    expect('').to.deep.equalInAnyOrder('');
  });

  it('matches non-empty string with the same string', () => {
    expect('foo').to.deep.equalInAnyOrder('foo');
  });

  it('does not match different strings', () => {
    expect('foo').to.not.deep.equalInAnyOrder('bar');
  });

  it('matches empty object with empty object', () => {
    expect({}).to.deep.equalInAnyOrder({});
  });

  it('matches empty array with empty array', () => {
    expect([]).to.deep.equalInAnyOrder([]);
  });

  it('does not match empty object with empty array', () => {
    expect({}).to.not.deep.equalInAnyOrder([]);
  });

  it('does not match empty array with empty object', () => {
    expect([]).to.not.deep.equalInAnyOrder({});
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
    expect(a).to.deep.equalInAnyOrder(b);
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
    expect(a).to.deep.equalInAnyOrder(b);
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
    expect(a).to.not.deep.equalInAnyOrder(b);
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
    expect(a).to.deep.equalInAnyOrder(b);
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
    expect(a).to.deep.equalInAnyOrder(b);
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
    expect(a).to.deep.equalInAnyOrder(b);
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
    expect(a).to.deep.equalInAnyOrder(b);
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
    expect(a).to.deep.equalInAnyOrder(b);
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
    expect(a).to.not.deep.equalInAnyOrder(b);
  });
});
