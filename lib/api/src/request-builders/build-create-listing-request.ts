import type { CreateListingRequestBuilderArgs } from '@echo/api/types/request-builders/create-listing-request-builder-args'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { Erc1155ItemRequest } from '@echo/api/types/requests/erc1155-item-request'
import type { Erc721ItemRequest } from '@echo/api/types/requests/erc721-item-request'
import { collectionIndex } from '@echo/model/helpers/collection/collection-index'
import { isErc721Item } from '@echo/model/helpers/item/is-erc721-item'
import { erc1155TokenIndex } from '@echo/model/helpers/token/erc1155-token-index'
import { erc721TokenIndex } from '@echo/model/helpers/token/erc721-token-index'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Listing } from '@echo/model/types/listing/listing'
import { applySpec, ifElse, map, modify, pipe, prop } from 'ramda'

export function buildCreateListingRequest(args: CreateListingRequestBuilderArgs): CreateListingRequest {
  return applySpec<CreateListingRequest>({
    items: pipe(
      prop('items'),
      map(
        ifElse<Erc721Item | Erc1155Item, Erc721Item, Erc721ItemRequest, Erc1155ItemRequest>(
          isErc721Item,
          modify('token', erc721TokenIndex),
          modify('token', erc1155TokenIndex)
        )
      )
    ),
    target: pipe<[CreateListingRequestBuilderArgs], Listing['target'], CreateListingRequest['target']>(
      prop('target'),
      modify<'collection', Listing['target']['collection'], CreateListingRequest['target']['collection']>(
        'collection',
        collectionIndex
      )
    ),
    expiration: prop('expiration')
  })(args)
}
