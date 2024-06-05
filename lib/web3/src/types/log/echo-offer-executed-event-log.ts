import { offerExecutedEventLogSchema } from '@echo/web3/validators/offer-executed-event-log-schema'

export type EchoOfferExecutedEventLog = ReturnType<typeof offerExecutedEventLogSchema.parse>
