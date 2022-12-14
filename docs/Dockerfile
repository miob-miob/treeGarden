# create API markdown files according to src with help of typedoc
FROM node:16-alpine3.16 as apiDocsBuilder

WORKDIR /workdir
COPY src ./src
COPY typedoc.js tsconfig.json package.json package-lock.json ./
RUN npm i && npm run generateApiDoc



# create static html pages from markdown files in docs with help of mkdocs material
FROM squidfunk/mkdocs-material as staticFilesBuilder

WORKDIR /workdir
COPY docs ./docs

# see typedoc.js for output path
COPY --from=apiDocsBuilder /workdir/docs/pages/api ./docs/pages/api
WORKDIR /workdir/docs/
RUN mkdocs build



# static docs server
FROM nginx:1.23.2-alpine

# see docs/mkdocs.yml for output path of mkdocs
# generated html to default nginx dir
COPY --from=staticFilesBuilder /workdir/docs/html /usr/share/nginx/html


# by default nginx listen on 80
# example how to change various configurations using env
COPY docs/nginx_server_template.conf /etc/nginx/templates/default.conf.template
ENV NGINX_CUSTOM_PORT=80


