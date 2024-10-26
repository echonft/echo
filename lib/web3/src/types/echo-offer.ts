import { echoOfferSchema } from '@echo/web3/validators/echo-offer-schema'
import { z } from 'zod'

export type EchoOffer = z.infer<ReturnType<typeof echoOfferSchema>>
