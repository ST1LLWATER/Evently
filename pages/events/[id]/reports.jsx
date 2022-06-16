import React, { useEffect, useState } from 'react';
import { loadUserData } from '../../../redux/userSlice';
import { useRouter } from 'next/router';
import { Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';

const Reports = () => {
  const [data, setData] = useState(null);
  const [coordinators, setCoordinators] = useState([]);
  const router = useRouter();

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state);

  const fetchEventData = async () => {
    dispatch(loadUserData());
    const res = await fetch(`/api/event/${router.query.id}`);
    const data = await res.json();

    console.log(data);

    setCoordinators(() => {
      const [creator, creator_rollno] = data.creator.split(':');
      creator_rollno.toUpperCase();
      return [creator_rollno, ...data.managers];
    });

    // let parsedDate = new Date(data.scheduled_date);
    // parsedDate = parsedDate.toLocaleDateString('en-US', options);
    // data.scheduled_date = parsedDate;

    setData(data);
  };

  useEffect(() => {
    if (!router.query.id) return;
    fetchEventData();
  }, [router]);

  return (
    <div>
      <div
        className={`${
          coordinators.includes(userData.roll_no.toUpperCase())
            ? 'p-4 flex justify-end'
            : 'hidden'
        }`}
      >
        <Button className="bg-rose-600 hover:bg-rose-700">Add Report</Button>
      </div>
    </div>
  );
};

export default Reports;
