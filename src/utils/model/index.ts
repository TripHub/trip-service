const randomstring = require('randomstring')
const moment = require('moment')
import { Model } from 'objection'

/**
 * Sets the PID field to a random string on creation.
 */
export class PidModel extends Model {
  /**
   * Set the PID on create
   */
  async $beforeInsert (queryContext) {
    await super.$beforeInsert(queryContext)
    // @ts-ignore
    this.pid = randomstring.generate(11)  
  }
}

/**
 * Updates the timestamps on insert and update.
 */
export class TimestampModel extends Model {
  async $beforeInsert (queryContext) {
    await super.$beforeInsert(queryContext)
    // @ts-ignore
    this.created_at = moment.utc().toISOString()
    // @ts-ignore
    this.updated_at = moment.utc().toISOString()
  }

  async $beforeUpdate (opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)
    // @ts-ignore
    this.updated_at = moment.utc().toISOString()
  }
}

/**
 * Updates the timestamps on insert and update and sets pid.
 */
export class PidTimestampModel extends Model {
  $beforeInsert () {
    // @ts-ignore
    this.pid = randomstring.generate(11)
    // @ts-ignore
    this.created_at = moment.utc().toISOString()
    // @ts-ignore
    this.updated_at = moment.utc().toISOString()
  }

  async $beforeUpdate (queryContext) {
    await super.$beforeInsert(queryContext)
    // @ts-ignore
    this.updated_at = moment.utc().toISOString()
  }
}
