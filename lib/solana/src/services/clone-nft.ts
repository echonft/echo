import { getNft } from '@echo/helius/services/get-nft'
import type { DigitalAsset, Grouping } from '@echo/helius/types/response/digital-asset'
import { withTransactionRetries } from '@echo/solana/helpers/with-transaction-retries'
import { type MintedNft, mintNft } from '@echo/solana/services/mint-nft'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { verifyCollectionV1 } from '@metaplex-foundation/mpl-token-metadata'
import { type KeypairSigner, type PublicKey, signerIdentity, type Umi } from '@metaplex-foundation/umi'
import { andThen, bind, find, isNil, omit, pipe, prop, propEq } from 'ramda'

interface CloneNftArgs {
  umi: Umi
  address: string
  owner: PublicKey
  collectionMintSigner?: KeypairSigner
}

function mintCollection(args: { umi: Umi; owner: PublicKey; nft: DigitalAsset }): Promise<MintedNft> {
  const { umi, owner, nft } = args
  const address = pipe<[DigitalAsset], Grouping[], Grouping | undefined, Nullable<string>>(
    prop('grouping'),
    find<Grouping>(propEq('collection', 'group_key')),
    unlessNil<Grouping, string>(prop('group_value'))
  )(nft)
  if (isNil(address)) {
    throw Error(`no collection found for token ${nft.id}`)
  }
  return mintNft({ umi, address, owner })
}

interface GetCollectionSigner {
  umi: Umi
  nft: DigitalAsset
  owner: PublicKey
  collectionMintSigner?: KeypairSigner
}
function getCollectionSigner(args: GetCollectionSigner): Promise<KeypairSigner> {
  if (isNil(args.collectionMintSigner)) {
    return pipe<
      [GetCollectionSigner],
      Omit<GetCollectionSigner, 'collectionMintSigner'>,
      Promise<MintedNft>,
      Promise<KeypairSigner>
    >(
      omit(['collectionMintSigner']),
      mintCollection,
      andThen(prop('mintSigner'))
    )(args)
  }
  return Promise.resolve(args.collectionMintSigner)
}
export async function cloneNft(args: CloneNftArgs): Promise<MintedNft & { collectionSigner: KeypairSigner }> {
  const { umi, address, collectionMintSigner, owner } = args
  const nft = await getNft({
    cluster: 'mainnet-beta',
    address
  })
  // mint collection NFT if needed
  const collectionSigner = await getCollectionSigner({ umi, owner, nft, collectionMintSigner })
  const { mintSigner, metadata, token } = await mintNft({
    umi,
    address,
    owner,
    collection: collectionSigner.publicKey,
    options: { debug: true }
  })
  umi.use(signerIdentity(collectionSigner, false))
  const verifyBuilder = verifyCollectionV1(umi, {
    metadata,
    collectionMint: collectionSigner.publicKey
  })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  await withTransactionRetries(bind(verifyBuilder.sendAndConfirm, verifyBuilder))(umi)
  // pinoLogger.info(`verified asset ${nft.content.metadata.name}`)
  return { mintSigner, metadata, token, collectionSigner }
}
