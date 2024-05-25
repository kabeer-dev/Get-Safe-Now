const SwaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fs = require('fs');
const path = require('path');

// const directoryPath = path.resolve('./swagger/v1');

// console.log(directoryPath)
const swaggerFiles = ['./swagger/v1/main.yaml', './swagger/v1/auth.yaml'];
// Add paths to any other YAML files as needed

let mergedSwagger = {};
// console.log(swaggerFiles)
swaggerFiles.forEach(file => {
  const yamlData = fs.readFileSync(file, 'utf8');
  const swagger = YAML.parse(yamlData);
  mergedSwagger = { ...mergedSwagger, ...swagger };
});

const options = {
  customSiteTitle: "Help So Easy"
};

module.exports = {
  swaggerServe: SwaggerUi.serve,
  swaggerSetup: SwaggerUi.setup(mergedSwagger, options)
};
