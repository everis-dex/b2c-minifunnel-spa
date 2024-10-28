// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    dev_mode: false,
    production: false,
    maxAttachmentSize: 5242880,
    maxAttachmentCupsSize: 4194304,
    baseServer_url: 'https://primaveradev.prod.acquia-sites.com',
    server_url: 'https://primaveradev.prod.acquia-sites.com',
    documents_url: 'https://primaveradev.prod.acquia-sites.com/',
    documentsEdp_url: 'https://www.totalenergies.es/',
    recaptchaToken: '6Ldr99sZAAAAALClSYSZQaAf6YPBbZJyL-opk7k4', // use in dev environments
    site_key_recaptcha: '6LcWHzEqAAAAAFU7YMlLKjHIVFovLO-YQuKGuNSu',
    idProduct:['31561','31456'],
    drupalAuth: {
      url: 'https://primaveradev.prod.acquia-sites.com/en/oauth/token',
    },
    drupalSession : 'https://primaveradev.prod.acquia-sites.com/en/rest/session/token',
    eSave: {
      url: 'https://totalenergies.electric-save.com/api/v2/',
      // cors: 'https://cors-anywhere.herokuapp.com/',
      token: 'authenticate'
    },
    googleApiKeyMaps: 'AIzaSyBBZOuhM0S-XbRDK9QML5no1k3eQLOEf68'
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  