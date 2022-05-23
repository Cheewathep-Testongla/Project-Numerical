FROM node:16.13.2

# Create Directory 
RUN mkdir /frontend

WORKDIR /frontend

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . /frontend/

COPY package.json /frontend/ 

RUN npm install

RUN npm install react-scripts -g 

# RUN yarn install

CMD ["npm","start"]