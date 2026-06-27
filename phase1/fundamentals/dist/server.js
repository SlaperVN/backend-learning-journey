import http from 'http';
function parseRequest(req) {
    return new Promise((resolve, reject) => {
        let rawBody = '';
        req.on('data', (chunk) => {
            rawBody += chunk.toString();
        });
        req.on('end', () => {
            const request = {
                method: req.method ?? 'GET',
                url: req.url ?? '/',
                headers: req.headers,
                body: rawBody || undefined,
            };
            resolve(request);
        });
        req.on('error', (err) => reject(err));
    });
}
async function handleRequest(req, res) {
    const parsedReq = await parseRequest(req);
    console.log(`[${new Date().toISOString()}] ${parsedReq.method} ${parsedReq.url}`);
    console.log('Headers:', parsedReq.headers);
    if (parsedReq.body) {
        console.log('Body:', parsedReq.body);
    }
    let response = {
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
    if (parsedReq.url === '/health') {
        response.body = JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() });
    }
    else if (parsedReq.url === '/echo' && parsedReq.method === 'POST') {
        response.body = JSON.stringify({
            echo: parsedReq.body || 'No body provided',
        });
    }
    else if (parsedReq.url === '/') {
        response.body = JSON.stringify({
            message: 'Welcome to Backend Learning Journey',
            endpoints: ['GET /health', 'POST /echo', 'GET /'],
        });
    }
    else if (parsedReq.url?.startsWith('/user/')) {
        const userId = parsedReq.url.split('/')[2];
        response.body = JSON.stringify({ userId, name: `User ${userId}` });
    }
    res.writeHead(response.statusCode, response.headers);
    res.end(response.body);
}
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server = http.createServer(handleRequest);
server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📡 Try: http://localhost:${PORT}/health`);
    console.log(`📡 Try: http://localhost:${PORT}/user/123`);
});
server.on('error', (err) => {
    console.error('Server error:', err);
});
//# sourceMappingURL=server.js.map