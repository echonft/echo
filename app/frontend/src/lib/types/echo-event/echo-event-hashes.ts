import type { HexString } from '@echo/utils/types/hex-string'

export const OFFER_CREATED_EVENT_HASH: HexString = '0x395be2bdef7155640f1587948c5cf433c6fe9b88ad5669088d8bc1a9c61df3ee'
export const OFFER_EXECUTED_EVENT_HASH: HexString = '0x29b4fc7c563e5c9b23b0f5bef771f3129ee53ebecccd9ac7fda41aa2151960b3'

export const ECHO_EVENT_HASHES = [OFFER_CREATED_EVENT_HASH, OFFER_EXECUTED_EVENT_HASH] as const
