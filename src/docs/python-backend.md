---
title: Python Backend Standards
date: "2023-04-26T16:04:44.000Z"
author: David Buckley
summary: Standards for developing backend services with Python.
---

These are some standards we follow for developing backend tools in Python.

## Python Tools

- [pytest](https://docs.pytest.org/en/7.2.x/) for testing.
- [FastAPI](https://fastapi.tiangolo.com/) for APIs and microservices.
  - [Uvicorn](https://www.uvicorn.org/) as the ASGI server.
  - [Beanie ODM](https://beanie-odm.dev/) with MongoDB (pymongo).
    - Make sure to [cascade delete links](https://github.com/roman-right/beanie/discussions/349) if needed.
  - Example repo with JWT auth: [fastapi-beanie-jwt](https://github.com/flyinactor91/fastapi-beanie-jwt).
- [Django](https://www.djangoproject.com/) for monolith apps.
  - [PostgreSQL](https://www.postgresql.org/) for database.
  - [cookiecutter-django](https://github.com/cookiecutter/cookiecutter-django) for the project setup.
- Celery for background tasks.
  - [FastAPI Celery](https://github.com/testdrivenio/fastapi-celery)
  - [Django Celery](https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html)

## DevOps

Use [Docker](https://www.docker.com/) (optional: with Docker Desktop). Use [black](https://black.readthedocs.io/en/stable/) for formatting Python. Use [traefik](https://traefik.io/) as a load balancer/reverse proxy.
