"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Contact, Newspaper, Beer } from "lucide-react";

const DashboardCard = ({ numFound, title }: { numFound: number; title: string }) => {
    return (
    <Card className="bg-slate-100 dark:bg-slate-800 p-4 pb-0 max-w-sm">
      <CardContent>
        <h3 className="text-3xl text-center mb-4 font-bold text-slate-500 dark:text-slate-200">
          {title}
        </h3>
        <div className="flex gap-5 justify-center items-center">
          <Beer className="text-slate-500" size="72" />
          <h3 className="text-5xl font-semibold text-slate-500 dark:text-slate-200">
            {numFound}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
