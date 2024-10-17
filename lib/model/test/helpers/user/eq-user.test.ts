import { eqUser } from '@echo/model/helpers/user/eq-user'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { describe, expect, test } from '@jest/globals'
import { assoc, assocPath, dissoc } from 'ramda'

describe('helpers - user - eqUser', () => {
  const user = getUserMockByUsername(userMockJohnnyUsername())
  test('returns false if the username is different', () => {
    expect(eqUser(user, assoc('username', 'other-username', user))).toBeFalsy()
  })
  test('returns false if the wallet is different', () => {
    expect(eqUser(user, assocPath(['wallet', 'address'], '0xotheraddress', user))).toBeFalsy()
    expect(eqUser(user, assocPath(['wallet', 'chain'], 'other-chain', user))).toBeFalsy()
  })
  test('returns true if the username and the wallet are equals in both users', () => {
    expect(eqUser(user, user)).toBeTruthy()
  })
  test('returns true if the username and the wallet are equals in both users, regardless of the other props', () => {
    expect(eqUser(user, dissoc('discord', user))).toBeTruthy()
    expect(eqUser(user, assocPath(['discord', 'accentColor'], 61276127612, user))).toBeTruthy()
    expect(eqUser(user, assocPath(['discord', 'avatar'], 'other-avatar', user))).toBeTruthy()
    expect(eqUser(user, assocPath(['discord', 'avatarDecorationUrl'], 'other-url', user))).toBeTruthy()
    expect(eqUser(user, assocPath(['discord', 'avatarUrl'], 'other-url', user))).toBeTruthy()
    expect(eqUser(user, assocPath(['discord', 'bannerColor'], 'other-color', user))).toBeTruthy()
    expect(eqUser(user, assocPath(['discord', 'bannerUrl'], 'other-url', user))).toBeTruthy()
    expect(eqUser(user, assocPath(['discord', 'globalName'], 'other-name', user))).toBeTruthy()
  })
})
