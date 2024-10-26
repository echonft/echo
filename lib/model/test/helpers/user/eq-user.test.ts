import { eqUser } from '@echo/model/helpers/user/eq-user'
import { userMockCrew } from '@echo/model/mocks/user-mock'
import { describe, expect, test } from '@jest/globals'
import { assoc, assocPath, dissoc } from 'ramda'

describe('helpers - user - eqUser', () => {
  const user = userMockCrew
  test('returns false if the username is different', () => {
    expect(eqUser(user, assoc('username', 'other-username', user))).toBeFalsy()
  })
  test('returns true if the username is equal in both users', () => {
    expect(eqUser(user, user)).toBeTruthy()
  })
  test('returns true if the username is equals in both users, regardless of the other props', () => {
    expect(eqUser(user, dissoc('discord', user))).toBeTruthy()
    expect(eqUser(user, assocPath(['discord', 'avatarUrl'], 'other-url', user))).toBeTruthy()
    expect(eqUser(user, assocPath(['discord', 'globalName'], 'other-name', user))).toBeTruthy()
  })
})
