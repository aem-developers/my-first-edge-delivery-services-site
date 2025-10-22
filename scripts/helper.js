import { toCamelCase } from './aem.js';

async function fetchTranslations(prefix = 'default') {
  window.translations = window.translations || {};

  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const localeMatch = pathParts.find((part) => /^[a-z]{2}(-[A-Z]{2})?$/.test(part));
  const locale = localeMatch || 'en';

  if (!window.translations[prefix]) {
    window.translations[prefix] = new Promise((resolve) => {
      // For the purposes of this module, we add the /module-8/ prefix
      // In normal use, replace it with /
      // const basePath = prefix === 'default' ? '/' : `${prefix}/`;
      const basePath = prefix === 'default' ? '/module-8/' : `${prefix}/`;
      const url = `${basePath}${locale}/translations.json`;

      fetch(url)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          return {};
        })
        .then((json) => {
          const translations = {};
          json.data
            .filter((translation) => translation.Key)
            .forEach((translation) => {
              translations[toCamelCase(translation.Key)] = translation.Text;
            });
          window.translations[prefix] = translations;
          resolve(window.translations[prefix]);
        })
        .catch(() => {
          // error loading translations
          window.translations[prefix] = {};
          resolve(window.translations[prefix]);
        });
    });
  }
  return window.translations[`${prefix}`];
}

export { fetchTranslations };
