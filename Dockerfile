FROM ubuntu:18.04

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
# entrypoint.sh 파일에 권한 부여

ENTRYPOINT [ "/entrypoint.sh" ]
