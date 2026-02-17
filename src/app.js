const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const routes = require('./routes');
const cors = require('cors')


app.use(cors({
        origin: "http://localhost:5174/"
    }))
const options = {

    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node.js",
            version: "1.0.0"
        },

        // 👇 ВАЖНО — ВСЁ ДОЛЖНО БЫТЬ ЗДЕСЬ
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },  

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ["./src/routes/*.js"]
};

const spec = swaggerJSDoc(options);

app.use(express.json());
app.use(routes);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

app.listen(3000, ()=>{
    console.log(`Server started on http://localhost:3000/api-docs`);
});
