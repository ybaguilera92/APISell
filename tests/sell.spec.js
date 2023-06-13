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
    test('Shuold response with a 400 status code ', async () => {
        const response = await request(app).get("/API/SELL").send().set('Authorization', `Bearer ${tokenExpired}`);
        expect(response.status).toBe(400);
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
        "user": "64875bd043ae1f07af510b06",
        "products": [{
                "product": "6485d0a7067279481b9d5647",
                "count": 1
            },
            {
                "product": "6485d20baff760137163e7f9",
                "count": 1
            }
        ]
    }
    test('should create a new sell', async () => {
        const response = await request(app).post('/API/SELL/addSells').send(newSEll).set('Authorization', `Bearer ${accessToken}`);
        console.log(response.error.message);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('msg', 'Sells registered successfully!');
    });

    test('should return an error if not user exists', async () => {
        newSEll.user = "64875bd043ae1f07af510b01"
        const res = await request(app).post('/API/SELL/addSells').send(newSEll).set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('msg', 'This user is not registered!');
    });

    test('should return an error if not product exists', async () => {
        newSEll.user = "64875bd043ae1f07af510b06"
        newSEll.products[0].product = "6483473a8bceec4262e86b10"
        const res = await request(app).post('/API/SELL/addSells').send(newSEll).set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('msg', 'This product is not registered!');
    });
    test('should return an error if count greater than 1', async () => {
        newSEll.products[0].product = "6485d0a7067279481b9d5647"
        newSEll.products[0].count = 2
        const res = await request(app).post('/API/SELL/addSells').send(newSEll).set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(400);
    });
    test('should return an error if sotck to equal at 0', async () => {
        const res = await request(app).post('/API/SELL/addSells').send(newSEll).set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(400);
    });
    test('should return an error if this category exist in more than product!', async () => {
        newSEll.products[1].product = "6485d0b8067279481b9d564d"
        const res = await request(app).post('/API/SELL/addSells').send(newSEll).set('Authorization', `Bearer ${accessToken}`);
        expect(res.statusCode).toBe(400);
    });
});


