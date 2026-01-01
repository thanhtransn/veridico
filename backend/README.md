### Run Command
- Need
  - docker-desktop
  - database
    - script: 
      - docker pull postgres:16
      - docker run --name postgres-db -e POSTGRES_DB=veridico -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=thanh1708 -p 5432:5432 -d postgres:16
      - docker exec -i postgres-db psql -U postgres -d veridico < src/database/seed/init.sql (Window)
      - yarn db:migration
      - yarn start
- Test
  - account: 
    - email: superadmin@gmail.com
    - password: admin

