import {
  erc1155TokenMock,
  erc20TokenMock,
  erc20TokenMockNoDecimals,
  erc721TokenMock
} from '@echo/model/mocks/token-mock'
import type { Erc1155Item } from '@echo/model/types/erc1155-item'
import type { Erc20Item } from '@echo/model/types/erc20-item'
import type { Erc721Item } from '@echo/model/types/erc721-item'

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

export const erc20ItemMockNoDecimals: Erc20Item = {
  token: erc20TokenMockNoDecimals,
  quantity: 2
}
