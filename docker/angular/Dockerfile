FROM node:10-alpine

RUN apk add --no-cache curl git bash jq vim

RUN mkdir -p /var/nodejs/marvel-front-ng/current && chown -R node:node /var/nodejs/marvel-front-ng/current

WORKDIR /var/nodejs/marvel-front-ng/current

COPY ./run.sh /usr/local/bin/
#COPY ./healthcheck.sh /usr/local/bin

RUN chmod +x /usr/local/bin/run.sh && \
#    chmod +x /usr/local/bin/healthcheck.sh && \
    git clone https://github.com/wako057/linuxinit.git && linuxinit/init.sh && \
    npm install -g @angular/cli

RUN npm install

EXPOSE 4200
#HEALTHCHECK --interval=5s --timeout=20s --retries=1 CMD healthcheck.sh

CMD [ "/usr/local/bin/run.sh" ]
