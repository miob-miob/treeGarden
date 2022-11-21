from mkdocs.structure.nav import Navigation, Section
from mkdocs.structure.pages import Page
from mkdocs.config import Config
from mkdocs.structure.files import Files, File
import re

api_docs_title = 'api_docs'
module_file_regex = re.compile(r"api\/modules\/(?P<name>\w+)\.md")


# lets sdd submodules for api docs section and made title human readable
def on_nav(nav: Navigation, config: Config, files: Files):
    api_docs_section = [section for section in nav.items if section.title == api_docs_title][0]
    api_docs_section.title = 'Api documentation'
    for page_file in files.documentation_pages():
        match = module_file_regex.match(page_file.src_uri)
        if match is None:
            continue

        module_name = match.group('name')
        new_page = Page(module_name, page_file, config)
        api_docs_section.children.append(new_page)


all_pages_in_api_doc_folder_re = re.compile(r"api\/.+")

# hack metadata (hide toc on all api doc pages)
def on_page_read_source(page: Page, config: Config):
    if all_pages_in_api_doc_folder_re.match(page.file.src_uri):
        with open(page.file.abs_src_path, encoding='utf-8-sig', errors='strict') as f:
            source = f.read()
        # hide toc with metadata
        hacked_source = f"---\nhide: \n  - toc\n---\n{source}"
        return hacked_source

def on_page_markdown(markdown:str,page: Page, config: Config,files:Files):
    if all_pages_in_api_doc_folder_re.match(page.file.src_uri):
        markdown = markdown.replace('# tree-garden','# index',1) # top title of index page
        markdown = markdown.replace('## Table of contents','',1) # fix bit md produced by typedoc
        return markdown



