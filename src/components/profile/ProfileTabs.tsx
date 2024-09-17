import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import React from 'react';
import ActivityPage from './Activity';
import NotificationsForm from './NotificationsForm';
import PersonalInfoForm from './PersonalInfoForm';
import SecurityForm from './SecurityForm';

export default function ProfileTabs() {
  return (
    <Tabs defaultValue="personal" className="space-y-4">
      <TabsList className='text-sm sm:text-base w-full sm:w-auto'>
        <TabsTrigger value="personal">Personal Information</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <PersonalInfoForm />
      </TabsContent>

      <TabsContent value="security">
        <SecurityForm />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationsForm />
      </TabsContent>

      <TabsContent value="activity">
        <ActivityPage />
      </TabsContent>
    </Tabs>
  );
}
