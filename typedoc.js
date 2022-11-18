// typedoc.js
/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {

  entryPoints: ["src/index.ts"],
  entryPointStrategy:'expand',
//  excludeNotDocumented:true,
//  json:'treeGardenSchema.json',
  out: './rawHtmlDocs',
  sort:'source-order',
  intentionallyNotExported: [],   // can be useful

  // settings for markdown renderer plugin
  hideBreadcrumbs:true,
//  hideInPageTOC:true,
  hideMembersSymbol:true,

}
