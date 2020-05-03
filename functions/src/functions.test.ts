import { dateDiff } from './functions';
it('calculates date diff', ()=>{
  const now = new Date('2020-05-02 20:00:00')
  const threeMinAgo = new Date('2020-05-02 19:56:44')
  const oneHourAgo = new Date('2020-05-02 18:55:00')
  const fiveHoursAgo = new Date('2020-05-02 14:01:00')
  const oneDayAgo = new Date('2020-05-01 12:00:00')
  const nineDaysAgo = new Date('2020-04-23 11:00:00')

  expect(dateDiff(now, now)).toBe('0 minutes')
  expect(dateDiff(oneHourAgo, now)).toBe('1 hour')
  expect(dateDiff(threeMinAgo, now)).toBe('3 minutes')
  expect(dateDiff(fiveHoursAgo, now)).toBe('5 hours')
  expect(dateDiff(oneDayAgo, now)).toBe('1 day')
  expect(dateDiff(nineDaysAgo, now)).toBe('9 days')
})