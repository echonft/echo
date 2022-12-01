import { isEmpty, isNil } from 'rambda'

export function getIronPassword(): string {
  const ironPassword = process.env.IRON_PASSWORD
  if (isNil(ironPassword) || isEmpty(ironPassword)) {
    throw new Error('.env should contain IRON_PASSWORD')
  }
  return ironPassword
}
