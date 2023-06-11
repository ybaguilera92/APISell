import app from "../app"
import request from "supertest"
import JWT from "../helpers/generateJWT.js";

const accessToken = JWT("639a7a8dc417186ed6a8f7c1");



describe("POST /USER correct", () => {
    const newUser = {
        "name": "Yanelys",
        "lastName": "Benedico",
        "username": "tita2",
        "email": "ybenedico2@unica.cu",
        "password": "admin123*",
        "role": "Editor"
    }
    test('should create a new USER', async () => {

        const response = await request(app).post('/API/USER/addUser').send(newUser).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('res');
        expect(response.body).toHaveProperty('msg', 'New user created!');
    });

    test('should return an error if email already exists', async () => {

        const response = await request(app).post('/API/USER/addUser').send(newUSER).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('msg', 'This email is already registered!');

    });

    test('should return an error if username already exists', async () => {

        const response = await request(app).post('/API/USER/addUser').send(newUSER).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('msg', 'This username is already registered!');

    });
});

describe("POST /USERS/LOGIN", () => {
    const login = {
        "username": "admin",
        "password": "admin123*"
    }
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).post("/API/USER/").send(login);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('should return an error if username is not register ', async () => {
        login.username = "yoel";
        const response = await request(app).post("/API/USER/").send(login);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('msg', 'Username is not register!');
    });
    test('should return an error if your account is enabled ', async () => {
        const response = await request(app).post("/API/USER/").send(login);
        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty('msg', 'Your account is enabled!');
    });
    test('should return an error if password incorrect! ', async () => {
        login.username = "admin";
        login.password="admin";
        const response = await request(app).post("/API/USER/").send(login);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('msg', 'Password incorrect!');
    });
});

describe("GET /USER/", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).get("/API/USER/6485d26ae9e1bfc0f39797b2").send().set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('Shuold response with a 404 status code ', async () => {
        const response = await request(app).get("/API/USER/64825519ddcfe48c5a4419a5").send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'No document found with that ID!');
    });
});


describe("GET /USERS", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).get("/API/USER/getUsers").send().set('Authorization', `Bearer ${accessToken}`);
        console.log(response.error);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });   
});

describe("GET /USER/UPDATE", () => {
    const updateUser = {
        "name": "Yanelys",
        "lastName": "Benedicos",
        "username": "tita",
        "email": "ybenedico@unica.cu",
        "password": "admin123**",
        "role": "Editor",
        "enabled": true
    }
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).put("/API/USER/6485d26ae9e1bfc0f39797b2").send(updateUser).set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
    });
    test('should return an error if id is not exist', async () => {
        const response = await request(app).put("/API/USER/6485d26ae9e1bfc0f39797b6").send(updateUser).set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'No user found with that ID!');
    });   
});

describe("GET /USER/DELETE", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).delete("/API/USER/6485d26ae9e1bfc0f39797b2").send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).delete("/API/USER/64825519ddcfe48c5a4419a5").send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'No document found with that ID!');
    });
});
