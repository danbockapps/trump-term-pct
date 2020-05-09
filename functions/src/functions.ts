import moment from 'moment'
import { getLatestTweet, saveAllTweets, saveTweet } from './firestore'
import { getData, getRecordHighClose } from './stocks'
import { searchLatest, sendTweet, Tweet } from './tweet'

export const runSP500 = async () => {
  const data = await getData()
  const recordHigh = getRecordHighClose(data)
  const today = data[data.length - 1]

  const tweetResult: Tweet = await sendTweet(
    `The S&P 500 closed at ${Math.round(today.close)}. That's down ${
      Math.round((1000 * (recordHigh.close - today.close)) / recordHigh.close) /
      10
    }% from the record high of ${Math.round(recordHigh.close)} on ${moment(
      recordHigh.timestamp,
    ).format('LL')}.`,
  )

  await saveTweet(tweetResult)
}

export const runFakeNews = async () => {
  const results = await searchLatest('from:realdonaldtrump "fake news"')
  console.log(results)

  const saveTweetsResult = await saveAllTweets(results)
  console.log(saveTweetsResult)

  const latestTweet = await getLatestTweet()
  console.log(latestTweet)

  const tweetResult = await sendTweet(
    `It's been ${dateDiff(
      latestTweet.date,
    )} since Donald Trump last tweeted about "Fake News".`,
    'realDonaldTrump',
    latestTweet.id,
  )

  await saveTweet(tweetResult)
}

export const dateDiff = (date1: Date, date2?: Date) => {
  if (!date2) date2 = new Date()
  const timeDiff = date2.getTime() - date1.getTime()

  if (timeDiff > 1000 * 60 * 60 * 24 * 2)
    return `${Math.floor(timeDiff / (1000 * 60 * 60 * 24))} days`
  else if (timeDiff > 1000 * 60 * 60 * 24) return '1 day'
  else if (timeDiff > 1000 * 60 * 60 * 2)
    return `${Math.floor(timeDiff / (1000 * 60 * 60))} hours`
  else if (timeDiff > 1000 * 60 * 60) return '1 hour'
  else if (timeDiff > 1000 * 60)
    return `${Math.floor(timeDiff / (1000 * 60))} minutes`
  else return '0 minutes'
}
