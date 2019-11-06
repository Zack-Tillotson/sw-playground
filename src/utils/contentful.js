import {createClient} from 'contentful';

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
  if(new URLSearchParams(window.location.search).has('previewKey')) {
    accessObj = {accessToken: previewKey, host: 'preview.contentful.com'};
  }
  return createClient({
    space,
    ...accessObj
  });
}

function getRoutes() {
  const client = getSdkClient();
  const routes = client.getEntries({
      'content_type': 'assembly',
      'fields.key': new URLSearchParams(window.location.search).get('previewKey')
    })
    .then(resp => resp.items[0].fields.blocks)
    .then(entries => entries.filter(entry => entry.sys.contentType.sys.id === 'topicPage'))
    .then(routes => routes.map(entry => entry.fields.slug));

  return routes;
}

function getPageContent() {
  const client = getSdkClient();
  const previewKey = new URLSearchParams(window.location.search).get('previewKey');

  const routes = client.getEntries({
      'content_type': 'assembly',
      'fields.key': previewKey,
    })
    .then(resp => resp
      .items[0]
      .fields
      .blocks
      .map(block => block.fields));

  return routes;

}

export default {
  getRoutes,
  getPageContent,
}