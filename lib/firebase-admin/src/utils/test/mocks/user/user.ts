import { User, Wallet } from '@echo/model'

const wallets: { [key: string]: Wallet } = {
  HFXC6RGOBaHlwDhfuKn6: {
    id: 'HFXC6RGOBaHlwDhfuKn6',
    address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
    chainId: 1
  },
  wfIJ0XlsU0jKApEzrSjb: {
    id: 'wfIJ0XlsU0jKApEzrSjb',
    address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9',
    chainId: 1
  },
  x9QlFxjXE2J1UJiTEgN0: {
    id: 'x9QlFxjXE2J1UJiTEgN0',
    address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE',
    chainId: 1
  }
}

export const users: { [key: string]: User } = {
  oE6yUEQBPn7PZ89yMjKn: {
    id: 'oE6yUEQBPn7PZ89yMjKn',
    discordId: 'johnnycage#0890',
    nonce: undefined,
    wallets: Object.values(wallets)
  }
}
