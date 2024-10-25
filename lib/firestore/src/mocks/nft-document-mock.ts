import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import {
  nftMockPx1,
  nftMockPx2,
  nftMockPx3,
  nftMockSpiral1,
  nftMockSpiral2,
  nftMockSpiral3
} from '@echo/model/mocks/nft-mock'
import type { Nft } from '@echo/model/types/nft'
import { removeNilProps } from '@echo/utils/helpers/remove-nil-props'

export const nftDocumentMockSpiral1 = removeNilProps<Nft, NftDocument>(nftMockSpiral1)

export const nftDocumentMockSpiral2 = removeNilProps<Nft, NftDocument>(nftMockSpiral2)

export const nftDocumentMockSpiral3 = removeNilProps<Nft, NftDocument>(nftMockSpiral3)

export const nftDocumentMockPx1 = removeNilProps<Nft, NftDocument>(nftMockPx1)

export const nftDocumentMockPx2 = removeNilProps<Nft, NftDocument>(nftMockPx2)

export const nftDocumentMockPx3 = removeNilProps<Nft, NftDocument>(nftMockPx3)
