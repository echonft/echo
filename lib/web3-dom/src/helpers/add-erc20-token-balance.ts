import type { ERC20Token } from '@echo/model/types/erc20-token'
import type { OwnedERC20Token } from '@echo/model/types/owned-erc20-token'
import type { Wallet } from '@echo/model/types/wallet'
import { assoc } from 'ramda'
import { erc20Abi, formatUnits, type WalletClient } from 'viem'
import { readContract } from 'viem/actions'

export interface AddErc20TokenBalanceArgs {
  wallet: Wallet
  token: ERC20Token
  client: WalletClient
}

export async function addERC20TokenBalance(args: AddErc20TokenBalanceArgs): Promise<OwnedERC20Token> {
  const { wallet, token, client } = args
  const { address } = wallet

  const balance = await readContract(client, {
    abi: erc20Abi,
    functionName: 'balanceOf',
    address: token.contract,
    args: [address]
  })

  return assoc('balance', Number(formatUnits(balance, token.decimals)), token)
}
