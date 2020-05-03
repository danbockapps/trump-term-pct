import * as functions from 'firebase-functions'
import { runFakeNews } from './functions'

export const run = functions.pubsub
  .schedule('11 3,6,10,12,14,17,19 * * *')
  .timeZone('America/New_York')
  .onRun(runFakeNews)
