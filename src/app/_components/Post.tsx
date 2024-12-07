"use client";

import { useState } from "react";

import { api } from "@/trpc/react";
import CourseCard from "./CourseCard";
import { apiResult } from "../constant";

type Data = {
  courseName: string
  courseDescription: string
  coursePartner: [{
    title: string,
    logo: string,
  }]
}

async function fetchCourses() {
  try {
    const response = await fetch(
      'https://learnext-7ux2hdwqk-dlai-eng.vercel.app/api/trpc/course.getAll?input=%7B%22json%22%3A%7B%22isOnSale%22%3Atrue%7D%7D'
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    // Handle the data as needed, e.g., display it on the web page
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchCourses();


export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();
  const utils = api.useUtils();
  const [name, setName] = useState("");

  const [filter, setFilter] = useState("");

  console.log(apiResult.result.data.json.courses);

  // should come from api
  const data = filter ? apiResult.result.data.json.courses.filter(course => (
    course.courseName?.includes(filter) || course.coursePartner?.some(p => p.title.includes(filter)) || course.courseDescription?.includes(filter)
  )) : apiResult.result.data.json.courses;

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <div style={{ backgroundColor: 'gray', padding: 12 }}>
        <input
          type="text"
          placeholder="Title"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          paddingTop: 12,
        }}>
          {data.map(fD => (
            <CourseCard data={fD} />
          ))}
        </div>
      </div>
    </div>
  );
}
