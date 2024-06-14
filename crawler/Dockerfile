FROM node:15.14.0-alpine3.13 as base
LABEL maintainer="Daniel Mwangila <seedbackend@gmail.com>"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

WORKDIR /src
RUN apk update && apk add --no-cache --virtual \
        .build-deps \
        udev \
        ttf-opensans \
        chromium \
        ca-certificates

# FROM base as build
# WORKDIR /src
# COPY ./package.json .


FROM base
# COPY --from=build /src/node_modules node_modules
WORKDIR /out
COPY . .

RUN npm install
RUN npm run build:tsc
RUN npm prune

RUN addgroup -S pptruser && adduser -S -g pptruser -G pptruser pptruser \
&& mkdir -p /home/pptruser/Downloads \
&& chown -R pptruser:pptruser /home/pptruser \
&& chown -R pptruser:pptruser /out

USER pptruser
EXPOSE 5000
CMD [ "npm", "start" ]
