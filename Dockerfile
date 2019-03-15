FROM node:latest

RUN mkdir /myFonciaApp
WORKDIR /myFonciaApp

COPY package.json /myFonciaApp
RUN npm install

COPY ./ /myFonciaApp

CMD ["yarn", "test"]
EXPOSE 3000