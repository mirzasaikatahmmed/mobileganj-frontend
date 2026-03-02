'use client';

import { Info, Plus, Edit, Trash2, Eye, Users, Target, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function AboutPageManagementPage() {
  const [activeTab, setActiveTab] = useState('content');

  const teamMembers = [
    { id: 1, name: 'John Doe', position: 'CEO & Founder', image: '/team1.jpg', bio: 'Leading the company since 2020' },
    { id: 2, name: 'Jane Smith', position: 'Operations Manager', image: '/team2.jpg', bio: '10+ years in retail' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Info className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            About Us Page Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage company information and team
          </p>
        </div>
        <Button className="gap-2">
          <Eye className="w-4 h-4" />
          Preview Page
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-card border rounded-lg">
        <div className="flex overflow-x-auto border-b">
          {[
            { id: 'content', label: 'Page Content', icon: Info },
            { id: 'team', label: 'Team Members', icon: Users },
            { id: 'mission', label: 'Mission & Vision', icon: Target },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">About Us Content</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input placeholder="Mobile GANJ" defaultValue="Mobile GANJ" />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input placeholder="Your trusted mobile partner" />
                </div>
                <div className="space-y-2">
                  <Label>About Us Description</Label>
                  <Textarea 
                    placeholder="Tell your company story..." 
                    rows={6}
                    defaultValue="Mobile GANJ is Bangladesh's leading mobile phone retailer, offering the latest smartphones, accessories, and exceptional customer service since 2020. We pride ourselves on quality products, competitive prices, and customer satisfaction."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Why Choose Us</Label>
                  <Textarea 
                    placeholder="Key reasons to choose your company..." 
                    rows={4}
                    defaultValue="✓ Authentic products with warranty\n✓ Competitive pricing\n✓ Expert customer support\n✓ Fast delivery nationwide"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Years in Business</Label>
                    <Input type="number" defaultValue="4" />
                  </div>
                  <div className="space-y-2">
                    <Label>Happy Customers</Label>
                    <Input type="number" defaultValue="10000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Products Sold</Label>
                    <Input type="number" defaultValue="25000" />
                  </div>
                </div>
                <Button className="w-full">Save Content</Button>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Team Members</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Member
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      <Image className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                        <p className="text-xs text-muted-foreground mt-1">{member.bio}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-2">
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 gap-2 text-destructive hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mission & Vision Tab */}
          {activeTab === 'mission' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Mission & Vision</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Our Mission</Label>
                  <Textarea 
                    placeholder="Company mission statement..." 
                    rows={4}
                    defaultValue="To provide authentic, high-quality mobile phones and accessories at competitive prices while delivering exceptional customer service and building lasting relationships with our customers."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Our Vision</Label>
                  <Textarea 
                    placeholder="Company vision statement..." 
                    rows={4}
                    defaultValue="To become Bangladesh's most trusted and preferred destination for mobile phones and accessories, known for quality, reliability, and customer satisfaction."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Core Values</Label>
                  <Textarea 
                    placeholder="Company core values..." 
                    rows={4}
                    defaultValue="• Integrity - We believe in honest business practices\n• Quality - We never compromise on product quality\n• Customer First - Customer satisfaction is our priority\n• Innovation - We embrace new technologies"
                  />
                </div>
                <Button className="w-full">Save Mission & Vision</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
