import type { HexString } from '@echo/utils/types/hex-string'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head, partial, pipe } from 'ramda'
import { decodeAbiParameters } from 'viem'

export function decodeOfferId(data: HexString): string {
  return pipe<[HexString], NonEmptyArray<string>, string>(
    partial(decodeAbiParameters, [[{ name: 'id', type: 'string' }]]) as (data: HexString) => NonEmptyArray<string>,
    head
  )(data)
}
