# Day 3: Headers, URL & GitHub API

## URL Structure

scheme://host:port/path?query#fragment

## Headers learned

- Content-Type: JSON, form, multipart
- Authorization: Bearer <token>
- Accept: client expected format
- Cache-Control: caching policies

## GitHub API practice

- GET /user (auth required)
- GET /user/repos?per_page=5
- POST /repos/{owner}/{repo}/issues (with JSON body)
- PATCH /repos/{owner}/{repo}/issues/{number}
- DELETE → 410 Gone (lesson learned)

## Postman skills

- Created Environment with variables {{baseUrl}}, {{token}}
- Used {{variable}} in URL and Headers
- Saved responses as examples
