const randomstring = require('randomstring')
import { Model } from 'objection'

/**
 * Sets the PID field to a random string on creation.
 */
export class PidModel extends Model {
  /**
   * Set the PID on create
   */
  $beforeInsert () {
    // @ts-ignore
    this.pid = randomstring.generate(11)  
  }
}

/**
 * Updates the timestamps on insert and update.
 */
export class TimestampModel extends Model {
  $beforeInsert () {
    // @ts-ignore
    this.created_at = new Date().toISOString()
    // @ts-ignore
    this.updated_at = new Date().toISOString()
  }

  $beforeUpdate () {
    // @ts-ignore
    this.updated_at = new Date().toISOString()
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
    this.created_at = new Date().toISOString()
    // @ts-ignore
    this.updated_at = new Date().toISOString()
  }

  $beforeUpdate () {
    // @ts-ignore
    this.updated_at = new Date().toISOString()
  }
}
