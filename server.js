const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB config
const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:example@mongo-db:27017';
const DB_NAME = process.env.DB_NAME || 'testdb';
const COLLECTION = process.env.COLLECTION || 'users';

app.use(express.json()); // parse JSON bodies

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// GET: list users
app.get('/api/users', async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);
    const users = await db.collection(COLLECTION).find({}, { projection: { _id: 0 } }).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (client) await client.close();
  }
});

// POST: add user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  let client;
  try {
    client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);
    const doc = { name: String(name).trim(), email: String(email).trim(), createdAt: new Date() };
    await db.collection(COLLECTION).insertOne(doc);
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (client) await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
