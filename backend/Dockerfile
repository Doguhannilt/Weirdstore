FROM node:18-alpine

# Çalışma dizinini /app olarak ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package.json ./
COPY package-lock.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kaynak kodunu kopyala
COPY . .

# Uygulamanın dinleyeceği portu aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
