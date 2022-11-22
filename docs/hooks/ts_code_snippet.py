from os import getcwd, path
import re
from pathlib import Path


supported_extensions = [
    'ts',
    'json'
]

joined_extensions = '|'.join(supported_extensions)

find_ts_link_re = re.compile(rf"\[code_file\]\((?P<code_file_path>.+\.(?P<extension>{joined_extensions}))\)")


def process_ts_links(raw_md: str):
    results = find_ts_link_re.finditer(raw_md)

    for match in results:
        whole_match = match.group(0)
        ts_path = Path(match.group('code_file_path'))
        extension = match.group('extension')
        path_wo_docs = path.join(*ts_path.parts[1:])
        full_path = path.join(getcwd(), path_wo_docs)
        with open(full_path) as file:
            ts_file_content = file.read()
        # we need to fix import to library
        ts_content_with_fixed_import = ts_file_content.replace("'../../src'", "'tree-garden'")
        md_code_block = """
```{}
{}
```
""".format(extension,ts_content_with_fixed_import)
        raw_md = raw_md.replace(whole_match, md_code_block, 1)

    return raw_md


def on_page_markdown(markdown, **kwargs):
    return process_ts_links(markdown)
