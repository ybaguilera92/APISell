import app from "../app"
import request from "supertest"
import JWT from "../helpers/generateJWT.js";

const accessToken = JWT("639a7a8dc417186ed6a8f7c1");

describe("GET /PRODUCTS/STOCK", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).get("/API/PRODUCT/getStock").send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
});

 describe("POST /PRODUCTS CREATE", () => {
     const newProduct = {
         "name": "Bate",
         "price": 18.6,
         "stock": 25,
         "category": "for play",
         "tags": "Play",
         "description": "Bate de Beisbol",
         "info": "Nuevo",
         "val": "Nuevo",
         "sku": "456981",
         "img": "http://sdsadd.dsdadd"
     }
     test('should create a new product', async () => {

         const response = await request(app)
             .post('/API/PRODUCT/')
             .send(newProduct).set('Authorization', `Bearer ${accessToken}`);

         expect(response.statusCode).toBe(200);
         expect(response.body).toHaveProperty('res');
         expect(response.body).toHaveProperty('msg', 'A new product create!');
     });

     test('should return an error if sku already exists', async () => {

         const res = await request(app)
             .post('/API/PRODUCT/')
             .send(newProduct).set('Authorization', `Bearer ${accessToken}`);

         expect(res.statusCode).toBe(400);
         expect(res.body).toHaveProperty('msg', 'This sku is already registered!');
     });
 });

describe("POST /PRODUCTS GET", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).post("/API/PRODUCT/getProducts").send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
     test('Shuold response with a 200 status code ', async () => {
         const response = await request(app).post("/API/PRODUCT/getProducts").send({
             "page": 1,
             "category": "Nuevos"
         });
         expect(response.status).toBe(200);
         expect(response.body).toHaveProperty("res");
         expect(response.body).toBeInstanceOf(Object);
     });
});

describe("POST /PRODUCTS/SKU", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).post("/API/PRODUCT/getSku").send({ "sku": "188567" });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('Should return an message if not send a sku ', async () => {
        const response = await request(app).post("/API/PRODUCT/getSku").send({ "sku": "250555" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('msg', 'There is not product with this sku!');
    });
});

describe("POST /PRODUCTS/COUNT", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).post("/API/PRODUCT/countProducts").send({
            "sku": "2552522",
            "category": "Utiles"
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).post("/API/PRODUCT/countProducts").send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe("GET /PRODUCT/GET", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).get("/API/PRODUCT/6485d09c067279481b9d5643").send().set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
     test('Should return an error if not product exists ', async () => {
         const response = await request(app).get("/API/PRODUCT/64825519ddcfe48c5a4419a5").send().set('Authorization', `Bearer ${accessToken}`);
         expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'No document found with that ID!');
     });
});

describe("GET /PRODUCT/UPDATE", () => {
    const updateProduct = {
         "name": "Pelota",
         "price": 5.5,
         "stock": 10,
         "category": "for play",
         "tags": "Play",
         "description": "Basket",
         "info": "Nuevo",
         "val": "Nuevo",
         "sku": "920726",
         "img": "http://sdsadd.dsdadd"
    }
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).put("/API/PRODUCT/648730b51176da6ba485d757").send(updateProduct).set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
    });
    test('Should return an error if not product exists', async () => {
        const response = await request(app).put("/API/PRODUCT/64825519ddcfe48c5a4419a5").send(updateProduct).set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'No product found with that ID!');
    });
    test('Should return an error if you try to change a sku to another that already exists and is associated with another user ', async () => {
        updateProduct.sku = '412561';
        const response = await request(app).put("/API/PRODUCT/648730b51176da6ba485d757").send(updateProduct).set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'This sku is associated with another product!');
    });
});
describe("GET /PRODUCT/DELETE", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).delete("/API/PRODUCT/648730b51176da6ba485d757").send().set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('Should return an error if not product exists or has it already been removed before ', async () => {
        const response = await request(app).delete("/API/PRODUCT/648730b51176da6ba485d757").send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'No document found with that ID!');
    });
});