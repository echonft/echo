import type { ErrorResponse } from '@echo/backend/types/error-response'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import type { VerifyRequest } from '@echo/backend/types/verify-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { verifyRequestSchema } from '@echo/backend/validators/verify-request-schema'
import { getUserByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { getAllWhitelistedContracts } from '@echo/firestore/crud/whitelisted-contract/get-all-whitelisted-contracts'
import { addWhitelistedUser } from '@echo/firestore/crud/whitelisted-user/add-whitelisted-user'
import { getNftBalances } from '@echo/web3/services/get-nft-balances'
import { NextResponse } from 'next/server'
import { andThen, isNil, map, pipe, prop } from 'ramda'

interface VerifyResponse {
  isWhitelisted: boolean
}

export async function verifyRequestHandler({ req }: RequestHandlerArgs<VerifyRequest>): Promise<NextResponse> {
  try {
    const { discordId } = await pipe(parseRequest(verifyRequestSchema))(req)

    const user = await getUserByDiscordId(discordId)
    if (isNil(user) || isNil(user.wallet)) {
      return NextResponse.json<VerifyResponse>({ isWhitelisted: false })
    }

    // Get all whitelisted contracts and check NFT balances
    const contracts = await pipe(getAllWhitelistedContracts, andThen(map(prop('address'))))()

    const balance = await getNftBalances({
      wallet: user.wallet,
      contracts
    })

    // If user has NFTs, add them to whitelist
    if (balance > 0) {
      await addWhitelistedUser(discordId)
      return NextResponse.json<VerifyResponse>({ isWhitelisted: true })
    }

    return NextResponse.json<VerifyResponse>({ isWhitelisted: false })
  } catch (_err) {
    return NextResponse.json<ErrorResponse>(
      {
        error: 'internal server error'
      },
      { status: 500 }
    )
  }
}
