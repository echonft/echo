import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { Nft } from '@echo/model/types/nft/nft'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import { assoc, dissoc, modify, pipe } from 'ramda'

export function nftToToken<T extends Nft>(nft: T): T extends Erc721Nft ? Erc721Token : Erc1155Token {
  const contract = nft.collection.contract
  return pipe(
    dissoc('attributes'),
    dissoc('owner'),
    assoc('contract', contract),
    // FIXME
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('collection', dissoc('contract'))
  )(nft) as T extends Erc721Nft ? Erc721Token : Erc1155Token
}
