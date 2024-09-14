import { HelpCircle, Trash2, LogOut } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export default function AdditionalOptionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help Center
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </CardContent>
    </Card>
  );
}
