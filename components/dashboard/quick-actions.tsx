"use client";

import { useRouter } from "next/navigation";
import { PlusCircle, Users, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Nieuwe Factuur",
      description: "Maak snel een nieuwe factuur",
      icon: PlusCircle,
      onClick: () => router.push("/invoices/new"),
      color: "bg-blue-500/10 text-blue-500",
      hoverColor: "hover:bg-blue-500/20",
    },
    {
      title: "Nieuwe Klant",
      description: "Registreer een nieuwe klant",
      icon: Users,
      onClick: () => router.push("/clients/new"),
      color: "bg-green-500/10 text-green-500",
      hoverColor: "hover:bg-green-500/20",
    },
    {
      title: "Facturen Overzicht",
      description: "Beheer al uw facturen",
      icon: FileText,
      onClick: () => router.push("/invoices"),
      color: "bg-purple-500/10 text-purple-500",
      hoverColor: "hover:bg-purple-500/20",
    },
    {
      title: "Analyses & Rapporten",
      description: "Bekijk uw bedrijfsprestaties",
      icon: BarChart3,
      onClick: () => router.push("/reports"),
      color: "bg-orange-500/10 text-orange-500",
      hoverColor: "hover:bg-orange-500/20",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Card
          key={action.title}
          className={`group relative overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${action.hoverColor}`}
          onClick={action.onClick}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="absolute top-2 right-2 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <div className={`rounded-full p-1.5 ${action.color}`}>
                  <PlusCircle className="h-4 w-4" />
                </div>
              </div>
            </div>
            <CardTitle className="mt-4 text-lg font-semibold tracking-tight">
              {action.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm text-muted-foreground">
              {action.description}
            </CardDescription>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left">
            <div className={`h-full ${action.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
}