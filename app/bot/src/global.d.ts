export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      APP_URL: string
    }
  }
  declare namespace FirebaseFirestore {
    interface FirestoreDataConverter<T> {
      toFirestore(modelObject: PartialWithFieldValue<T>): DocumentData
    }
  }
}
