FROM node:6

EXPOSE  3333

ADD . /code

WORKDIR /code/dist

CMD python -m SimpleHTTPServer 3333
