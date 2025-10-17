# Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard for the JCPGIM website.

## Prerequisites

1. A Supabase account and project
2. Firebase authentication configured
3. Admin email: `jcpgimofficial@gmail.com`

## Database Setup

### Step 1: Run the Database Setup Script

1. Log in to your Supabase Dashboard at https://supabase.com/dashboard
2. Navigate to your project
3. Go to the **SQL Editor** section in the left sidebar
4. Click **New Query**
5. Copy and paste the contents of `scripts/setup-database.sql`
6. Click **Run** to execute the script

This will create:
- `admin_users` table - Stores admin user emails
- `prayer_requests` table - Stores prayer requests from the website
- `contact_messages` table - Stores contact form submissions
- `events` table - Stores church events
- `members` table - Stores church member information

### Step 2: Verify the Setup

Run this query in the SQL Editor to verify the admin user was created:

```sql
SELECT * FROM admin_users;
```

You should see the email `jcpgimofficial@gmail.com` in the results.

## Admin Access

### Who Can Access the Admin Dashboard?

Only users logged in with the email `jcpgimofficial@gmail.com` can access the admin dashboard.

### How to Access

1. Navigate to the website
2. Click **Login** in the navigation menu
3. Sign in with the admin email `jcpgimofficial@gmail.com`
4. Once logged in, you'll see an **Admin** button in the navigation
5. Click **Admin** to access the dashboard

### What Non-Admin Users See

- Non-admin users will NOT see the Admin button in navigation
- If someone tries to access `/admin` directly without being logged in as admin, they will be redirected to the login page or home page

## Admin Dashboard Features

### 1. Overview Stats
- **Total Members**: Count of active church members
- **Prayer Requests**: Number of new prayer requests
- **Upcoming Events**: Count of upcoming active events
- **New Messages**: Number of unread contact messages

### 2. Prayer Requests Management
View and manage all prayer requests submitted through the website:
- Mark requests as "In Progress" or "Completed"
- View requester contact information
- Delete requests when no longer needed

### 3. Contact Messages Management
Manage messages from the contact form:
- Mark messages as "Read" or "Replied"
- View sender contact details
- Delete messages when done

### 4. Events Management
View all church events:
- See upcoming and past events
- View event details (date, location, category)
- See event status (active/inactive)

### 5. Members Directory
View church membership records:
- See member contact information
- View join dates
- See active membership status

## Security Features

### Row Level Security (RLS)
All tables are protected with Row Level Security:
- Public users can only submit prayer requests and contact messages
- Public users can only view active events
- Only admin users can view and manage all data

### Admin Protection
The admin dashboard has multiple layers of protection:
1. **Route Protection**: AdminProtectedRoute component checks authentication
2. **Email Verification**: Only `jcpgimofficial@gmail.com` can access
3. **Navigation Guards**: Admin button only shows for admin users
4. **Database RLS**: Additional security at the database level

## Troubleshooting

### Admin button not showing
1. Ensure you're logged in with `jcpgimofficial@gmail.com`
2. Try logging out and logging back in
3. Check browser console for any errors

### Cannot see dashboard data
1. Verify the database setup script ran successfully
2. Check that RLS policies are enabled
3. Ensure you're logged in with the admin email

### Prayer requests/messages not appearing
1. Test by submitting a prayer request or contact message
2. Refresh the admin dashboard
3. Check Supabase logs for any errors

## Adding More Admins

To add additional admin users:

1. Go to Supabase SQL Editor
2. Run this query (replace with actual email):

```sql
INSERT INTO admin_users (email)
VALUES ('newemail@example.com');
```

3. That user will now have admin access when logged in

## Support

For issues or questions, please contact the development team.
