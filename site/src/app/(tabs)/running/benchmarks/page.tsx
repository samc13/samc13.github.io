"use client";

import { useEffect, useState } from "react";
import Content from "../../../scaffolding/Content";
import { BenchmarksData, fetchBenchmarkData } from "./benchmarkData";

export default function BenchmarksPage() {
  const [benchmarks, setBenchmarks] = useState<BenchmarksData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        <div>Loading benchmark data...</div>
      </Content>
    );
  }

  if (error) {
    return (
      <Content>
        <div style={{ color: "red" }}>{error}</div>
      </Content>
    );
  }

  return <></>;
}
