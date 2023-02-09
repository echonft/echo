import { mapUrl } from './map-url'
import { NftTokenUri } from '@echo/model'
import { applySpec, applyToProp } from '@echo/utils'
import { TokenUri } from 'alchemy-sdk'

export const mapNftTokenUri = applySpec<TokenUri, NftTokenUri>({
  gateway: applyToProp('gateway', mapUrl),
  raw: applyToProp('raw', mapUrl)
})
