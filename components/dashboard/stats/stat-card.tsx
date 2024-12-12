"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeColor?: "green" | "red";
}

export function StatCard({ title, value, change, changeColor = "green" }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeColor === "green" ? "text-green-500" : "text-red-500"}`}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}