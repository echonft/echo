import { withTransactionRetries } from '@echo/solana/helpers/with-transaction-retries'
import { fetchNft } from '@echo/solana/services/fetch-nft'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { createV1, findMetadataPda, mintV1, TokenStandard } from '@metaplex-foundation/mpl-token-metadata'
import {
  generateSigner,
  type KeypairSigner,
  type Pda,
  percentAmount,
  type PublicKey,
  type TransactionBuilder,
  type Umi
} from '@metaplex-foundation/umi'
import { always, assoc, bind, ifElse, isNil, partial, pipe } from 'ramda'

interface MintNftArgs {
  umi: Umi
  address: string
  collection?: PublicKey
}
export async function mintNft(args: MintNftArgs): Promise<{ mint: KeypairSigner; metadata: Pda }> {
  const asset = await fetchNft({ cluster: 'mainnet-beta', address: args.address })
  const mintSigner = generateSigner(args.umi)
  const mintSignerUmi = assoc('identity', mintSigner, args.umi)
  const mint = mintSigner.publicKey
  const metadata = findMetadataPda(mintSignerUmi, { mint })
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
    partial(createV1, [mintSignerUmi])
  )({
    mint,
    metadata,
    payer: mintSignerUmi.payer,
    name: asset.metadata.name,
    symbol: asset.metadata.symbol,
    uri: asset.metadata.uri,
    sellerFeeBasisPoints: percentAmount(5.5) // 5.5%
  })
  // TODO update withTransactionRetries to be able to pipe from a tx builder
  // eslint-disable-next-line @typescript-eslint/unbound-method
  await withTransactionRetries(bind(createBuilder.sendAndConfirm, createBuilder))(mintSignerUmi)
  const mintBuilder = mintV1(mintSignerUmi, {
    mint,
    amount: 1,
    payer: mintSignerUmi.payer,
    tokenOwner: mintSignerUmi.payer.publicKey,
    tokenStandard: TokenStandard.NonFungible
  })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  await withTransactionRetries(bind(mintBuilder.sendAndConfirm, mintBuilder))(mintSignerUmi)
  pinoLogger.info(
    `minted ${isNil(args.collection) ? 'collection' : 'NFT'} ${asset.metadata.name} with mint authority: ${mint} and metadata: ${metadata.toString()}`
  )
  return { mint: mintSigner, metadata }
}
