import app from "../app"
import request from "supertest"
import JWT from "../helpers/generateJWT.js";

const accessToken = JWT("639a7a8dc417186ed6a8f7c1");



describe("POST /USER CREATE", () => {
    const newUser = {
        "name": "Yolanda",
        "lastName": "Aguilera",
        "username": "yoly",
        "email": "yolanda@unica.cu",
        "password": "admin123*",
        "address": "Arnaldo Ramirez 305",
        "phone": "50126555",
        "role": "Administrator"
    };
    test('Should create a new user', async () => {

        const response = await request(app).post('/API/USER/addUser').send(newUser).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('res');
        expect(response.body).toHaveProperty('msg', 'New user created!');
    });

    test('Should return an error if email already exists', async () => {
        newUser.email = "tita@unica.cu";
        const response = await request(app).post('/API/USER/addUser').send(newUser).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('msg', 'This email is already registered!');

    });

    test('Should return an error if username already exists', async () => {
        newUser.email = "yolanda2@unica.cu";
        newUser.username = "tita";
        const response = await request(app).post('/API/USER/addUser').send(newUser).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('msg', 'This username is already registered!');

    });
});

describe("POST /USER REGISTER", () => {
    const newUser = {
        "name": "Herisbel",
        "lastName": "Crespo",
        "username": "crespo",
        "email": "crespo@unica.cu",
        "password": "admin123*",
        "address": "Arnaldo Ramirez 305",
        "phone": "58526555"
    };
    test('Should register a new user', async () => {

        const response = await request(app).post('/API/USER/register').send(newUser);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('res');
        expect(response.body).toHaveProperty('msg', 'New user registered!');
    });

    test('Should return an error if email already exists', async () => {
        newUser.email = "tita@unica.cu";
        const response = await request(app).post('/API/USER/register').send(newUser);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('msg', 'This email is already registered!');

    });

    test('Should return an error if username already exists', async () => {
        newUser.email = "yolanda2@unica.cu";
        newUser.username = "tita";
        const response = await request(app).post('/API/USER/register').send(newUser);
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
    test('Should return an error if username is not register ', async () => {
        login.username = "yoel";
        const response = await request(app).post("/API/USER/").send(login);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('msg', 'Username is not register!');
    });  
    test('Should return an error if password is incorrect! ', async () => {
        login.username = "admin";
        login.password="admin";
        const response = await request(app).post("/API/USER/").send(login);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('msg', 'Password incorrect!');
    });
});

describe("GET /USER/", () => {
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).get("/API/USER/64875bd043ae1f07af510b06").send().set('Authorization', `Bearer ${accessToken}`);

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
         "lastName": "Benedico Aguilera",
         "username": "tita",
         "email": "tita@unica.cu",
         "password": "admin123*",
         "role": "Editor",
         "address": "Arnaldo Ramirez 305",
         "phone": "53646954"
    }
    test('Shuold response with a 200 status code ', async () => {
        const response = await request(app).put("/API/USER/64875bd043ae1f07af510b06").send(updateUser).set('Authorization', `Bearer ${accessToken}`);
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
        const response = await request(app).delete("/API/USER/64875bd043ae1f07af510b06").send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("res");
        expect(response.body).toBeInstanceOf(Object);
    });
    test('Should return an error if not product exists or has it already been removed before', async () => {
        const response = await request(app).delete("/API/USER/64825519ddcfe48c5a4419a5").send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('msg', 'No document found with that ID!');
    });
});
