import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { EchoEventTopic } from '@echo/web3/constants/echo-event-topic'
import { echoEventTopicToType } from '@echo/web3/mappers/echo-event-topic-to-type'
import type { EchoEvent } from '@echo/web3/types/echo-event'
import { topicSchema } from '@echo/web3/validators/topic-schema'
import { applySpec, flatten, map, path, pipe, prop } from 'ramda'
import { nativeEnum, object, tuple } from 'zod'

export const echoEventSchema = object({
  logs: object({
    address: evmAddressSchema,
    topics: tuple([nativeEnum(EchoEventTopic).transform(echoEventTopicToType).readonly(), topicSchema])
      .rest(topicSchema.pipe(evmAddressSchema).optional())
      .readonly(),
    transactionHash: hexStringSchema
  })
    .array()
    .transform(
      map(
        applySpec<EchoEvent>({
          transactionHash: prop('transactionHash'),
          type: path(['topics', 0]),
          offerId: path(['topics', 1]),
          from: path(['topics', 2])
        })
      )
    )
    .readonly()
})
  .readonly()
  .array()
  .nonempty()
  .transform(pipe(map(prop('logs')), flatten))
  .readonly()
