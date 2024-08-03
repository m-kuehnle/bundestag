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
    if (person.wahlperiode === 20 && person.position == ("MdB")) {
      const parts = person.position.split(", ");
      if (parts.length > 2) {
        let fraktion = parts[2];
        if (
          fraktion === fraktion.toUpperCase() ||
          fraktion.length < 4 ||
          fraktion === "fraktionslos"
        ) {
          if (fraktion === "BÜNDNIS 90/DIE GRÜNEN") {
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
    fraktion,
    count: fraktionCount[fraktion],
    fill: `var(--chart-${index + 1})`, // Dynamische Farbe basierend auf Index
  }));
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF12042",
  "#AF19FF",
  "#FF4D4D",
  "#FF69B4",
  "#A52A2A",
];

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
          className="mx-auto aspect-square max-h-[250px]"
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
              innerRadius={60}
              outerRadius={100}
              startAngle={180}
              endAngle={0}
              strokeWidth={6}
              paddingAngle={0}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
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
      <CardFooter className="flex-col gap-2 text-sm ">
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
            <div className="self-center">
              <img src={Afd.src} width="120" height="120" alt="AfD" />
            </div>
            <div className="self-center">
              <img src={Cdu.src} width="120" height="120" alt="CDU" />
            </div>
            <div className="self-center">
              <img src={Fdp.src} width="120" height="120" alt="FDP" />
            </div>
            <div className="self-center">
              <img src={Grüne.src} width="120" height="120" alt="Grüne" />
            </div>
            <div className="self-center ">
              <img src={Linke.src} width="120" height="120" alt="Linke" />
            </div>
            <div className="self-center">
              <img src={Spd.src} width="120" height="120" alt="SPD" />
            </div>
            <div className="self-center ">
              <img src={BSW.src} width="120" height="120" alt="BSW" />
            </div>
            <div className="self-center">
              <p className="font-bold text-2xl">Sonstige</p>
            </div>
          </div>

          {/* Farbe und Anzahl */}
          <div className="grid grid-cols-8 grid-rows-1 gap-4">
            <div className="flex justify-center mt-2">
              <div className="w-6 h-6 rounded-full bg-[#00A3E0] mr-2"></div>
              <span className="text-lg font-semibold">30</span>
            </div>
            <div className="flex justify-center mt-2 ">
              <div className="w-6 h-6 rounded-full bg-[#000000] mr-2"></div>
              <span className="text-lg font-semibold">25</span>
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-6 h-6 rounded-full bg-[#FFCC00] mr-2"></div>
              <span className="text-lg font-semibold">12</span>
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-6 h-6 rounded-full bg-[#3F9C35] mr-2"></div>
              <span className="text-lg font-semibold">20</span>
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-6 h-6 rounded-full bg-[#C8102E] mr-2"></div>
              <span className="text-lg font-semibold ">15</span>
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-6 h-6 rounded-full bg-[#E3000F] mr-2"></div>
              <span className="text-lg font-semibold">35</span>
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-6 h-6 rounded-full bg-[#B4B4B4] mr-2"></div>
              <span className="text-lg font-semibold">8</span>
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-6 h-6 rounded-full bg-[#D1D1D1] mr-2"></div>
              <span className="text-lg font-semibold">5</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PiechartFraktionen;
