# Installation et mise en service du frontend et du backend

## Clone

- Téléchargement du backend ici : https://github.com/Kaupaunha/Projet_6_Coponat_Fanny
ou
`$ git clone https://github.com/Kaupaunha/Projet_6_Coponat_Fanny.git `

- Téléchargement du frontend ici : https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6   
ou  
`$ git clone https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git` 


## Backend

`$ cd backend`

`$ npm install `

`$ npm install -g nodemon `

`$ npm install mongoose `

- Création du fichier `.env` à la racine du répertoire et insérer le lien pour se connecter à une base de donnée mongodb : 

`secret_DB = "mongodb+srv//..."` 


- Lancez le projet : 
`$ nodemon server `


## FrontEnd

`$ cd frontend`

`$ npm run start`

Dans le navigateur mettre l'adresse : http://localhost:4200/


## Les dépendances du backend
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-mongo-sanitize": "^2.2.0",
    "express-rate-limit": "^6.7.0",
    "helmet": "^6.0.1",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^6.7.4",
    "mongoose-unique-validator": "^3.1.0",
    "multer": "^1.4.5-lts.1",
    "node-esapi": "^0.0.1",
    "password-validator": "^5.3.0",
    "validator": "^13.7.0"

