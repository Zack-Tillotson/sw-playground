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
    'content_type': 'topicPage',
  }).then(results => {
    if(results && results.items && results.items.length) {
      return results.items;
    }
    else return [];
  });

  return routes;
}

function getPageContent(pagePath) {
  const slug = pagePath.split('/').filter(piece => piece).join('/');
  return getRoutes()
    .then(routes => {
      const routeMeta = routes.find(item => item.fields.slug === slug);

      const assembly = client.getEntries({
          'links_to_entry': routeMeta.sys.id,
          'include': 10,
        })
      return assembly.then(dstructPage);
  });

}

export default {
  getRoutes,
  getPageContent,
}