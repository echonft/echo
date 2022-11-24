import { firebaseOptions } from '@echo/firebase/config/config'
import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { isEmpty, isNil } from 'ramda'

/**
 * Returns an admin logged Firebase
 */
export function getAdminFirebase(): App {
  const options = firebaseOptions
  if (isEmpty(getApps())) {
    if (
      isNil(process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY) ||
      isEmpty(process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY)
    ) {
      throw new Error('.env should contain FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY')
    }
    return initializeApp({
      credential: cert({
        projectId: 'echo-83309',
        privateKey:
          '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC5eaqjeE5AvDs1\nYx+NtJqzsRVAmlkUUyLH2Dg1E5oSx21/TbS1TddiDUc7vWt6E1MZJM2NyU3QdjWj\nbxqJZWjwVKzlCyK1CcL4OcRuSc1XBX08c5CJkDwhXp9SPuTkbbKZbVrOs2pBOV/x\nPWTQl4KEQlRqYmPmHcrAW0o5UO/dxb5V8qIO85DONzCw3Kt17S/MLkNz5biPONMP\nkmQ5ldtvddSc2JxuDOulLtY+X8Gf4C2prx3lIWWGnz48n8ACPtYLDqsrCoKaWDEW\nIHkBPUaiyJj2tPvca4pNmrwgBRNAf0pVJKTvG98+Y6nRNiJID3U3Cr68y7emwwEm\nOMtwBnKtAgMBAAECggEAJgBta65t3BolCHh9gc+ABfKxr8mgGEe7X9Znl8pjHldh\nkjyF2sLu7x5Y2r7h+0Jj24o8moElEiHyNgEA3ydZw6oZvZkVPKIaIjlVy6IP8jVD\n9mOYOPNGOrEUNCoCRGJMfl6XRTQiAGikxX0Gf62XVolvmdd8b+zpOpXJxKoWZ2nw\nD/J93c3UGWwSgo9laVyg9IgfCu/Uc+Cn6Dqb1D/XYP5Q75lwwjIhPYF+cw/WLaBO\np1MvRKIKp6Uon45iCQ5pcjqkc2cUyB62aaBT8cnvH4zuedFflX5HGo3pW5TB3hZ8\ndaQm4LgsCvJyYq82LnGccC5xlz1oiJYZAjZJAHWokQKBgQDhgLFyXVxwJvgtlZPg\nA4gIyLyXIWWRdiNxdlmApPcarB7RiyzFOFETPOfDTtTmCOYSS8BTwHjRq644HK1h\n38JyLcuqB8UAE8T4R82wU2eNVNqrdyzkRlbpxBTTkDGdFkfdau5e+E+c9HyCEvqz\nD9VyFqT7mKZd1q+VWVSWh5dD3QKBgQDSjybQPTpqk+uln6UWwhmv5aYU1eFB86vR\nVMTgm+7dzVwOV8LkmH9R6SXUiiip6DaUm7YRycUPWF5wBaCdgga/3omTKk5PQsZ6\nPq7gQp2aWkmI1vsZTMTODG2FbvrHg3BPSkwmZ4c74DTxkUGIdW8YnxxJDNunlqst\nOR9hXhwlEQKBgQCBY7ptiKxVncahQUZMLzqK78NmZD9HK6ZCoEnSytUOdNxqF5Vk\nxF+gzj2dj0oRg+Gfdd+xLqskg4G/qJTDqASGR0ipEzQySyWl4G1hUzoDmkCuSf90\nK/gKwfvBOOd+3x31KjoEPC5SPOaELCe1PsyWXe/kfT5Ycarl4w/qH3rn8QKBgQCG\nSwUfVZ3Xceae6PZ7UGrftCG8MjmMPeS9C0rSUsIDt0HaaAEGmXjC/mfBaijLTS7a\nk4GJUN4djmgVHJG3Q8IYR9AJC7eMd/Ns7mPM5s/sLV+vJiZamYsAPA7yRrkt3NgZ\nyjJNYERxXOuHkvRwGy4zTu/Ua54BAmjE3CT2jfZ3cQKBgQCCYraYz+9s0d+dzhmS\npDui5/Qn+xKwYTT2EPPUVlchMsVNT8x3izreSTZYFWe/UcofD8ZzfdnKXpa0zmGl\n5qS1VpcZgp2vkI8do6LrQ/pDn1iRhMzgITbI270YH0zvcVy9WH8Bo27YT8wvmr/n\n9T6cfGjtS0W0cu0C+OlH4MvjtQ==\n-----END PRIVATE KEY-----\n',
        clientEmail: 'firebase-adminsdk-12hv6@echo-83309.iam.gserviceaccount.com'
      }),
      databaseURL: options.databaseURL
    })
  }
  return getApp()
}
