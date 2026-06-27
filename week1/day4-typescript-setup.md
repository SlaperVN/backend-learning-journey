# Day 4: TypeScript Setup, ESM vs CJS, HTTP Server

## TypeScript Config

- `tsconfig.json` with `target: ES2022`, `module: NodeNext`
- `strict: true` – bảo vệ code khỏi lỗi ngầm
- `outDir: ./dist` – output build

## Module Systems

- CommonJS: `require` / `module.exports` (cũ)
- ESM: `import` / `export` (mới, dùng trong project)
- Đánh dấu bằng `"type": "module"` trong package.json

## HTTP Server with TypeScript

- Dùng `http.createServer` thuần (không framework)
- Interface `IHttpRequest` và `IHttpResponse` để mô tả dữ liệu
- Hàm `parseRequest` dùng Promise để đọc body
- Routing đơn giản bằng `if-else` dựa vào `req.url`

## Commands learned

- `pnpm dev` – chạy với tsx watch
- `pnpm build` – build ra dist
- `pnpm start` – chạy production
