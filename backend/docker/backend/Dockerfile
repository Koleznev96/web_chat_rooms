FROM python:3.10.5-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Добавляем все файлы с зависимостями.
WORKDIR /app
ADD ./backend/poetry.lock ./backend/pyproject.toml /app/backend/

# Ставим зависимости.
WORKDIR /app/backend
RUN pip install --upgrade pip
RUN pip install poetry
RUN poetry config virtualenvs.in-project true
RUN poetry install --without dev

WORKDIR /app
ADD ./docker /app/docker
ADD ./backend /app/backend

# git добавляет символы \r, что вызывает проблемы при исполнении скриптов.
# bash-скрипты могут не работать из-за символов '\r'. Удаляем их, записываем результат
# в новый файл и затем обратно переименовываем файл в исходное название.
WORKDIR /app/docker/backend
RUN cat wsgi-entrypoint.sh | tr -d '\r' >> wsgi-entrypoint_tmp.sh
RUN rm wsgi-entrypoint.sh
RUN mv wsgi-entrypoint_tmp.sh wsgi-entrypoint.sh
RUN chmod 755 wsgi-entrypoint.sh
