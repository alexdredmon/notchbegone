# Notch Be Gone 💻
[![Build, Test, & Deploy](https://github.com/alexdredmon/notchbegone/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/alexdredmon/notchbegone/actions/workflows/firebase-hosting-merge.yml)

Dress up your notch with a smart looking dark title bar, custom tailored to your image - no installation required.

https://notchbegone.com

## Requirements

- [Yarn](https://yarnpkg.com/en/) - Builds and runs frontend application

- [Docker Desktop](https://www.docker.com/products/docker-desktop) - Builds and runs API container


## Setup

1. (Optional) Build API container (you can alternatively point to the production API in web/.env)

  ```bash
  docker-compose build
  docker-compose up api
  ```

2. Build frontend application

  ```bash
  cd web
  yarn
  ```

3. Run frontend application

  ```bash
  yarn start
  ```

4. (Optional) Run frontend tests

  ```bash
  cd web
  yarn test
  ```
