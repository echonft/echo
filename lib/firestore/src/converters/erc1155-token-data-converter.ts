import { getNftTokenIdLabel } from '@echo/firestore/helpers/converters/nft/get-nft-token-id-label'
import type { Erc1155TokenDocumentData } from '@echo/firestore/types/model/erc1155-token-document-data'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import { assoc, dissoc } from 'ramda'

export const erc1155TokenDataConverter = {
  fromFirestore(documentData: Erc1155TokenDocumentData): Erc1155Token {
    return assoc('tokenIdLabel', getNftTokenIdLabel(documentData), documentData)
  },
  toFirestore(modelObject: Erc1155Token): Erc1155TokenDocumentData {
    return dissoc('tokenIdLabel', modelObject)
  }
}
