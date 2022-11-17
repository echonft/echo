import { Erc721, TokenType } from '@echo/model/erc721'
import { SafelistRequestStatus } from '@lib/services/alchemy/models/contract-metadata'
import { NftWithMetadata } from '@lib/services/alchemy/models/nft-with-metadata'

export const mapNftResponseToErc721 = (response: NftWithMetadata): Erc721 => {
  const id = response.tokenId
  const address = response.contract.address
  const verified =
    response.contractMetadata?.spamInfo?.isSpam ??
    response.contractMetadata?.opensea?.safelistRequestStatus === SafelistRequestStatus.VERIFIED
  return {
    collection: {
      address,
      verified,
      name: response.contractMetadata?.name,
      openseaLink: undefined,
      floorPrice: response.contractMetadata?.opensea?.floorPrice,
      twitterUsername: response.contractMetadata?.opensea?.twitterUsername,
      discordUrl: response.contractMetadata?.opensea?.discordUrl
    },
    id,
    imageUri: response.media[0]?.gateway,
    name: response.title,
    type: TokenType.ERC721,
    key: `${TokenType.ERC721}-${id}-${address}`
  }
}
