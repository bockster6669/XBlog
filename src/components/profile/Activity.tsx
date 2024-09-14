import { Activity, Settings, User } from 'lucide-react';
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';

export default function ActivityPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Activity</CardTitle>
        <CardDescription>Review your recent account activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Login from new device - 15.05.2023, 14:30</span>
          </li>
          <li className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Password change - 10.05.2023, 09:15</span>
          </li>
          <li className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile information update - 05.05.2023, 11:45</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
