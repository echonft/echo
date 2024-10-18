import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { userMockJohnnyId } from '@echo/firestore/mocks/user/user-document-data-mock'
import { getWalletDocumentDataMockByUserId } from '@echo/firestore/mocks/wallet/get-wallet-document-data-mock-by-user-id'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getWalletMockByUsername, walletMockJohnnyAddress } from '@echo/model/mocks/wallet/wallet-mock'
import { Chain } from '@echo/utils/constants/chain'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - user - getUserFromFirestoreData', () => {
  it('with walletDocumentData', () => {
    const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())
    const walletDocumentData = getWalletDocumentDataMockByUserId(userMockJohnnyId())
    expect(getUserFromFirestoreData({ user, wallet: walletDocumentData })).toStrictEqual({
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: userMockJohnnyUsername(),
        bannerColor: '#d11bd9'
      },
      username: userMockJohnnyUsername(),
      wallet: {
        chain: Chain.Ethereum,
        address: toLower(walletMockJohnnyAddress())
      }
    })
  })
  it('with wallet', () => {
    const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())
    const wallet = getWalletMockByUsername(userMockJohnnyUsername())
    expect(getUserFromFirestoreData({ user, wallet })).toStrictEqual({
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: userMockJohnnyUsername(),
        bannerColor: '#d11bd9'
      },
      username: userMockJohnnyUsername(),
      wallet: {
        chain: Chain.Ethereum,
        address: toLower(walletMockJohnnyAddress())
      }
    })
  })
})
