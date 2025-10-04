// eslint-disable-next-line import/no-relative-packages

import GtmMartech from '../plugins/gtm-martech/src/index.js';

// For DA Preview support.

const disabled = window.location.search.includes('martech=off');

const martech = new GtmMartech({
  analytics: !disabled,
  tags: ['G-XXXXXXXXXX'],
  containers: {
    lazy: [
      /* Zero or more GTM Container Ids to load during Lazy Phase */
    ],
    delayed: ['GTM-XXXXXXXX'],
  },
  pageMetadata: {
    /* Metadata to pass on during the initialization of the GA4 tag */
  },
  consent: !disabled,
  /* eslint-disable no-use-before-define */
  consentCallback,
  decorateCallback: decorateEvents,
});

function consentCallback() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('Updating Consent');

      resolve({
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'granted',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'denied',
      });
    }, 1500);
  });
}

function decorateEvents(el) {
  const classes = [...el.classList];

  if (el.classList.contains('block')) {
    const blockName = el.classList[0];
    martech.pushToDataLayer({
      event: 'block loaded',
      type: blockName,
    });
  } else if (el.classList.contains('section')) {
    const containers = classes.filter((cls) => cls.endsWith('-container'));
    containers.forEach((container) => {
      martech.pushToDataLayer({
        event: 'section loaded',
        type: container,
      });
    });
  }
}
