import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb'

const uri: string | undefined = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).

    let globMongoPromise: Promise<MongoClient> | undefined; 
    if (!globMongoPromise) {
        client = new MongoClient(uri, options);
        globMongoPromise = client.connect();
    }
    clientPromise = globMongoPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise