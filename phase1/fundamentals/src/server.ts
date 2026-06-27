// 1. Định nghĩa Interface mô tả Request (bạn có thể mở rộng sau)
interface IHttpRequest {
  method: string;
  url: string;
  headers: Record<string, string | string[] | undefined>;
  body?: string;
}

// 2. Định nghĩa Interface cho Response
interface IHttpResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

// 3. Import http module từ Node.js
import http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

// 4. Hàm parse request để lấy method, url, headers và body
function parseRequest(req: IncomingMessage): Promise<IHttpRequest> {
  return new Promise((resolve, reject) => {
    let rawBody = '';
    req.on('data', (chunk: Buffer) => {
      rawBody += chunk.toString();
    });
    req.on('end', () => {
      const request: IHttpRequest = {
        method: req.method ?? 'GET',
        url: req.url ?? '/',
        headers: req.headers,
        body: rawBody || undefined,
      };
      resolve(request);
    });
    req.on('error', (err: Error) => reject(err));
  });
}

// 5. Hàm xử lý logic chính (router đơn giản)
async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  // Parse request thành định dạng IHttpRequest
  const parsedReq = await parseRequest(req);
  
  // Log request ra console để quan sát (đúng yêu cầu mini project)
  console.log(`[${new Date().toISOString()}] ${parsedReq.method} ${parsedReq.url}`);
  console.log('Headers:', parsedReq.headers);
  if (parsedReq.body) {
    console.log('Body:', parsedReq.body);
  }

  // Xây dựng response theo interface IHttpResponse
  let response: IHttpResponse = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Hello from TypeScript HTTP server!',
      received: {
        method: parsedReq.method,
        url: parsedReq.url,
        headers: parsedReq.headers,
        body: parsedReq.body || null,
      },
    }),
  };

  // Routing đơn giản
  if (parsedReq.url === '/health') {
    response.body = JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() });
  } else if (parsedReq.url === '/echo' && parsedReq.method === 'POST') {
    response.body = JSON.stringify({
      echo: parsedReq.body || 'No body provided',
    });
  } else if (parsedReq.url === '/') {
    response.body = JSON.stringify({
      message: 'Welcome to Backend Learning Journey',
      endpoints: ['GET /health', 'POST /echo', 'GET /'],
    });
  } else if (parsedReq.url?.startsWith('/user/')) {
    // Giả lập lấy user từ path (ví dụ /user/123)
    const userId = parsedReq.url.split('/')[2];
    response.body = JSON.stringify({ userId, name: `User ${userId}` });
  }

  // Gửi response
  res.writeHead(response.statusCode, response.headers);
  res.end(response.body);
}

// 6. Tạo HTTP server
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server = http.createServer(handleRequest);

// 7. Lắng nghe
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 Try: http://localhost:${PORT}/health`);
  console.log(`📡 Try: http://localhost:${PORT}/user/123`);
});

// 8. Xử lý lỗi và graceful shutdown
server.on('error', (err: Error) => {
  console.error('Server error:', err);
});