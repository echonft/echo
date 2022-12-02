export class FirebaseDocumentNotError extends Error {
  constructor(path: string) {
    super(`Document not found at path ${path}`)
  }
}
