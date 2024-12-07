"use client";

import React from 'react';

type Data = {
    courseName: string
    courseDescription: string
    coursePartner: {
      title: string,
      logo: string,
    }
  }

const CourseCard = ({ data }: any) => {
    const { courseName, courseDescription, coursePartner } = data;
    const { title, logo } = coursePartner?.[0] || {};
    
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        gap: 8,
    }}>
        <p>{courseName}</p>
        <p>{courseDescription}</p>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        }}>
            <img src={logo} />
            <p>{title}</p>
        </div>
    </div>
  );
};

export default CourseCard;
