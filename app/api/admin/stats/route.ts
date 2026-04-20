import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/lib/models/Member';
import PrayerRequest from '@/lib/models/PrayerRequest';
import Event from '@/lib/models/Event';
import ContactMessage from '@/lib/models/ContactMessage';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    const [
      totalMembers,
      activeMembers,
      newPrayers,
      upcomingEvents,
      newMessages
    ] = await Promise.all([
      Member.countDocuments(),
      Member.countDocuments({ isActive: true }),
      PrayerRequest.countDocuments({ status: 'new' }),
      Event.countDocuments({ 
        eventDate: { $gte: new Date() },
        isActive: true 
      }),
      ContactMessage.countDocuments({ status: 'new' })
    ]);

    // Fetch lists for the dashboard tabs
    const [
      allPrayers,
      allMessages,
      allEvents,
      allMembers
    ] = await Promise.all([
      PrayerRequest.find().sort({ createdAt: -1 }).limit(50),
      ContactMessage.find().sort({ createdAt: -1 }).limit(50),
      Event.find().sort({ eventDate: 1 }),
      Member.find().sort({ joinDate: -1 }).limit(100)
    ]);

    // Function to map _id to id for frontend parity
    const mapId = (doc: any) => ({ ...doc.toObject(), id: doc._id.toString() });

    return NextResponse.json({
      success: true,
      stats: {
        totalMembers: activeMembers,
        prayerRequests: newPrayers,
        upcomingEvents: upcomingEvents,
        contactMessages: newMessages
      },
      data: {
        prayerRequests: allPrayers.map(mapId),
        contactMessages: allMessages.map(mapId),
        events: allEvents.map(mapId),
        members: allMembers.map(mapId)
      }
    });

  } catch (error: any) {
    console.error('Admin Stats API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch admin dashboard data',
      details: error.message
    }, { status: 500 });
  }
}
