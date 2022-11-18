// typedoc.js
/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {

  entryPoints: ["src/index.ts"],
  entryPointStrategy:'expand',
//  excludeNotDocumented:true,
//  json:'treeGardenSchema.json',
  out: './docs/pages/api',
  sort:'source-order',

  // settings for markdown renderer plugin
  hideBreadcrumbs:true,
//  hideInPageTOC:true,
  hideMembersSymbol:true

}
