export function errorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error
  }
  const message = (error as Error).message
  try {
    const json: unknown = JSON.parse(message)
    return JSON.stringify(json, undefined, 2)
  } catch (e) {
    return message
  }
}
