# 1. ビルドステージ (Node.js環境でViteアプリをビルド)
FROM node:20-alpine AS build

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をコピーしてインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピーし、本番用ビルドを実行
COPY . .
RUN npm run build

# 2. 実行ステージ (Nginx環境でビルドされた静的ファイルを提供)
FROM nginx:alpine AS production

# ビルドステージからビルド結果（静的ファイル）をコピー
# Viteのデフォルトの出力ディレクトリは 'dist' です
COPY --from=build /app/dist /usr/share/nginx/html

# Nginxのカスタム設定ファイルをコピー
# フォルダごとコピーする
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Nginxがデフォルトでリッスンするポート80を公開
EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]