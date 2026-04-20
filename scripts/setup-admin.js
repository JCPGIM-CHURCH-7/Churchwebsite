const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined');
  process.exit(1);
}

const AdminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);

async function setupAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'jcpgimofficial@gmail.com';
    const plainPassword = 'anuhhiya27';

    // Simple hash for now
    const hashedPassword = crypto.createHash('sha256').update(plainPassword).digest('hex');

    const existingAdmin = await AdminUser.findOne({ email: adminEmail });

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.updatedAt = new Date();
      await existingAdmin.save();
      console.log(`Admin user ${adminEmail} updated successfully.`);
    } else {
      await AdminUser.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`Admin user ${adminEmail} created successfully.`);
    }

    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin:', error);
    process.exit(1);
  }
}

setupAdmin();
