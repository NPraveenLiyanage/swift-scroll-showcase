
import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AdminAboutMe } from './AdminAboutMe';
import { AdminProjects } from './AdminProjects';
import { AdminExperiences } from './AdminExperiences';
import { AdminCertifications } from './AdminCertifications';
import { AdminTestimonials } from './AdminTestimonials';
import { AdminMessages } from './AdminMessages';

export function AdminDashboard() {
  const { logout } = useAdmin();
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Portfolio Admin</h1>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Your Portfolio Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <AdminAboutMe />
            </TabsContent>
            
            <TabsContent value="projects" className="mt-6">
              <AdminProjects />
            </TabsContent>
            
            <TabsContent value="experience" className="mt-6">
              <AdminExperiences />
            </TabsContent>
            
            <TabsContent value="certifications" className="mt-6">
              <AdminCertifications />
            </TabsContent>
            
            <TabsContent value="testimonials" className="mt-6">
              <AdminTestimonials />
            </TabsContent>
            
            <TabsContent value="messages" className="mt-6">
              <AdminMessages />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
