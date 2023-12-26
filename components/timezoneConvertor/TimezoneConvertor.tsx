"use client";
import { useEffect, useState } from "react";
import Container from "../shared/Container";
import moment from "moment-timezone";
import { listTimeZones } from "@/node_modules/timezone-support";

const FORMAT = "MM/DD/YYYY h:mm:ss A";
const TIMEZONE_OPTION = listTimeZones().map((timezone) => (
  <option key={timezone} value={timezone}>
    {timezone}
  </option>
));

export default function TimezoneConvertor() {
  const [sourceTime, setSourceTime] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [sourceTimezone, setSourceTimezone] = useState("America/New_York");
  const [targetTimezone, setTargetTimezone] = useState("Asia/Tokyo");

  useEffect(() => {
    const sourceDateTime = moment().tz(sourceTimezone);
    setSourceTime(sourceDateTime.format(FORMAT));

    const targetDateTime = sourceDateTime.clone().tz(targetTimezone);
    setTargetTime(targetDateTime.format(FORMAT));
  }, [sourceTimezone, targetTimezone]);

  const handleSourceTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSourceTimezone(event.target.value);
  };

  const handleTargetTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTargetTimezone(event.target.value);
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold">Timezone Convertor</h1>

      <div className="mt-4">
        <label>Source Timezone</label>
        <select
          className="block w-full border border-gray-300 rounded-md p-2"
          value={sourceTimezone}
          onChange={handleSourceTimezoneChange}
        >
          {TIMEZONE_OPTION}
        </select>
      </div>

      <div className="mt-4">
        <p className="font-bold">{sourceTimezone}</p>
        {sourceTime}
      </div>

      <div className="mt-4">
        <label>Target Timezone</label>
        <select
          className="block w-full border border-gray-300 rounded-md p-2"
          value={targetTimezone}
          onChange={handleTargetTimezoneChange}
        >
          {TIMEZONE_OPTION}
        </select>
      </div>

      <div className="mt-4">
        <p className="font-bold">{targetTimezone}</p>
        {targetTime}
      </div>
    </Container>
  );
}
