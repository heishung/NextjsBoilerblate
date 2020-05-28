# Playfun - Funtap

## How to use

### Dev

Start app

```bash
yarn dev
# or
npm run dev
```

### Thay đổi port

- window

```bash
  set PORT=3000
```

- linux

```bash
  export PORT=3000
```

### Deploy app

1: Install dependences

- Tất cả các packages

```bash
yarn
#or
npm i
```

- Pm2 (http://pm2.keymetrics.io/docs/usage/quick-start/)

```bash
yarn global add pm2
# or
npm install pm2@latest -g
```

- Nginx

2: Build

-Development

```bash
yarn build-dev
# or
npm run build-dev
```

-Staging

```bash
yarn build-stg
# or
npm run build-stg
```

-Production

```bash
yarn build-prod
# or
npm run build-prod
```

3: Start dưới dạng service sử dụng pm2

-Development

```bash
pm2 restart ecosystem.config.js --env development -i max
```

-Stage

```bash
pm2 restart ecosystem.config.js --env staging -i max
```

-Production

```bash
pm2 restart ecosystem.config.js --env production -i max
```
# NextjsBoilerblate
