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

 describe("POST /products correct", () => {
     const newProduct = {
         "name": "Mesa",
         "price": 18.6,
         "stock": 25,
         "category": "Nuevo",
         "tags": "Holaa",
         "description": "Mesa linda",
         "info": "buena mesa",
         "val": "Nueva la mesa",
         "sku": "454564656dd",
         "img": "http://sdsadd .dsdadd"
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

describe("POST /PRODUCTS", () => {
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
        const response = await request(app).post("/API/PRODUCT/getSku").send({
            "sku": "250555a"
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).post("/API/PRODUCT/getSku").send();
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'Must submit a sku!');
    });
});

describe("POST /PRODUCTS/COUNT", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).post("/API/PRODUCT/countProducts").send({
            "sku": "250555a",
            "category": "Nuevos"
        });
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).post("/API/PRODUCT/countProducts").send();
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
});
describe("GET /PRODUCT/GET", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).get("/API/PRODUCT/modify-product/64825519ddcfe48c5a4419a4").send().set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
     test('Shuold response with a 200 status code ', async () => {
         const response = await request(app).get("/API/PRODUCT/modify-product/64825519ddcfe48c5a4419a5").send().set('Authorization', `Bearer ${accessToken}`);
         expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'No document found with that ID!');
     });
});
describe("GET /PRODUCT/UPDATE", () => {
    const updateProduct = {
        "name": "Mesa",
        "price": 20,
        "stock": 25,
        "category": "Holas todo",
        "tags": "Holaa",
        "description": "Mesa lindasssss",
        "info": "buena mesa",
        "val": "Nueva la mesa",
        "sku": "250555a",
        "img": "http://sdsadd .dsdadd"
    }
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).put("/API/PRODUCT/modify-product/648255ff7207d46e00526f14").send(updateProduct).set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
    });
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).put("/API/PRODUCT/modify-product/64825519ddcfe48c5a4419a5").send(updateProduct).set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'No product found with that ID!');
    });
    test('Shuold response with a 200 status code ', async () => {
        updateProduct.sku = '250555s';
        const response = await request(app).put("/API/PRODUCT/modify-product/648255ff7207d46e00526f14").send(updateProduct).set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'This sku is associated with another product!');
    });
});
describe("GET /PRODUCT/DELETE", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).delete("/API/PRODUCT/modify-product/6484ab03320a5a1bbe776bd3").send().set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).delete("/API/PRODUCT/modify-product/64825519ddcfe48c5a4419a5").send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'No document found with that ID!');
    });
});