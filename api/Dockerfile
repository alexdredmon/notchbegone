FROM alexredmon/python-api:1.0.0

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY . /app

CMD ["app.py"]
