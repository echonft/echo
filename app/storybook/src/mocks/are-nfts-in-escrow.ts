import { rangeDelay } from 'delay'

export async function areNftsInEscrow(): Promise<boolean> {
  return rangeDelay(800, 1600, { value: true })
}
