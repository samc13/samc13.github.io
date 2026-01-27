"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import Content from "../../../scaffolding/Content";
import Divider from "../../../scaffolding/Divider";
import styles from "../../../scaffolding/dropdown.module.scss";
import SectionTitle from "../../../scaffolding/SectionTitle";
import {
  convertSecondsToTime,
  convertTimeToSeconds,
} from "../../../utils/TimeUtils";
import {
  BenchmarkEffort,
  BenchmarksData,
  fetchBenchmarkData,
} from "./benchmarkData";
import classes from "./benchmarks.module.scss";

const backgroundColor = "var(--background)";

type EnrichedEffort = BenchmarkEffort & {
  totalSeconds: number;
  overallRank?: number;
};

export default function BenchmarksPage() {
  const [benchmarks, setBenchmarks] = useState<BenchmarksData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number>(5000);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchBenchmarkData()
      .then((data) => {
        setBenchmarks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load benchmark data: " + err.message);
        setLoading(false);
        console.error("Error fetching benchmarks:", err);
      });
  }, []);

  if (loading) {
    return (
      <Content>
        <div className={classes["loading"]}>Loading benchmark data...</div>
      </Content>
    );
  }

  if (error) {
    return (
      <Content>
        <div className={classes["error"]}>{error}</div>
      </Content>
    );
  }

  const distanceOptions = benchmarks
    .map((b) => ({
      value: b.distance,
      label: `${b.distance}m`,
    }))
    .filter((opt) => opt.value != null);

  const selectedBenchmark = benchmarks.find(
    (b) => b.distance === selectedDistance,
  );

  // Flatten all efforts, enrich with seconds, and rank them
  const allEfforts: EnrichedEffort[] = [];
  if (selectedBenchmark) {
    selectedBenchmark.yearlyBestEfforts.forEach((yearly) => {
      yearly.efforts.forEach((effort) => {
        allEfforts.push({
          ...effort,
          totalSeconds: convertTimeToSeconds(effort.time),
        });
      });
    });
  }

  // Sort by fastest (lowest seconds) and assign ranks
  allEfforts.sort((a, b) => a.totalSeconds - b.totalSeconds);
  allEfforts.forEach((effort, index) => {
    if (index < 3) {
      effort.overallRank = index + 1;
    }
  });

  // Helper to get medal icon
  const getMedalIcon = (rank?: number) => {
    if (rank === 1) return <span className={classes["medal-gold"]}></span>;
    if (rank === 2) return <span className={classes["medal-silver"]}></span>;
    if (rank === 3) return <span className={classes["medal-bronze"]}></span>;
    return null;
  };

  return (
    <Content>
      <div className={classes["container"]}>
        <SectionTitle text="Benchmarks" />

        {isClient && (
          <div className={classes["distance-selector"]}>
            <label>Distance: </label>
            <Select
              inputId="benchmark-distance-select"
              className={styles["my-select"]}
              value={distanceOptions.find(
                (opt) => opt.value === selectedDistance,
              )}
              onChange={(option) => option && setSelectedDistance(option.value)}
              options={distanceOptions}
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
                  backgroundColor: "#222",
                  color: "white",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#333" : "#222",
                  color: "white",
                }),
              }}
            />
          </div>
        )}

        <Divider />

        {selectedBenchmark && (
          <div className={classes["benchmark-results"]}>
            {selectedBenchmark.yearlyBestEfforts.map((yearly, yearIndex) => {
              // Sort efforts within year from fastest to slowest
              const sortedEfforts = [...yearly.efforts]
                .map((effort) => ({
                  ...effort,
                  totalSeconds: convertTimeToSeconds(effort.time),
                }))
                .sort((a, b) => a.totalSeconds - b.totalSeconds);

              // Calculate average time for the year
              const totalSeconds = sortedEfforts.reduce(
                (sum, effort) => sum + effort.totalSeconds,
                0,
              );
              const averageSeconds = totalSeconds / sortedEfforts.length;
              const averageTime = convertSecondsToTime(averageSeconds);

              // Helper to format date as "MMM - DD"
              const formatDate = (dateStr: string) => {
                const date = new Date(dateStr);
                const month = date.toLocaleString("en-US", { month: "short" });
                const day = date.getDate().toString().padStart(2, "0");
                return `${day} ${month}`;
              };

              return (
                <div key={yearly.year}>
                  {yearIndex > 0 && <Divider />}
                  <div className={classes["year-section"]}>
                    <div className={classes["year-header"]}>
                      <h2>{yearly.year}</h2>
                      <span className={classes["year-average"]}>
                        Avg: {averageTime}
                      </span>
                    </div>
                    <ul className={classes["efforts-list"]}>
                      {sortedEfforts.map((effort, idx) => {
                        const enrichedEffort = allEfforts.find(
                          (e) =>
                            e.date === effort.date && e.time === effort.time,
                        );
                        const medal = getMedalIcon(enrichedEffort?.overallRank);

                        return (
                          <li key={idx} className={classes["effort-item"]}>
                            <span className={classes["medal"]}>{medal}</span>
                            <span className={classes["date"]}>
                              {formatDate(effort.date)}
                            </span>
                            <span className={classes["time"]}>
                              {effort.time}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Content>
  );
}
