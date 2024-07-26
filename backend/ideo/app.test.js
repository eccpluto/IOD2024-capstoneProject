// API http request testing via supertest

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('./app');

const testObjectId = new mongoose.Types.ObjectId();
let testObjectId2 = null; // mutable, this is used in dynamic ObjectIds


// TESTING LIBRARIES /////////////////////////////////////////////////////
describe('POST /api/libraries/create', () => {
    it('should return a new library object', async () => {
        const res = await request(app).post("/api/libraries/create").send({
            name: String(testObjectId),
            owner: testObjectId,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.data._id).toBeTruthy()
        testObjectId2 = res.body.data._id;
    })
})

describe('GET /api/libraries/:id', () => {
    it('should return a library object', async () => {
        const res = await request(app).get(`/api/libraries/${testObjectId2}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.owner).toBe(String(testObjectId));
    })
})

describe('GET /api/libraries/', () => {
    it('should return an array of library objects', async () => {
        const res = await request(app).get(`/api/libraries/}`);
        expect(res.statusCode).toBe(200);
    })
})

describe('PUT /api/libraries/:id', () => {
    it('should return the updated library object', async () => {
        const res = await request(app).put(`/api/libraries/${testObjectId2}}`).send({
            name: String(testObjectId2),
        });
        expect(res.statusCode).toBe(200);
        // expect(res.data).toBe("New Name");
        // should really confirm that the returned object name changes
    })
})

describe('DELETE /api/libraries/:id', () => {
    it('should delete the library test object', async () => {
        const res = await request(app).delete(`/api/libraries/${testObjectId}}`);
        expect(res.statusCode).toBe(200);
        // should really confirm that the returned object name changes
    })
})

// TESTING RESOURCES /////////////////////////////////////////////////////
// describe('POST /api/resources/create', () => {
//     it('should return a new resource object', async () => {
//         const res = await request(app).post("/api/resources/create").send({
//             name: String(testObjectId),
//             owner: String(testObjectId),
//             abstract: String(testObjectId),
//             pdf_link: String(testObjectId),
//         });
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toBeTruthy()
//         testObjectId2 = res.body.data._id;
//     })
// })

// describe('GET /api/resources/:id', () => {
//     it('should return a resource object', async () => {
//         const res = await request(app).get(`/api/resources/${testObjectId2}`);
//         expect(res.statusCode).toBe(200);
//         expect(res.body.data.owner).toBe(String(testObjectId));
//     })
// })

// describe('PUT /api/resources/:id', () => {
//     it('should return an the updated resource', async () => {
//         const res = await request(app).get(`/api/resources/}`);
//         expect(res.statusCode).toBe(200);
//     })
// })

// describe('PUT /api/libraries/:id', () => {
//     it('should return the updated library object', async () => {
//         const res = await request(app).put(`/api/libraries/${testObjectId2}}`).send({
//             name: String(testObjectId2),
//         });
//         expect(res.statusCode).toBe(200);
//         // expect(res.data).toBe("New Name");
//         // should really confirm that the returned object name changes
//     })
// })

describe('DELETE /api/resources/:id', () => {
    it('should delete the resources test object', async () => {
        const res = await request(app).delete(`/api/resources/${testObjectId2}}`);
        expect(res.statusCode).toBe(200);
        // should really confirm that the returned object name changes
    })
})


// TESTING USERS /////////////////////////////////////////////////////
// describe('POST /api/users/create', () => {
//     it('should return a new user object', async () => {
//         const res = await request(app).post("/api/users/create").send({
//             name: String(testObjectId),
//             email: String(testObjectId),
//             password: String(testObjectId),
//             theme: String(testObjectId)
//         });
//         expect(res.statusCode).toBe(200);
//         expect(res.body.data._id).toBeTruthy()
//         testObjectId2 = res.body.data._id;
//     })
// })

// describe('GET /api/users/:id', () => {
//     it('should return a user object', async () => {
//         const res = await request(app).get(`/api/users/${testObjectId2}`);
//         expect(res.statusCode).toBe(200);
//         expect(res.body.data._id).toBe(String(testObjectId));
//     })
// })

// describe('GET /api/users/', () => {
//     it('should return an array of all users', async () => {
//         const res = await request(app).get(`/api/users/}`);
//         expect(res.statusCode).toBe(200);
//     })
// })

// describe('PUT /api/users/:id', () => {
//     it('should return the updated user object', async () => {
//         const res = await request(app).put(`/api/users/${testObjectId2}}`).send({
//             name: String(testObjectId2),
//         });
//         expect(res.statusCode).toBe(200);
//         // expect(res.data).toBe("New Name");
//         // should really confirm that the returned object name changes
//     })
// })

// describe('DELETE /api/users/:id', () => {
//     it('should delete the user test object', async () => {
//         const res = await request(app).delete(`/api/users/${testObjectId2}}`);
//         expect(res.statusCode).toBe(200);
//         // should really confirm that the returned object name changes
//     })
// })
