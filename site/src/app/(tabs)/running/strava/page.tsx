"use client";
import Content from "@/app/scaffolding/Content";
import Divider from "@/app/scaffolding/Divider";
import SectionTitle from "@/app/scaffolding/SectionTitle";
import { formatDateAsDaySinceEpoch } from "@/app/utils/DateUtils";
import { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import styles from "../../../scaffolding/dropdown.module.scss";
import MonthlyDistanceChart from "./MonthlyDistanceChart";
import RunningDistanceChart from "./RunningDistanceChart";
import Statistics from "./Statistics";
import { fetchStravaRunData, StravaRun } from "./stravaData";
const backgroundColor = "var(--background)";

export type EnrichedStravaRun = StravaRun & {
  dayRelativeToEpoch: number;
  year: number;
};

function enrich(data: StravaRun[]): EnrichedStravaRun[] {
  return data.map((d) => ({
    ...d,
    dayRelativeToEpoch: formatDateAsDaySinceEpoch(d.date),
    year: parseInt(d.date.slice(0, 4), 10),
  }));
}

function getAvailableYears(data: EnrichedStravaRun[]): number[] {
  return [...new Set(data.map((r) => r.year))];
}

function filterByYear(data: EnrichedStravaRun[], year: number) {
  return [...data].filter((r) => r.year === year);
}

export default function Year2025Page() {
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [filteredRunData, setFilteredRunData] = useState<EnrichedStravaRun[]>(
    [],
  );

  useEffect(() => {
    fetchStravaRunData().then((data) => {
      const enriched = enrich(data);
      const years = getAvailableYears(enriched);
      setYearOptions(years);
      setFilteredRunData(filterByYear(enriched, selectedYear));
    });
  }, [selectedYear]);

  const distanceGoal = selectedYear === 2025 ? 1000 : 700;

  return (
    <Fragment>
      <Content>
        <Divider />
        <Select
          inputId="strava-year-select"
          className={styles["my-select"]}
          options={yearOptions.map((year) => ({
            value: year,
            label: year.toString(),
          }))}
          value={{ value: selectedYear, label: selectedYear.toString() }}
          onChange={(opt) => setSelectedYear(opt ? opt.value : 2026)}
          isSearchable
          styles={{
            singleValue: (provided) => ({
              ...provided,
              color: "#fff",
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: backgroundColor,
              color: "white",
            }),
            container: (provided) => ({ ...provided, minWidth: 220 }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: "#222", // <-- dropdown background
              color: "white",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#333" : "#222",
              color: "white",
            }),
          }}
        />
        <SectionTitle text={`${selectedYear} Running Distance`} />
        <Statistics data={filteredRunData} distanceGoal={distanceGoal} />
        <Divider />
        <div>
          <RunningDistanceChart
            data={filteredRunData}
            year={selectedYear}
            distanceGoal={distanceGoal}
          />
        </div>
        <Divider />
        <div>
          <MonthlyDistanceChart data={filteredRunData} year={selectedYear} />
        </div>
      </Content>
    </Fragment>
  );
}
