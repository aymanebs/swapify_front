FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -la src/components/
RUN ls -la src/components/layouts/
RUN cat src/components/layouts/AppLayout.jsx

RUN npm run build

EXPOSE 5180

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]