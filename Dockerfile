FROM node:20-alpine

COPY package*.json ./

RUN ["npm", "install"]

COPY . .

EXPOSE 5173

# Run Vite dev server on 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]