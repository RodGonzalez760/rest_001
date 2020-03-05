FROM node
COPY . c:/laragon/www/dockering
WORKDIR c:/laragon/www/dockering
RUN npm install
EXPOSE 5000
ENTRYPOINT ["npm", "start"]