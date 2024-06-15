# Echo

All of our secrets are managed by Google Secret Manager. As a developer, your Google account has the required
permissions to access all of them. To set up your environment to do so, do the following:

1. [Install](https://cloud.google.com/sdk/docs/install) the Google Cloud CLI,
   then [initialize](https://cloud.google.com/sdk/docs/initializing) it by running the
   following command:
    ````
    gcloud init
    ````
2. Create local authentication credentials for your Google Account:
    ````
    gcloud auth application-default login
    ````
