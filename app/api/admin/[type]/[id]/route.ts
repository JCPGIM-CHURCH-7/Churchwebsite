import { type NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import PrayerRequest from '@/lib/models/PrayerRequest';
import ContactMessage from '@/lib/models/ContactMessage';
import Event from '@/lib/models/Event';
import Member from '@/lib/models/Member';

export const dynamic = 'force-dynamic';

const models: Record<string, any> = {
  'prayer-requests': PrayerRequest,
  'contact-messages': ContactMessage,
  'events': Event,
  'members': Member,
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: { type: string, id: string } }
) {
  try {
    await dbConnect();
    const { type, id } = params;
    const model = models[type];

    if (!model) {
      return NextResponse.json({ error: 'Invalid resource type' }, { status: 400 });
    }

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const body = await request.json();
    const updated = await model.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error(`Error updating ${params.type}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { type: string, id: string } }
) {
  try {
    await dbConnect();
    const { type, id } = params;
    const model = models[type];

    if (!model) {
      return NextResponse.json({ error: 'Invalid resource type' }, { status: 400 });
    }

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const deleted = await model.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    console.error(`Error deleting ${params.type}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
