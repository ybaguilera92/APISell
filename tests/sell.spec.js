import app from "../app"
import request from "supertest"
import JWT from "../helpers/generateJWT.js";
const accessToken = JWT("639a7a8dc417186ed6a8f7c1");
const tokenExpired = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWE3YThkYzQxNzE4NmVkNmE4ZjdjMSIsImlhdCI6MTY4NjQxODU4MSwiZXhwIjoxNjg2NDE4NjQxfQ.eGRIrUvenNLKulv96kC688T75wNVAUYIJbnxv-V6tZs";

describe("GET /SELLS", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).get("/API/SELL").send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).get("/API/SELL").send().set('Authorization', `Bearer ${tokenExpired}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('msg', 'jwt expired');
    });
});
describe("GET /SELL/gainTotal", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).get("/API/SELL/gainTotal").send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
});
describe("POST /SELL", () => {
    const newSEll = {
        "product": "6483473a8bceec4262e86b6b",
        "count": 1
    }
    test('should create a new sell', async () => {
        const response = await request(app).post('/API/SELL/').send(newSEll).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('res');
        expect(response.body).toHaveProperty('msg', 'This sell is already registered!');
    });

    test('should return an error if not product exists', async () => {
        newSEll.product = "6483473a8bceec4262e86b10"
        const res = await request(app).post('/API/SELL/').send(newSEll).set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('msg', 'This product is not registered!');
    });
    test('should return an error if count greater than 1', async () => {
        newSEll.count = 2
        const res = await request(app).post('/API/SELL/').send(newSEll).set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('msg', 'You cannot buy more than one product!');
    });
    test('should return an error if sotck to equal at 0', async () => {
        const res = await request(app).post('/API/SELL/').send(newSEll).set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('msg', 'This product not have stock!');
    });
});

