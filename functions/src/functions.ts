import { getLatestTweet, saveAllTweets } from './firestore'
import { searchLatest, sendTweet } from './tweet'

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

  console.log(tweetResult)
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
