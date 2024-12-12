import { rangeDelay } from 'delay'

export async function getEchoTradingFees(): Promise<bigint> {
  return rangeDelay(800, 1600, { value: BigInt(0) })
}
