FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY --from=build /app/dist /app/dist

COPY --from=build /app/src /app/src

EXPOSE 3000

CMD ["npm", "run", "dev"]
