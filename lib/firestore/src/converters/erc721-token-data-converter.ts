import { getNftTokenIdLabel } from '@echo/firestore/helpers/converters/nft/get-nft-token-id-label'
import type { Erc721TokenDocumentData } from '@echo/firestore/types/model/erc721-item-document-data'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import { assoc, dissoc } from 'ramda'

export const erc721TokenDataConverter = {
  fromFirestore(documentData: Erc721TokenDocumentData): Erc721Token {
    return assoc('tokenIdLabel', getNftTokenIdLabel(documentData), documentData)
  },
  toFirestore(modelObject: Erc721Token): Erc721TokenDocumentData {
    return dissoc('tokenIdLabel', modelObject)
  }
}
