import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';

// Load env
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined');
  process.exit(1);
}

// Inline model definition to avoid import issues in standalone script
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
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB');

    const adminEmail = 'jcpgimofficial@gmail.com';
    const plainPassword = 'anuhhiya27';

    // Simple hash for now as bcrypt is not installed
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

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin:', error);
    process.exit(1);
  }
}

setupAdmin();
