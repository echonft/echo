import { getNftTokenIdLabel } from '@echo/firestore/helpers/converters/nft/get-nft-token-id-label'
import type { Erc1155TokenDocumentData, Erc721TokenDocumentData } from '@echo/firestore/types/model/token-document-data'
import type { Erc1155Token, Erc721Token } from '@echo/model/types/token'
import { assoc, dissoc } from 'ramda'

export const erc721TokenDataConverter = {
  fromFirestore(documentData: Erc721TokenDocumentData): Erc721Token {
    return assoc('tokenIdLabel', getNftTokenIdLabel(documentData), documentData)
  },
  toFirestore(modelObject: Erc721Token): Erc721TokenDocumentData {
    return dissoc('tokenIdLabel', modelObject)
  }
}

export const erc1155TokenDataConverter = {
  fromFirestore(documentData: Erc1155TokenDocumentData): Erc1155Token {
    return assoc('tokenIdLabel', getNftTokenIdLabel(documentData), documentData)
  },
  toFirestore(modelObject: Erc1155Token): Erc1155TokenDocumentData {
    return dissoc('tokenIdLabel', modelObject)
  }
}
