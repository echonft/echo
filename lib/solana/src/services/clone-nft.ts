import { getNft } from '@echo/helius/services/get-nft'
import type { DigitalAsset, Grouping } from '@echo/helius/types/response/digital-asset'
import { withTransactionRetries } from '@echo/solana/helpers/with-transaction-retries'
import { mintNft } from '@echo/solana/services/mint-nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { findMetadataPda, verifyCollectionV1 } from '@metaplex-foundation/mpl-token-metadata'
import type { Token } from '@metaplex-foundation/mpl-toolbox'
import { type KeypairSigner, type Pda, signerIdentity, type Umi } from '@metaplex-foundation/umi'
import { bind, find, isNil, path, pipe, prop, propEq } from 'ramda'

interface MintNftArgs {
  address: string
  umi: Umi
  collection?: {
    address: string
    signer: KeypairSigner
  }
}

interface MintCollectionIfNeededArgs {
  nft: DigitalAsset
  umi: Umi
  collection?: {
    address: string
    signer: KeypairSigner
  }
}
async function mintCollectionIfNeeded(
  args: MintCollectionIfNeededArgs
): Promise<{ mint: KeypairSigner; metadata: Pda; token?: Token }> {
  const { collection, umi } = args
  if (isNil(collection)) {
    const address = pipe<[MintCollectionIfNeededArgs], Grouping[], Grouping | undefined, Nullable<string>>(
      nonNullableReturn(path(['nft', 'grouping'])),
      find<Grouping>(propEq('collection', 'group_key')),
      unlessNil<Grouping, string>(prop('group_value'))
    )(args)
    if (isNil(address)) {
      throw Error(`no collection found for token ${args.nft.id}`)
    }
    return mintNft({ umi, address })
  }
  const { signer } = collection
  return { mint: signer, metadata: findMetadataPda(umi, { mint: signer.publicKey }) }
}

export async function cloneNft(args: MintNftArgs): Promise<{ mint: KeypairSigner; metadata: Pda; token: Token }> {
  const { umi, address, collection } = args
  const nft = await getNft({
    cluster: 'mainnet-beta',
    address
  })
  const { mint: collectionMint } = await mintCollectionIfNeeded({
    umi,
    nft,
    collection
  })
  const { mint, metadata, token } = await mintNft({ umi, address, collection: collectionMint.publicKey })
  umi.use(signerIdentity(collectionMint, false))
  const verifyBuilder = verifyCollectionV1(umi, {
    metadata,
    collectionMint: collectionMint.publicKey
  })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  await withTransactionRetries(bind(verifyBuilder.sendAndConfirm, verifyBuilder))(umi)
  pinoLogger.info(`verified asset ${nft.content.metadata.name}`)
  return { mint, metadata, token }
}
