/**
 * Logic for calling google's API.
 */

import { URL, URLSearchParams } from 'url'
import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

import { wrapAsync } from '../../utils/async'

/**
 * Search for a term based on a text query.
 * req.query should have
 *  - `query` as value of text to search;
 *  - `fields` as fields to return;
 * @param req 
 * @param res 
 */
export const placeSearch = wrapAsync(async (req: Request, res: Response) => {
    // get term from query string
    const { query, fields = 'formatted_address' } = req.query
    // basic validation
    if (!query) {
        return res.status(400).json({ message: 'query is required' })
    }
    // build google url
    const endpoint = new URL(
        'https://maps.googleapis.com/maps/api/place/findplacefromtext/json')
    endpoint.search = new URLSearchParams({
        key: process.env.GOOGLE_API_KEY,
        inputtype: 'textquery',
        fields,
        input: query,
    }).toString()

    try {
        // call endpoint
        const response = await axios.get(endpoint.href)
        // condition status on `response.data.status`
        const status = response.data.status === 'OK' ? 200 : 400
        // get either candidates or status message
        const data = status === 200
            ? response.data.candidates
            : { message: response.data.status }
        return res.status(status).json(data)
    } catch (err) {
        // all google responses return 200 for some reason, unless theres a
        // google server error, in which case defer to the default error handler
        throw Error(err)
    }
})
