FROM node

RUN npm -g config set proxy ${HTTP_PROXY}
RUN npm -g config set https-proxy ${HTTP_PROXY}
RUN npm install -g @angular-devkit/build-angular
RUN npm install -g @angular/cli
ADD startup.sh /
RUN chmod +x /startup.sh
