import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import { assertUserExists } from '@echo/frontend/lib/helpers/user/assert/assert-user-exists'
import { userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'

describe('helpers - user - assert - assertUserExists', () => {
  it('throws if user is undefined', () => {
    expect(() => {
      assertUserExists(undefined, 'username')
    }).toThrow()
  })
  it('does not throw if user is defined', () => {
    expect(() => {
      assertUserExists(getUserDocumentDataMockByUsername(userMockJohnnyUsername()), 'username')
    }).not.toThrow()
  })
})
