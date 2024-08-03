"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

interface Person {
  id: string;
  nachname: string;
  vorname: string;
  typ: string;
  wahlperiode: number;
  aktualisiert: string;
  titel: string;
  datum: string;
  basisdatum: string;
}

interface PiechartFraktionenProps {
  persons: Person[];
}

const getFraktionData = (persons: Person[]) => {
  const fraktionCount: { [key: string]: number } = {};

  persons.forEach((person) => {
    if (person.wahlperiode === 20 && person.titel.includes("MdB")) {
      const parts = person.titel.split(", ");
      if (parts.length > 2) {
        let fraktion = parts[2];
        if (fraktion === fraktion.toUpperCase() || fraktion.length < 4 || fraktion === "fraktionslos") {
          if (fraktion === "BÜNDNIS 90/DIE GRÜNEN" ) {
            fraktion = " GRÜNEN"; 
          }
          if (fraktion in fraktionCount) {
            fraktionCount[fraktion]++;
          } else {
            fraktionCount[fraktion] = 1;
          }
        }
      }
    }
  });

  return Object.keys(fraktionCount).map((fraktion, index) => ({
    browser: fraktion,
    visitors: fraktionCount[fraktion],
    fill: `var(--chart-${index + 1})`, // Dynamische Farbe basierend auf Index
  }));
};


const chartConfig = {
  visitors: {
    label: "Abgeordnete",
  },
} as ChartConfig;

export function PiechartFraktionen({ persons }: PiechartFraktionenProps) {
  const chartData = React.useMemo(() => getFraktionData(persons), [persons]);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  const maxVisitorsParty = React.useMemo(() => {
    let maxParty = "";
    let maxCount = 0;

    chartData.forEach((item) => {
      if (item.visitors > maxCount) {
        maxParty = item.browser;
        maxCount = item.visitors;
      }
    });

    return { party: maxParty, count: maxCount };
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Zeigt Abgeordnete einzelner Fraktionen in der Wahlperiode "20"</CardTitle>
        <CardDescription>Juli 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={6}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Abgeordnete
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <span className="text-red-500">{maxVisitorsParty.party}</span> - Mehrheit mit {maxVisitorsParty.count} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Zeigt Abgeordnete einzelner Fraktionen
        </div>
      </CardFooter>
    </Card>
  );
}

export default PiechartFraktionen;
