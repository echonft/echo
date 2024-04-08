import { getNftsForCollection } from '@echo/helius/services/get-nfts-for-collection'
import type { DigitalAsset } from '@echo/helius/types/response/digital-asset'
import { createUmiInstance } from '@echo/solana/helpers/create-umi-instance'
import { withTransactionRetries } from '@echo/solana/helpers/with-transaction-retries'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { createNft, findMetadataPda, verifyCollectionV1 } from '@metaplex-foundation/mpl-token-metadata'
import {
  createSignerFromKeypair,
  generateSigner,
  type Keypair,
  type Pda,
  percentAmount,
  type PublicKey,
  publicKey,
  type Signer,
  signerIdentity,
  type Umi
} from '@metaplex-foundation/umi'
import { assoc, bind, drop, map, omit, partialRight, pipe, split, take } from 'ramda'

interface Owner {
  address: string
  quantity: number
}
interface Args {
  collection: {
    address: string
    name: string
    symbol: string
    uri: string
  }
  owners: Owner[]
}
interface MintArgs {
  umi: Umi
  payer: Signer
  collectionMint: Signer
  collectionMetadata: Pda
  asset: DigitalAsset
  tokenOwner: PublicKey
}

interface MintForOwnerArgs extends Omit<MintArgs, 'asset'> {
  assets: DigitalAsset[]
  quantity: number
}

async function mintAsset({ umi, payer, collectionMint, collectionMetadata, asset, tokenOwner }: MintArgs) {
  const mint = generateSigner(umi)
  const metadata = findMetadataPda(umi, { mint: mint.publicKey })
  let txBuilder = createNft(umi, {
    mint,
    metadata,
    tokenOwner,
    collection: {
      verified: false,
      key: collectionMint.publicKey
    },
    payer: payer,
    name: asset.content.metadata.name,
    uri: asset.content.json_uri,
    sellerFeeBasisPoints: percentAmount(5.5)
  })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  await withTransactionRetries(bind(txBuilder.sendAndConfirm, txBuilder))(umi)
  pinoLogger.info(`minted asset ${asset.content.metadata.name} to ${tokenOwner}`)
  txBuilder = verifyCollectionV1(umi, {
    metadata,
    collectionMetadata,
    collectionMint: collectionMint.publicKey
  })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  await withTransactionRetries(bind(txBuilder.sendAndConfirm, txBuilder))(umi)
  pinoLogger.info(`verified asset ${asset.content.metadata.name}`)
}

async function mintForOwner(args: MintForOwnerArgs) {
  const assets = take(args.quantity, args.assets)
  for (const asset of assets) {
    try {
      await pipe<[MintForOwnerArgs], Omit<MintArgs, 'asset'>, MintArgs, Promise<void>>(
        omit(['assets', 'quantity']),
        assoc('asset', asset),
        mintAsset
      )(args)
    } catch (e) {
      pinoLogger.error(`error minting NFT ${asset.content.metadata.name} for ${args.tokenOwner}: ${errorMessage(e)}`)
    }
  }
  return drop(args.quantity, args.assets)
}

export async function mintNfts({ collection, owners }: Args) {
  // get the assets
  const assets = await getNftsForCollection({
    cluster: 'mainnet-beta',
    collectionAddress: collection.address
  })
  // create the collection
  const umi = createUmiInstance('localnet')
  const collectionMint = generateSigner(umi)
  const payerKey = pipe<[string], string[], number[], Uint8Array, Keypair>(
    split(','),
    map(partialRight(parseInt, [10])),
    (key) => new Uint8Array(key),
    bind(umi.eddsa.createKeypairFromSecretKey, umi)
  )(process.env.SOLONA_SIGNER_PRIVATE_KEY)
  const payer = createSignerFromKeypair(umi, payerKey)
  umi.use(signerIdentity(payer))
  const metadata = findMetadataPda(umi, { mint: collectionMint.publicKey })
  await createNft(umi, {
    mint: collectionMint,
    metadata,
    payer,
    name: collection.name,
    symbol: collection.symbol,
    uri: collection.uri,
    sellerFeeBasisPoints: percentAmount(5.5), // 5.5%
    isCollection: true
  }).sendAndConfirm(umi)
  pinoLogger.info(`created collection ${collection.name}`)
  let ownerAssets = assets
  for (const owner of owners) {
    ownerAssets = await mintForOwner({
      umi,
      payer,
      collectionMint,
      collectionMetadata: metadata,
      assets: ownerAssets,
      tokenOwner: publicKey(owner.address),
      quantity: owner.quantity
    })
  }
}
