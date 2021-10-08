FROM node:12.13-alpine

RUN mkdir -p /home/vending-machine

COPY . /home/vending-machine
 
WORKDIR /home/vending-machine

ENV CONTAINER_URL http://localhost:8080

WORKDIR /home/vending-machine/client/vending-machine
RUN npm install 
RUN REACT_APP_CONTAINER_URL=${CONTAINER_URL} npm run build

WORKDIR /home/vending-machine
RUN npm install

ENV PORT 8080

EXPOSE ${PORT}

CMD ["npm", "run", "start"]





