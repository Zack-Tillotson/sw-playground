// Takes a Contentful Page data object & converts to a more easily usable form
function convert(assembly) {

  const {blocks, key} = assembly.fields;

  let page = {};
  try {
    const pageMeta = blocks.find(block => block.sys.contentType.sys.id === 'topicPage');
    const {title, description, introduction, slug} = pageMeta.fields;
    page = {...page, title, description, introduction, slug};
  } catch(e) {}

  try {
    const contentBlocks = blocks
    .find(block => block.sys.contentType.sys.id === 'assembly' && block.fields.key === key + '.content')
    .fields
    .blocks
    .map(block => {
      const {slug, path, appearance, content} = block.fields;
      const type = content.sys.contentType.sys.id;
      return {slug, path, appearance, ...content.fields, type}
    });
    page.content = contentBlocks;
  } catch(e) {}

  return page;
}

export default convert;