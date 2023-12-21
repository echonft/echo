import type { ApiRequest } from '@echo/api/types/api-request'
import { getAuthOptions } from '@echo/frontend/lib/helpers/auth/get-auth-options'
import type { NextResponse } from 'next/server'
import NextAuth from 'next-auth'

async function GET(request: ApiRequest<never>, context: { params: { nextauth: string[] } }) {
  const authOptions = getAuthOptions()
  return (await NextAuth(request, context, authOptions)) as Promise<NextResponse>
}

async function POST(request: ApiRequest<never>, context: { params: { nextauth: string[] } }) {
  const authOptions = getAuthOptions()
  return (await NextAuth(request, context, authOptions)) as Promise<NextResponse>
}

export { GET, POST }
