FROM node:alpine

WORKDIR /usr/dockerrep
COPY ./ ./

RUN npm install
RUN npm run build
CMD ["npm", "start"] 
