declare module 'tsconfig-paths/register'

declare global {
  let clientEmail: string
  let privateKey: string
  let projectId: string
}

declare namespace globalThis {
  let clientEmail: string
  let privateKey: string
  let projectId: string
}
