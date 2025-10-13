# Firebase Authentication Setup for JCPGIM Church Website

This document provides instructions for setting up Firebase Authentication for the Jesus Christ Power of Glory International Ministries website.

## 🔥 Firebase Configuration

The Firebase configuration has been set up with your provided credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDSS_PmR4GLV2FsSNy5fvBTMjkM5FyPdQw",
  authDomain: "project-8ddeb.firebaseapp.com",
  projectId: "project-8ddeb",
  storageBucket: "project-8ddeb.firebasestorage.app",
  messagingSenderId: "44960905783",
  appId: "1:44960905783:web:b2c81099980d0140db9db2"
};
```

## 🚀 Features Implemented

### ✅ Authentication Methods
- **Email/Password Authentication** - Users can sign up and sign in with email and password
- **Google Authentication** - One-click sign-in with Google accounts
- **Password Reset** - Forgot password functionality with email reset links

### ✅ User Interface
- **Beautiful Login Page** - Modern, responsive design matching church branding
- **User Profile Page** - Complete user profile with church activity tracking
- **Admin Dashboard** - Protected admin area for church management
- **Navigation Integration** - Auth button in navigation with user dropdown

### ✅ Security Features
- **Protected Routes** - Certain pages require authentication
- **Route Protection** - Automatic redirect to login for unauthorized users
- **Session Management** - Persistent login state across browser sessions

## 📁 File Structure

```
├── lib/
│   └── firebase.ts                 # Firebase configuration
├── contexts/
│   └── AuthContext.tsx             # Authentication context and provider
├── components/
│   ├── ProtectedRoute.tsx          # Route protection component
│   └── AuthButton.tsx              # Authentication button for navigation
├── app/
│   ├── login/
│   │   └── page.tsx                # Login/signup page
│   ├── profile/
│   │   └── page.tsx                # User profile page
│   ├── admin/
│   │   └── page.tsx                # Admin dashboard
│   └── layout.tsx                  # Updated with AuthProvider
└── middleware.ts                   # Route protection middleware
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install firebase
```

### 2. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `project-8ddeb`
3. Navigate to **Authentication** > **Sign-in method**
4. Enable the following providers:
   - **Email/Password** - Enable for email authentication
   - **Google** - Enable and configure OAuth consent screen

### 3. Configure Google Authentication
1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Google** provider
3. Enable the provider
4. Add your domain to **Authorized domains**:
   - `localhost` (for development)
   - Your production domain (e.g., `jcpgim.org`)

### 4. Set Up Authorized Users (Optional)
If you want to restrict access to authorized users only:
1. Go to **Authentication** > **Users**
2. Add authorized email addresses manually
3. Or implement custom user management in your app

## 🎯 Usage

### For Users
1. **Sign Up**: Visit `/login` and click "Sign up" to create an account
2. **Sign In**: Use email/password or Google authentication
3. **Profile**: Access user profile at `/profile`
4. **Password Reset**: Click "Forgot password?" on login page

### For Administrators
1. **Admin Access**: Visit `/admin` (requires authentication)
2. **User Management**: View user profiles and activities
3. **Church Statistics**: Monitor prayer requests and events

## 🔒 Security Considerations

### Environment Variables (Recommended)
For production, move Firebase config to environment variables:

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firebase Security Rules
Set up Firestore security rules to protect user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public prayer requests (read-only for authenticated users)
    match /prayer-requests/{requestId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init`
4. Deploy: `firebase deploy`

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

## 📱 Mobile Responsiveness

The authentication system is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Progressive Web App (PWA) support

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.ts`
- Modify logo and images in `/public/images/`
- Customize the login page design in `/app/login/page.tsx`

### User Roles
To implement user roles (admin, member, etc.):
1. Add role field to user documents in Firestore
2. Update `AuthContext` to include role checking
3. Modify `ProtectedRoute` to check specific roles

## 🆘 Troubleshooting

### Common Issues
1. **"Firebase not initialized"** - Check if Firebase config is correct
2. **"Google sign-in not working"** - Verify OAuth configuration
3. **"User not found"** - Check if user exists in Firebase Console
4. **"Network error"** - Verify internet connection and Firebase status

### Support
- Check Firebase Console for authentication logs
- Review browser console for JavaScript errors
- Verify Firebase project settings and permissions

## 📞 Contact

For technical support or questions about the authentication system, please contact the development team.

---

**Note**: This authentication system is designed specifically for the Jesus Christ Power of Glory International Ministries website and includes church-specific features like prayer request tracking and event management.
