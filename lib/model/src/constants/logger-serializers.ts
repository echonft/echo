import { serializeCollection } from '@echo/model/types/collection'
import { serializeListing } from '@echo/model/types/listing'
import { serializeNft } from '@echo/model/types/nft'
import { serializeOffer } from '@echo/model/types/offer'
import { serializeUser } from '@echo/model/types/user'
import type { LoggerSerializer } from '@echo/utils/types/logger-serializer'

export const modelLoggerSerializers: LoggerSerializer = {
  collection: serializeCollection,
  listing: serializeListing,
  offer: serializeOffer,
  nft: serializeNft,
  user: serializeUser
}
