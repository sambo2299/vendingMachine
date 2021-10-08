# vendingMachine

requirements:
  nodejs: latest
  docker: v19.03.6
  docker-compose: v1.25.5

run service on docker container
  cd PROJ_ROOT_DIR
  docker-compose up --build

run service without docker container
  build client app
    cd PROJ_ROOT_DIR/client/vending-machine
    npm install
    npm run build
  
  build and run nodejs service
    cd PROJ_ROOT_DIR/
    npm install
    npm start

open browser http://localhost:8080




