from node:latest
copy . .
RUN npm install
EXPOSE 3000
CMD [ "npm","start" ]