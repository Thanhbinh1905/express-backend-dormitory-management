# Sử dụng Node.js làm image cơ sở
FROM node:14

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các gói
RUN npm install

# Sao chép mã nguồn vào image
COPY . .

# Expose cổng
EXPOSE 3001

# Chạy ứng dụng
CMD ["npm", "start"]
