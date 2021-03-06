/*
Private key file located at
functions/danbock-trump-bot-firebase-adminsdk-nav4l-e16846752f.json
was generated in Firebase Console settings.

Run this command to make it work locally:
export GOOGLE_APPLICATION_CREDENTIALS="/Users/danbock/code/trump-term-pct/functions/danbock-trump-bot-firebase-adminsdk-nav4l-e16846752f.json"
*/

import * as admin from 'firebase-admin'
import { Tweet } from './tweet'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
})

const db = admin.firestore()

export const saveTweet = async (tweet: Tweet) => {
  if (tweet.id_str)
    db.collection('tweetResults')
      .doc(tweet.id_str)
      .set({
        id_str: tweet.id_str,
        text: tweet.text,
        quoted_status_id_str: tweet.quoted_status_id_str || null,
        created_at: new Date(tweet.created_at),
      })
}

export const saveAllTweets = async (tweets: TweetDoc[]) => {
  let batch = db.batch()

  tweets.forEach(tweet => {
    const ref = db.collection('tweets').doc(tweet.id)
    batch.set(ref, { date: tweet.date, text: tweet.text })
  })

  return await batch.commit()
}

export const getLatestTweet: () => Promise<TweetDoc> = async () => {
  const qs = await db
    .collection('tweets')
    .orderBy('date', 'desc')
    .limit(1)
    .get()
  return { id: qs.docs[0].id, date: qs.docs[0].data().date.toDate() }
}

export interface TweetDoc {
  id: string
  date: Date
  text?: string
}
