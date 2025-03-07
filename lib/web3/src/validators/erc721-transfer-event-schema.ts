import { addressSchema } from '@echo/model/validators/address-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { transferEventTopic } from '@echo/web3/constants/transfer-event-topic'
import type { Erc721TransferEvent } from '@echo/web3/types/erc721-transfer-event'
import type { EventBlockData } from '@echo/web3/types/event-block-data'
import type { EventLog } from '@echo/web3/types/event-log'
import { eventBlockDataSchema } from '@echo/web3/validators/event-block-data-schema'
import { hexNumberSchema } from '@echo/web3/validators/hex-number-schema'
import { topicSchema } from '@echo/web3/validators/topic-schema'
import {
  applySpec,
  both,
  equals,
  F,
  filter,
  flatten,
  head,
  ifElse,
  isEmpty,
  length,
  map,
  path,
  pipe,
  prop,
  reject
} from 'ramda'
import { object, tuple, unknown } from 'zod'

const erc721TransferEventSchema = object({
  address: addressSchema,
  topics: tuple([unknown(), topicSchema.pipe(addressSchema), topicSchema.pipe(addressSchema), hexNumberSchema]),
  transactionHash: hexStringSchema
}).transform(
  applySpec<Erc721TransferEvent>({
    contract: prop('address'),
    from: path(['topics', 1]),
    to: path(['topics', 2]),
    tokenId: path(['topics', 3])
  })
)

export const erc721TransferEventsSchema = eventBlockDataSchema
  .array()
  .nonempty()
  .transform(
    pipe<[EventBlockData[]], EventLog[][], EventLog[][]>(
      map<EventBlockData, EventLog[]>(
        pipe(
          prop('logs'),
          filter(
            pipe(
              prop('topics'),
              // Check that there are 4 topics and that the first topic is the transfer event topic
              ifElse(isNilOrEmpty, F, both(pipe(length, equals(4)), pipe(head, equals(transferEventTopic))))
            )
          )
        )
      ),
      reject(isEmpty)
    )
  )
  .pipe(erc721TransferEventSchema.array().nonempty().array())
  .transform(flatten)
