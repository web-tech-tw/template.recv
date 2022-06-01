FROM node:16-alpine

ENV RUNTIME_ENV container

RUN mkdir -p /workplace
WORKDIR /workplace
ADD . /workplace

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
