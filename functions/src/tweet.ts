import Twitter from 'twitter-lite'
import { TweetDoc } from './firestore'
require('dotenv').config()

let twitter: Twitter

if (
  process.env.API_KEY &&
  process.env.API_SECRET_KEY &&
  process.env.ACCESS_TOKEN &&
  process.env.ACCESS_TOKEN_SECRET
) {
  twitter = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  })
} else throw 'process.env variables not found'

export const sendTweet = async (
  status: string,
  userToQuote?: string,
  idToQuote?: string,
) => {
  const body: { status: string; attachment_url?: string } = { status }

  if (userToQuote && idToQuote)
    body.attachment_url = `https://twitter.com/${userToQuote}/status/${idToQuote}`

  const result = await twitter.post('statuses/update', body)
  return result
}

export const searchLatest: (
  terms: string,
) => Promise<TweetDoc[]> = async terms => {
  const result = (await twitter.get('search/tweets', {
    q: terms,
    result_type: 'recent',
  })) as { statuses: Status[] }

  // There's headers and other stuff outside of statuses
  // There's also a lot of stuff in each status that we're discarding
  return result.statuses
    .filter(status => !status.retweeted_status) // no retweets
    .map(status => ({
      id: status.id_str,
      date: new Date(status.created_at),
      text: status.text,
    }))
    .sort((s1, s2) => s2.date.getTime() - s1.date.getTime())
}

interface Status {
  created_at: string
  id: number
  id_str: string
  text: string
  truncated: boolean
  retweeted_status?: object
}

export interface Tweet {
  id_str: string
  text: string
  quoted_status_id_str: string
  created_at: string
  // There's a ton of other stuff in an actual Tweet object
}