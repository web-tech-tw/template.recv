FROM node:18-alpine

ENV RUNTIME_ENV container

RUN adduser -u 3000 -D recv

RUN mkdir -p /.npm /workplace
WORKDIR /workplace
ADD . /workplace

RUN chown -R \
    3000:3000 \
    /.npm /workplace

USER 3000
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
