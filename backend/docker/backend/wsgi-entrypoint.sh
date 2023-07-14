#!/bin/sh

# Переходим в папку проекта.
until cd /app/backend/pr8/
do
    echo "Waiting for server volume..."
    sleep 2
done

# Запускаем миграции.
until poetry run python manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

# Создаем админа.
poetry run python manage.py createsuperuser --noinput

# Собираем статику.
poetry run python manage.py collectstatic --noinput

# # Запускаем WSGI-сервер.
# poetry run gunicorn pr8.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4

# Запускаем ASGI-сервер. 
# Благодаря приложения daphne команда запускает не сервер отладкки, а ASGI-сервер Daphne.
poetry run python manage.py runserver 0.0.0.0:8000


#####################################################################################
# Options to DEBUG Django server
# Optional commands to replace abouve gunicorn command

# Option 1:
# run gunicorn with debug log level
# gunicorn pr8.wsgi --bind 0.0.0.0:8000 --workers 1 --threads 1 --log-level debug

# Option 2:
# run development server
# DEBUG=True ./manage.py runserver 0.0.0.0:8000
