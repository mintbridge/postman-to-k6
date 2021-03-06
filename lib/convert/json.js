const { ParseError } = require('../error')
const convertObject = require('./object')
const stripJsonComments = require('strip-json-comments')

async function convertJson (collectionJson, {
  globals,
  environment,
  csv,
  json,
  iterations,
  id
} = {}) {
  let collection
  const options = { csv, json, iterations, id }
  try {
    collection = JSON.parse(stripJsonComments(collectionJson))
  } catch (e) {
    throw new ParseError(e, 'Failed to parse collection JSON')
  }
  if (globals) {
    try {
      options.globals = JSON.parse(stripJsonComments(globals))
    } catch (e) {
      throw new ParseError(e, 'Failed to parse globals JSON')
    }
  }
  if (environment) {
    try {
      options.environment = JSON.parse(stripJsonComments(environment))
    } catch (e) {
      throw new ParseError(e, 'Failed to parse environment JSON')
    }
  }
  return convertObject(collection, options)
}

module.exports = convertJson
