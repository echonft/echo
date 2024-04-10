import { createUmiInstance } from '@echo/solana/helpers/create-umi-instance'
import { setPayer } from '@echo/solana/helpers/set-payer'
import { setSigner } from '@echo/solana/helpers/set-signer'
import { cloneNft } from '@echo/solana/services/clone-nft'
import { acceptOffer, createEchoProgram, createOffer, ECHO_PROGRAM_ID } from '@echo/solana/types/sdk'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import {
  findAssociatedTokenPda,
  SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
  SPL_TOKEN_PROGRAM_ID
} from '@metaplex-foundation/mpl-toolbox'
import { publicKey, publicKeyBytes } from '@metaplex-foundation/umi'
import { SystemProgram } from '@solana/web3.js'
import { head, last } from 'ramda'

void (async function () {
  const umi = createUmiInstance('localnet')
  setPayer(umi, process.env.SOLONA_SIGNER_PRIVATE_KEY)
  const sender = publicKey(process.env.SOLONA_SIGNER_TEST_OFFER_SENDER!)
  const receiver = publicKey(process.env.SOLONA_SIGNER_TEST_OFFER_RECEIVER!)
  setSigner(umi, process.env.SOLONA_SIGNER_TEST_OFFER_RECEIVER_PRIVATE_KEY)
  const {
    mintSigner: { publicKey: receiverTokenMint },
    token: receiverToken
  } = await cloneNft({
    umi,
    address: 'E6Z2EHiaPyP6V7Yxx7VfBYDVsViXxR7qcqraaPDQFn7S',
    owner: receiver
  })
  setSigner(umi, process.env.SOLONA_SIGNER_TEST_OFFER_SENDER_PRIVATE_KEY)
  const {
    mintSigner: { publicKey: senderTokenMint },
    token: senderToken
  } = await cloneNft({
    umi,
    address: 'E4Hz3CtTizzG9JemtQE57PYCkdESkSERigHZGYtumuTD',
    owner: sender
  })
  setSigner(umi, process.env.SOLONA_SIGNER_TEST_OFFER_SENDER_PRIVATE_KEY)
  umi.programs.add(createEchoProgram())
  const senderEscrow = umi.eddsa.findPda(ECHO_PROGRAM_ID, [
    new TextEncoder().encode('escrow'),
    publicKeyBytes(sender),
    publicKeyBytes(senderTokenMint)
  ])
  const senderEscrowAssociatedTokenAccount = findAssociatedTokenPda(umi, {
    mint: senderTokenMint,
    owner: publicKey(head(senderEscrow))
  })
  const offer = umi.eddsa.findPda(ECHO_PROGRAM_ID, [
    new TextEncoder().encode('offer'),
    publicKeyBytes(sender),
    publicKeyBytes(receiver)
  ])

  pinoLogger.info(`sender: ${sender}`)
  pinoLogger.info(`sender token: ${senderToken.publicKey}`)
  pinoLogger.info(`sender tokenMint: ${senderTokenMint}`)
  pinoLogger.info(`sender escrow authority: ${head(senderEscrow)}`)
  pinoLogger.info(`sender escrow authority bump: ${last(senderEscrow)}`)
  pinoLogger.info(`sender escrow associated token account: ${head(senderEscrowAssociatedTokenAccount)}`)
  pinoLogger.info(`sender escrow associated token account bump: ${last(senderEscrowAssociatedTokenAccount)}`)
  pinoLogger.info(`offer: ${head(offer)}`)
  pinoLogger.info(`offer bump: ${last(offer)}`)
  pinoLogger.info(`receiver: ${receiver}`)
  pinoLogger.info(`receiver token: ${receiverToken.publicKey}`)
  pinoLogger.info(`receiver tokenMint: ${receiverTokenMint}`)

  const createOfferResult = await createOffer(umi, {
    sender: umi.identity,
    token: senderToken.publicKey,
    tokenMint: senderTokenMint,
    escrow: senderEscrow,
    escrowAssociatedTokenAccount: senderEscrowAssociatedTokenAccount,
    offer,
    receiver,
    receiverToken: receiverToken.publicKey,
    receiverTokenMint: receiverTokenMint,
    splTokenProgram: SPL_TOKEN_PROGRAM_ID,
    associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
    systemProgram: publicKey(SystemProgram.programId)
  }).sendAndConfirm(umi, { send: { skipPreflight: true } })
  pinoLogger.info(`offer created ${JSON.stringify(createOfferResult.result)}`)

  const receiverAssociatedTokenAccount = findAssociatedTokenPda(umi, { mint: senderTokenMint, owner: receiver })
  const senderAssociatedTokenAccount = findAssociatedTokenPda(umi, { mint: receiverTokenMint, owner: sender })

  setSigner(umi, process.env.SOLONA_SIGNER_TEST_OFFER_RECEIVER_PRIVATE_KEY)
  const acceptOfferResult = await acceptOffer(umi, {
    receiver: umi.identity,
    token: receiverToken.publicKey,
    tokenMint: receiverTokenMint,
    asociatedTokenAccount: receiverAssociatedTokenAccount,
    offer,
    sender,
    senderEscrow,
    senderEscrowAssociatedTokenAccount,
    senderTokenMint,
    senderAssociatedTokenAccount,
    splTokenProgram: SPL_TOKEN_PROGRAM_ID,
    associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
    systemProgram: publicKey(SystemProgram.programId)
  }).sendAndConfirm(umi, { send: { skipPreflight: true } })
  pinoLogger.info(`offer accepted: swap done ${JSON.stringify(acceptOfferResult.result)}`)

  process.exit()
})()
