import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            getJwtCookie(): string[]
        }
    }
}

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'testJwtString'

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
})

global.getJwtCookie = () => {
    const token = jwt.sign({ 
            id: new mongoose.Types.ObjectId().toHexString(),
            email: 'test@test.com'
        },
        process.env.JWT_KEY!
    );
    
    const base64 = Buffer.from(JSON.stringify({ jwt: token })).toString('base64');
    return [`express:sess=${base64}`];
};