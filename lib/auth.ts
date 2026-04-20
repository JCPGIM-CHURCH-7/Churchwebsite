import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jcpgim_secret_key_2026';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export const signToken = (user: AuthUser) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const verifyToken = (token: string): AuthUser | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch (error) {
    return null;
  }
};
