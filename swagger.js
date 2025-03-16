const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts Api',
    description: 'Contacts Api'
  },
  host: 'localhost:3000',
  schemas: ['https', 'http']
};

const outputFile = './swagger.json';
const endPointFiles = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// This will generate swagger.json
swaggerAutogen(outputFile, endPointFiles, doc);