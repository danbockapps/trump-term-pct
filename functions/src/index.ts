import * as functions from 'firebase-functions'
import { runFakeNews, runSP500 } from './functions'

export const fakeNews = functions.pubsub
  .schedule('0 10,22 * * *')
  .timeZone('America/New_York')
  .onRun(runFakeNews)

export const sp500 = functions.pubsub
  .schedule('3 16 * * 1-5')
  .timeZone('America/New_York')
  .onRun(runSP500)
