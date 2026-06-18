# Day 2: DNS, TLS, TCP basics

## DNS

- A record: map domain → IPv4
- CNAME: alias (www → domain)
- Cách dùng `nslookup` để tra A, CNAME, MX, NS

## TCP 3-way handshake

- SYN → SYN-ACK → ACK

## TLS handshake

- ClientHello → ServerHello + Certificate → Key Exchange → ChangeCipherSpec
- Thực hành với `openssl s_client` xem chứng chỉ google.com

## Lệnh đã dùng

nslookup github.com
openssl s_client -connect google.com:443 -servername google.com | openssl x509 -text -noout
