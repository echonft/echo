export function isURI(str: string): boolean {
  try {
    const url = new URL(str)
    return !!url.protocol
  } catch (e) {
    return false
  }
}
