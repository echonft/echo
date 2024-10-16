export interface UpdateUserRequest {
  readonly tokenType: string
  readonly accessToken: string
  readonly expiresIn: number
  readonly refreshToken: string
  readonly scope: string
  readonly expiresAt: number
}
