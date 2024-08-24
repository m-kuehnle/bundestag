"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, Label } from "recharts";
import Afd from "../../app/images/fraktionen/afd.png";
import Cdu from "../../app/images/fraktionen/cdu.png";
import Fdp from "../../app/images/fraktionen/fdp.png";
import Grüne from "../../app/images/fraktionen/grünen.png";
import Spd from "../../app/images/fraktionen/spd.png";
import Linke from "../../app/images/fraktionen/linke.png";
import BSW from "../../app/images/fraktionen/bsw.png";
import { Person } from "../../lib/api";
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

interface PiechartFraktionenProps {
  persons: Person[];
}

const getFraktionData = (persons: Person[]) => {
  const fraktionCount: { [key: string]: number } = {};

  persons.forEach((person) => {
    if (person.position == "MdB") {
      fraktionCount[person.association] =
        (fraktionCount[person.association] || 0) + 1;
    }
  });

  return Object.keys(fraktionCount).map((fraktion, index) => ({
    fraktion,
    count: fraktionCount[fraktion],
    fill: `var(--chart-${index + 1})`,
  }));
};

const COLORS: { [key: string]: string } = {
  "AfD": "#00A3E0",
  "CDU/CSU": "#000000",
  "FDP": "#FFCC00",
  "BÜNDNIS 90/DIE GRÜNEN": "#3F9C35",
  "DIE LINKE": "#C8102E",
  "SPD": "#E3000F",
  "BSW": "#691A40",
  "fraktionslos": "#D1D1D1",
};

const chartConfig = {
  visitors: {
    label: "Abgeordnete",
  },
} as ChartConfig;

export function PiechartFraktionen({ persons }: PiechartFraktionenProps) {
  const chartData = React.useMemo(() => getFraktionData(persons), [persons]);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  const maxVisitorsParty = React.useMemo(() => {
    let maxParty = "";
    let maxCount = 0;

    chartData.forEach((item) => {
      if (item.count > maxCount) {
        maxParty = item.fraktion;
        maxCount = item.count;
      }
    });

    return { party: maxParty, count: maxCount };
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sitzverteilung des Deutschen Bundestages</CardTitle>
        <CardDescription>Wahlperiode 20</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="fraktion"
              innerRadius={100}
              outerRadius={180}
              startAngle={180}
              endAngle={0}
              strokeWidth={6}
              paddingAngle={1}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.fraktion]} />
              ))}
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
      <CardFooter className="flex-col gap-2 text-sm pt-0 mt-0">
  <div className="flex items-center gap-2 font-medium leading-none">
    <span className="text-red-500">{maxVisitorsParty.party}</span> -
    Mehrheit mit {maxVisitorsParty.count}{" "}
    <TrendingUp className="h-4 w-4" />
  </div>
  <div className="leading-none text-muted-foreground ">
    Zeigt Abgeordnete einzelner Fraktionen
  </div> 
  <div className="mt-4">
    {/* Logos der Parteien */}
    <div className="grid grid-cols-8 grid-rows-1 gap-4 content-stretch">
    <div className="self-center ">
        <img src={Linke.src} width="120" height="120" alt="Linke" />
      </div>                         
      <div className="self-center">
        <img src={Afd.src} width="120" height="120" alt="AfD" />
      </div>
      <div className="self-center ">
        <img src={BSW.src} width="120" height="120" alt="BSW" />
      </div>
      <div className="self-center">
        <img src={Cdu.src} width="120" height="120" alt="CDU" />
      </div>
      <div className="self-center">
        <img src={Grüne.src} width="120" height="120" alt="Grüne" />
      </div>
      <div className="self-center">
        <p className="font-bold text-2xl">Fraktionslos</p>
      </div>
      <div className="self-center">
        <img src={Spd.src} width="120" height="120" alt="SPD" />
      </div>
      <div className="self-center">
        <img src={Fdp.src} width="120" height="120" alt="FDP" />
      </div>
   
    </div>

    {/* Farbe und Anzahl */}
    <div className="grid grid-cols-8 grid-rows-1 gap-4">
      {chartData.map((entry, index) => (
        <div key={entry.fraktion} className="flex justify-center mt-2">
          <div
            className="w-6 h-6 rounded-full mr-2"
            style={{ backgroundColor: COLORS[entry.fraktion] }}
          ></div>
          <span className="text-lg font-semibold">{entry.count}</span>
        </div>
      ))}
    </div>
  </div>
</CardFooter>
    </Card>
  );
}

export default PiechartFraktionen;
