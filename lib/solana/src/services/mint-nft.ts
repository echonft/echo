import { setSigner } from '@echo/solana/helpers/set-signer'
import { withTransactionRetries } from '@echo/solana/helpers/with-transaction-retries'
import { fetchNft } from '@echo/solana/services/fetch-nft'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import {
  createV1,
  fetchDigitalAssetWithTokenByMint,
  findMetadataPda,
  mintV1,
  TokenStandard
} from '@metaplex-foundation/mpl-token-metadata'
import type { Token } from '@metaplex-foundation/mpl-toolbox'
import {
  generateSigner,
  type KeypairSigner,
  type Pda,
  percentAmount,
  type PublicKey,
  type TransactionBuilder,
  type Umi
} from '@metaplex-foundation/umi'
import { always, assoc, bind, head, ifElse, isNil, partial, pipe } from 'ramda'

export interface MintNftArgs {
  umi: Umi
  address: string
  owner: PublicKey
  collection?: PublicKey
  options?: {
    debug?: boolean
  }
}

export interface MintedNft {
  mintSigner: KeypairSigner
  metadata: Pda
  token: Token
}

export async function mintNft(args: MintNftArgs): Promise<MintedNft> {
  const { umi, owner, options } = args
  const previousSigner = umi.identity
  const asset = await fetchNft({ cluster: 'mainnet-beta', address: args.address })
  const mintSigner = generateSigner(args.umi)
  setSigner(umi, mintSigner)
  const mint = mintSigner.publicKey
  const metadata = findMetadataPda(umi, { mint })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const createBuilder: TransactionBuilder = pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ifElse(
      always(isNil(args.collection)),
      assoc('isCollection', true),
      assoc('collection', { verified: false, key: args.collection })
    ),
    partial(createV1, [umi])
  )({
    mint,
    metadata,
    payer: umi.payer,
    name: asset.metadata.name,
    symbol: asset.metadata.symbol,
    uri: asset.metadata.uri,
    sellerFeeBasisPoints: percentAmount(5.5) // 5.5%
  })
  // TODO update withTransactionRetries to be able to pipe from a tx builder
  // eslint-disable-next-line @typescript-eslint/unbound-method
  await withTransactionRetries(bind(createBuilder.sendAndConfirm, createBuilder))(umi)
  const mintBuilder = mintV1(umi, {
    mint,
    amount: 1,
    payer: umi.payer,
    tokenOwner: owner,
    tokenStandard: TokenStandard.NonFungible
  })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  await withTransactionRetries(bind(mintBuilder.sendAndConfirm, mintBuilder))(umi)
  const { token } = await fetchDigitalAssetWithTokenByMint(umi, mintSigner.publicKey)
  if (options?.debug) {
    pinoLogger.info(`minted ${isNil(args.collection) ? 'collection' : 'NFT'} ${asset.metadata.name}`)
    pinoLogger.info(`mint: ${mint}`)
    pinoLogger.info(`metadata: ${head(metadata)}`)
    pinoLogger.info(`token ${token.publicKey}`)
    pinoLogger.info(`owner: ${owner}`)
  }
  setSigner(umi, previousSigner)
  return { mintSigner, metadata, token }
}
