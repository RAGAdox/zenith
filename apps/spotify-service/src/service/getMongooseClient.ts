import mongoose from "mongoose";

let mongooseDb: mongoose.mongo.Db | null = null;

export async function getMoongooseClient(): Promise<mongoose.mongo.Db | null> {
  if (mongooseDb) {
    return mongooseDb;
  }
  try {
    const MONGODB_URI = `mongodb+srv://${
      process.env.MONGODB_USERNAME
    }:${encodeURIComponent(process.env.MONGODB_PASSWORD || "")}@${
      process.env.MONGODB_CLUSTER
    }/${process.env.MONGODB_DATABASE}`;

    const client = await mongoose.connect(MONGODB_URI, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    });

    if (client.connection.db) {
      await client.connection.db.admin().command({ ping: 1 });
      console.log("Successfully connected to MongoDB.");
      mongooseDb = client.connection.db;
      mongooseDb.createCollection("spotify");
      return mongooseDb;
    }
    return null;
  } catch (error) {
    mongooseDb = null;
    console.error("Error connecting to MongoDB:", error);
    return null;
  }
}
