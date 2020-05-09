import { getRecordHighClose, TransformedDataPoint } from './stocks'
it('calculates record high close', () => {
  const testData: TransformedDataPoint[] = [
    { open: 5, close: 6, high: 7, low: 4, timestamp: new Date(), volume: 1234 },
    { open: 5, close: 7, high: 7, low: 4, timestamp: new Date(), volume: 1234 },
    { open: 5, close: 5, high: 7, low: 4, timestamp: new Date(), volume: 1234 },
  ]
  expect(getRecordHighClose(testData).close).toBe(7)
})
