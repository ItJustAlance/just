FROM golang:1.13-alpine

WORKDIR /server
COPY . .
ENV GO111MODULE=on

RUN apk add --no-cache \
        alpine-sdk \
        git \
    && go get github.com/pilu/fresh

CMD ["fresh", "-c", "fresh.conf"]