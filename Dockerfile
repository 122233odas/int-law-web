FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies 
# Note: we use ci for clean install, and include --build-from-source for bcrypt if needed (though alpine usually has prebuilds or we add python/make)
# For simplicity in alpine with native deps like bcrypt:
RUN apk add --no-cache python3 make g++ 
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
