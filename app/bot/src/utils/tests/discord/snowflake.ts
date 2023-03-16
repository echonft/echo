import { randomUUID } from 'crypto'

export function randomSnowflake() {
  return randomUUID()
}
