const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Simple .env.local parser
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) {
        process.env[key.trim()] = rest.join('=').trim();
      }
    });
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

async function test() {
  console.log('Testing connection with URI:', MONGODB_URI?.replace(/:([^@]+)@/, ':****@'));
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('SUCCESS: Connected to MongoDB!');
    await mongoose.connection.close();
  } catch (err) {
    console.error('FAILURE: Could not connect to MongoDB.');
    console.error('Error Details:', err.message);
    if (err.message.includes('auth')) {
      console.error('This is a username or password issue.');
    } else if (err.message.includes('timeout') || err.message.includes('ENOTFOUND')) {
      console.error('This is likely a Network/IP Whitelist issue.');
    }
    process.exit(1);
  }
}

test();
