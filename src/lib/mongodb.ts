import mongoose from "mongoose";

// Fetch the database URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * In Next.js, the serverless environment can instantiate multiple DB connections
 * on every hot-reload (HMR) in development. We attach a cached connection
 * to the Node global scope to prevent database connection exhaustion.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend global namespace typing to support mongoose caching
declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

// Type assertion to guarantee to TS compiler that cached is defined
const activeCache: MongooseCache = cached;

/**
 * Establishes a cached connection to MongoDB using Mongoose.
 * Prevents multiple connections and logs states.
 */
export async function dbConnect(): Promise<typeof mongoose> {
  // 1. If connection already exists in cache, return it
  if (activeCache.conn) {
    console.log("[MongoDB]: Using cached connection instance.");
    return activeCache.conn;
  }

  // 2. If no promise exists, instantiate a new connection promise
  if (!activeCache.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("[MongoDB]: Initializing new database connection...");
    activeCache.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongooseInstance) => {
        console.log("[MongoDB]: Database connection established successfully.");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("[MongoDB]: Connection initialization failed:", err);
        activeCache.promise = null; // reset cache promise on failure
        throw err;
      });
  }

  // 3. Await the promise and resolve connection in cache
  try {
    activeCache.conn = await activeCache.promise;
  } catch (error) {
    activeCache.promise = null;
    throw error;
  }

  return activeCache.conn;
}

export default dbConnect;
