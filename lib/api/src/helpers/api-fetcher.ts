import type { ErrorResponse } from '@echo/api/types/responses/error-response'
import { always, assoc, isNil, unless } from 'ramda'

export interface ApiFetchResult<T> {
  data: T | undefined
  error: Error | undefined
}

function getHeaders(token?: string): HeadersInit {
  return isNil(token)
    ? {
        'Content-Type': 'application/json'
      }
    : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
}

function getBody<T extends object>(body: T): BodyInit {
  return JSON.stringify(body)
}

async function convertResponse<T>(response: Response): Promise<ApiFetchResult<T>> {
  if (response.ok) {
    const data = (await response.json()) as T
    return { data, error: undefined }
  }
  try {
    const errorData = (await response.json()) as ErrorResponse
    return { data: undefined, error: new Error(errorData.error) }
  } catch (e) {
    return { data: undefined, error: e as Error }
  }
}

export async function putData<T extends object, U>(url: URL, body?: T, token?: string): Promise<ApiFetchResult<U>> {
  const init = unless(
    always(isNil(body)),
    assoc('body', getBody(body!))
  )({
    method: 'PUT',
    headers: getHeaders(token)
  }) as RequestInit
  const response = await fetch(url, init)
  return convertResponse(response)
}

export async function postData<T extends object, U>(url: URL, body?: T, token?: string): Promise<ApiFetchResult<U>> {
  const init = unless(
    always(isNil(body)),
    assoc('body', getBody(body!))
  )({
    method: 'POST',
    headers: getHeaders(token)
  }) as RequestInit
  const response = await fetch(url, init)
  return convertResponse(response)
}

export async function getData<U>(url: URL, token?: string): Promise<ApiFetchResult<U>> {
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(token)
  })
  return convertResponse(response)
}
