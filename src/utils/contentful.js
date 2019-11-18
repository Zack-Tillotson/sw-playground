import {createClient} from 'contentful';

import dstructPage from './dstructPage';

const {
  space,
  environments: {
    master: {
      cdnKey,
      previewKey,
    },
  },
} = __CONTENTFUL__;

function getSdkClient() {
  let accessObj = { accessToken: cdnKey };
  if(new URLSearchParams(window.location.search).has('preview')) {
    accessObj = {accessToken: previewKey, host: 'preview.contentful.com'};
  }
  return createClient({
    space,
    ...accessObj
  });
}

const client = getSdkClient();

function getRoutes() {
  const routes = client.getEntries({
    'content_type': 'assembly',
    'fields.key': 'sw-playground.navigation',
  }).then(results => {
    if(results && results.items && results.items.length) {
      return results.items[0].fields.blocks;
    }
    else return [];
  });

  return routes;
}

function getPageContent(pagePath) {
  const slug = pagePath.split('/').filter(piece => piece).join('/');
  return getRoutes()
    .then(routes => {
      const routeMeta = routes.find(item => (item.fields.slug || '') === slug);

      return client.getEntries({
          'links_to_entry': routeMeta.sys.id,
          'include': 10,
        })
        .then(resp => resp.items)
        .then(items => items.filter(item => item.fields.key.startsWith('sw-playground.page')))
        .then(items => items[0])
        .then(dstructPage);
  });

}

function getAsset(id) {
  return client.getAsset(id)
}

export default {
  getRoutes,
  getPageContent,
  getAsset,
}