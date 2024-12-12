import type { HexString } from '@echo/model/types/hex-string'
import { rangeDelay } from 'delay'

export function approveErc721Contract(): Promise<HexString> {
  return rangeDelay(800, 1600, { value: '0xwhatever' })
}
