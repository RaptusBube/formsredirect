FROM node:22.0

RUN git clone https://github.com/Vantarc/formsredirect.git /src

WORKDIR /src

RUN npm install


CMD node index.js