FROM node:20
ARG REACT_APP_BACKEND_URI
ENV REACT_APP_BACKEND_URI=$REACT_APP_BACKEND_URI

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
RUN npm install --save-dev @types/node
RUN npm install dotenv

COPY . .
RUN npm run build

RUN if [ ! -d "dist" ]; then echo "Build failed - no dist directory created" && exit 1; fi

RUN npm install -g serve
EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000", "--single"]