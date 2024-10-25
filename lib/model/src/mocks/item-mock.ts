import { erc1155TokenMock, erc721TokenMock } from '@echo/model/mocks/token-mock'
import type { Erc1155Item } from '@echo/model/types/erc1155-item'
import type { Erc721Item } from '@echo/model/types/erc721-item'

export const erc721ItemMock: Erc721Item = {
  token: erc721TokenMock
}

export const erc1155ItemMock: Erc1155Item = {
  token: erc1155TokenMock,
  quantity: 3
}
