# Day 5: HTTP/2, WebSockets, Caching Headers

## HTTP/2

- Multiplexing: nhiều request trên một TCP connection
- Header compression (HPACK)
- Server Push
- Binary protocol

## WebSockets

- Full-duplex persistent connection
- Upgrade từ HTTP
- Dùng cho realtime, chat, games

## Caching Headers

- Cache-Control: public, private, no-cache, no-store, max-age, must-revalidate
- ETag (entity tag) – phiên bản tài nguyên
- Last-Modified – thời gian sửa cuối
- Conditional requests: If-None-Match, If-Modified-Since → 304 Not Modified

## DevTools Network

- Quan sát protocol (h2, http/1.1), cache status (304, from disk cache)
- Lọc WebSocket (WS tab)
- Disable cache để so sánh tốc độ tải

## Thực hành

- Thêm Cache-Control và ETag vào response của server
- Dùng curl với header If-None-Match để kiểm tra
