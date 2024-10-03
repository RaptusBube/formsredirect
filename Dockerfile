FROM node:22.0

RUN git clone https://github.com/Vantarc/formsredirect.git /src/

WORKDIR /src

RUN ls -la

RUN npm install


CMD node src/index.js