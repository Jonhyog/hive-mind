FROM node:18-alpine

WORKDIR /srv/app

COPY package.json .

RUN corepack enable pnpm

RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev"]