import { erc1155TokenMock, erc20TokenMock, erc721TokenMock } from '@echo/model/mocks/token-mock'
import type { Erc1155Item, Erc20Item, Erc721Item } from '@echo/model/types/item'

export const erc721ItemMock: Erc721Item = {
  token: erc721TokenMock
}

export const erc1155ItemMock: Erc1155Item = {
  token: erc1155TokenMock,
  quantity: 3
}

export const erc20ItemMock: Erc20Item = {
  token: erc20TokenMock,
  quantity: 4.55
}
