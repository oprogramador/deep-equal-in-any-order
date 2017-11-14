module.exports = (chai, utils) => {
  const { Assertion } = chai;
  utils.addMethod(Assertion.prototype, 'equalInAnyOrder', () => {});
};
