# Concept https://docs.docker.com/develop/develop-images/multistage-build/

# install dependency และ build
FROM registry.thinknet.co.th/sredev/node:16.14 AS builder

COPY . /usr/src/app/

RUN yarn -q install --production=false --silent && \
    yarn run build && \
    yarn -q install --production=true --silent && \
    yarn cache clean

# แยก stage จะช่วยให้สามารถลดขนาดของ image ได้
FROM registry.thinknet.co.th/sredev/node:16.14

COPY --from=builder /usr/src/app/ /usr/src/app/

CMD ["yarn", "run", "start"]