const randomstring = require('randomstring')

export const setPid = (model, attrs, options) => {
  // generate a random alphanumeric string of 11 chars
  const pid = randomstring.generate(11)
  // set pid on model before save
  return model.set({ pid })
}
