"use client";

import { useEffect, useState } from 'react';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  Mail,
  Calendar,
  Heart,
  MessageSquare,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
  Plus
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { PrayerRequest, ContactMessage, Event, Member } from '@/lib/supabase';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    prayerRequests: 0,
    upcomingEvents: 0,
    contactMessages: 0
  });

  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [prayersRes, messagesRes, eventsRes, membersRes] = await Promise.all([
        supabase.from('prayer_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('event_date', { ascending: true }),
        supabase.from('members').select('*').order('created_at', { ascending: false })
      ]);

      if (prayersRes.data) setPrayerRequests(prayersRes.data);
      if (messagesRes.data) setContactMessages(messagesRes.data);
      if (eventsRes.data) setEvents(eventsRes.data);
      if (membersRes.data) setMembers(membersRes.data);

      setStats({
        totalMembers: membersRes.data?.filter(m => m.is_active).length || 0,
        prayerRequests: prayersRes.data?.filter(p => p.status === 'new').length || 0,
        upcomingEvents: eventsRes.data?.filter(e => {
          const eventDate = new Date(e.event_date);
          return eventDate > new Date() && e.is_active;
        }).length || 0,
        contactMessages: messagesRes.data?.filter(m => m.status === 'new').length || 0
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrayerStatus = async (id: string, status: 'new' | 'in_progress' | 'completed') => {
    const { error } = await supabase
      .from('prayer_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      loadDashboardData();
    }
  };

  const updateMessageStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      loadDashboardData();
    }
  };

  const deletePrayerRequest = async (id: string) => {
    if (confirm('Are you sure you want to delete this prayer request?')) {
      const { error } = await supabase
        .from('prayer_requests')
        .delete()
        .eq('id', id);

      if (!error) {
        loadDashboardData();
      }
    }
  };

  const deleteContactMessage = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (!error) {
        loadDashboardData();
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      new: { variant: 'default', label: 'New' },
      in_progress: { variant: 'secondary', label: 'In Progress' },
      completed: { variant: 'outline', label: 'Completed' },
      read: { variant: 'secondary', label: 'Read' },
      replied: { variant: 'outline', label: 'Replied' }
    };

    const statusInfo = variants[status] || { variant: 'default', label: status };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (loading) {
    return (
      <AdminProtectedRoute>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminProtectedRoute>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, Administrator</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Heart className="h-8 w-8 text-rose-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Prayer Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.prayerRequests}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-amber-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">New Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.contactMessages}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="prayers" className="space-y-4">
            <TabsList className="bg-white shadow-md">
              <TabsTrigger value="prayers">Prayer Requests</TabsTrigger>
              <TabsTrigger value="messages">Contact Messages</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="prayers">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Prayer Requests</CardTitle>
                  <CardDescription>Manage prayer requests from congregation members</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    {prayerRequests.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No prayer requests yet</p>
                    ) : (
                      <div className="space-y-4">
                        {prayerRequests.map((request) => (
                          <Card key={request.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900">{request.subject}</h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {request.name} • {request.email}
                                    {request.phone && ` • ${request.phone}`}
                                  </p>
                                </div>
                                {getStatusBadge(request.status)}
                              </div>
                              <p className="text-gray-700 mb-3">{request.message}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {formatDate(request.created_at)}
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updatePrayerStatus(request.id, 'in_progress')}
                                    disabled={request.status === 'in_progress'}
                                  >
                                    <Clock className="h-3 w-3 mr-1" />
                                    In Progress
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updatePrayerStatus(request.id, 'completed')}
                                    disabled={request.status === 'completed'}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Complete
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => deletePrayerRequest(request.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>Messages from website contact form</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    {contactMessages.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No messages yet</p>
                    ) : (
                      <div className="space-y-4">
                        {contactMessages.map((message) => (
                          <Card key={message.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {message.name} • {message.email}
                                    {message.phone && ` • ${message.phone}`}
                                  </p>
                                </div>
                                {getStatusBadge(message.status)}
                              </div>
                              <p className="text-gray-700 mb-3">{message.message}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {formatDate(message.created_at)}
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateMessageStatus(message.id, 'read')}
                                    disabled={message.status !== 'new'}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    Mark Read
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateMessageStatus(message.id, 'replied')}
                                    disabled={message.status === 'replied'}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Mark Replied
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => deleteContactMessage(message.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Events Management</CardTitle>
                      <CardDescription>Manage church events and activities</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    {events.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No events scheduled</p>
                    ) : (
                      <div className="space-y-4">
                        {events.map((event) => (
                          <Card key={event.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 text-lg">{event.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    <Calendar className="inline h-4 w-4 mr-1" />
                                    {formatDate(event.event_date)}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Location: {event.location}
                                  </p>
                                  <p className="text-gray-700 mt-2">{event.description}</p>
                                  <div className="mt-2">
                                    <Badge variant="outline">{event.category}</Badge>
                                    {event.is_active && (
                                      <Badge className="ml-2 bg-green-600">Active</Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Members Directory</CardTitle>
                      <CardDescription>Church membership records</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    {members.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No members registered</p>
                    ) : (
                      <div className="space-y-4">
                        {members.map((member) => (
                          <Card key={member.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900">{member.full_name}</h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {member.email}
                                    {member.phone && ` • ${member.phone}`}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Joined: {new Date(member.join_date).toLocaleDateString()}
                                  </p>
                                  {member.is_active && (
                                    <Badge className="mt-2 bg-green-600">Active</Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
