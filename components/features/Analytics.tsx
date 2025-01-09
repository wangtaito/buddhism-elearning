'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnrollmentChart from './charts/EnrollmentChart';

export default function Analytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>學生註冊趨勢</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <EnrollmentChart />
        </div>
      </CardContent>
    </Card>
  );
}