# pull official base image
FROM node:lts AS build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
#ENV REACT_APP_MILIKI_URL https://backend-dev-miliki.k8s.tracom.co.ke:2020
#ENV REACT_APP_CUBA_URL https://backend-dev-miliki.k8s.tracom.co.ke:2020/app/rest/


# install app dependencies
COPY package.json ./
#COPY package-lock.json ./
RUN yarn install --ignore-engines
RUN yarn add react-scripts@4.0.1 -g

# add app
COPY . ./
RUN yarn run build
COPY dist ./

# Production env
FROM nginx:1.18.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# start app
#CMD ["npm", "start"]
