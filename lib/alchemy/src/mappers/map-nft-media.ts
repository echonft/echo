import { mapUrl } from './map-url'
import { NftMedia } from '@echo/model'
import { applySpec, applyToNullableProp, applyToProp } from '@echo/utils'
import { Media } from 'alchemy-sdk'
import { prop } from 'ramda'

export const mapNftMedia = applySpec<Media, NftMedia>({
  bytes: prop('bytes'),
  format: prop('format'),
  gateway: applyToProp('gateway', mapUrl),
  raw: applyToProp('raw', mapUrl),
  thumbnail: applyToNullableProp('thumbnail', mapUrl)
})
