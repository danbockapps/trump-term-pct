import axios from 'axios'
require('dotenv').config()

export const getData = async () => {
  return getTransformedData(await getRawData())
}

const getRawData = async () => {
  const start = Math.round(new Date('2020-02-19').getTime() / 1000)
  const end = Math.round(new Date().getTime() / 1000)
  const axiosResponse = await axios.get<FinnHubData>(
    'https://finnhub.io/api/v1/stock/candle?symbol=^GSPC&resolution=D&from=' +
      `${start}&to=${end}&token=${process.env.FINNHUB_KEY}`,
  )
  return axiosResponse.data
}

const getTransformedData = (data: FinnHubData) => {
  const returnable: TransformedDataPoint[] = []
  for (let i = 0; i < data.t.length; i++) {
    returnable.push({
      open: data.o[i],
      close: data.c[i],
      high: data.h[i],
      low: data.l[i],
      timestamp: new Date(data.t[i] * 1000),
      volume: data.v[i],
    })
  }
  return returnable
}

export const getRecordHighClose = (data: TransformedDataPoint[]) =>
  data.reduce((top, next) => (next.close > top.close ? next : top))

interface FinnHubData {
  s: 'ok' | 'no_data' // status
  o: number[] // open
  c: number[] // close
  h: number[] // high
  l: number[] // low
  t: number[] // timestamp
  v: number[] // volume
}

export interface TransformedDataPoint {
  open: number
  close: number
  high: number
  low: number
  timestamp: Date
  volume: number
}
