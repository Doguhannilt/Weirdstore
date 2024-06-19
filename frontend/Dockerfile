# Node.js tabanlı Alpine imajını kullan
FROM node:alpine

# Çalışma dizinini /app olarak ayarla ve oluştur
WORKDIR /app

# Geri kalan dosyaları /app dizinine kopyala
COPY . .

# Eğer package.json varsa, bağımlılıkları yükle
RUN if [ -f package.json ]; then npm install; fi

# Uygulamayı çalıştır
CMD ["node", "index.js"]
