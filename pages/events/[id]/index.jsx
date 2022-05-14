import React, { useState, useEffect, useCallback } from 'react';
import { ClockIcon, Pencil1Icon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import SideNav from '../../../components/SideNav';
import SuggestionsPanel from '../../../components/SuggestionsPanel';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const EventPage = () => {
  const [data, setData] = useState(null);
  let creator, creator_rollno;
  // const [creatorInfo, setCreatorInfo] = useState({
  //   creator: "",
  //   creator_rollno: "",
  // });
  const router = useRouter();

  const fetchEventData = async () => {
    const res = await fetch(`/api/event/${router.query.id}`);
    const data = await res.json();

    let parsedDate = new Date(data.scheduled_date);
    parsedDate = parsedDate.toLocaleDateString('en-US', options);
    data.scheduled_date = parsedDate;

    setData(data);
  };

  useEffect(() => {
    if (!router.query.id) return;
    fetchEventData();
  }, [router]);

  return data ? (
    <div className="flex flex-1 bg-gray-200 overflow-hidden">
      <div className="lg:bg-gray-700 lg:px-2 lg:shadow-xl lg:shadow-gray-400 sidenav text-white max-h-full overflow-auto">
        <SideNav eventData={data} />
      </div>
      <div className="text-xl p-6 lg:py-5 lg:px-8 overflow-y-auto flex-1 flex flex-col max-h-full">
        <h1 className="text-5xl font-Roboto font-extrabold inline pr-6 border-b-4 border-gray-200">
          {data.event_name}
        </h1>
        <h2 className="mb-4 font-Roboto font-normal text-2xl">
          {data.description}
        </h2>
        <div className="flex justify-start text-sm gap-x-1 items-center text-gray-700">
          <Pencil1Icon />
          {`
          ${([creator, creator_rollno] = data.creator.split(':')) && ''}
          Created By: ${creator.toUpperCase()} - ${creator_rollno.toUpperCase()}`}
        </div>
        <div className="flex justify-start text-sm gap-x-1 items-center text-gray-700">
          <ClockIcon />
          {`Scheduled On: ${data.scheduled_date}`}
        </div>
        {/*<h2>Looking Forward For Your Active Participation And Contribution</h2>*/}
        <SuggestionsPanel id={data.event_id} />
      </div>
    </div>
  ) : (
    'Loading..'
  );
};

// export async function getServerSideProps({ req, res }) {
//   try {
//     const cookieHeader = req.headers?.cookie;
//
//     const res = await fetch(
//       `http://localhost:4000/api/event/${context.query.id}`,
//       {
//         credentials: "same-origin",
//       }
//     );
//
//     const data = await res.json();
//
//     let parsedDate = new Date(data.scheduled_date);
//     parsedDate = parsedDate.toLocaleDateString("en-US", options);
//     data.scheduled_date = parsedDate;
//
//     return {
//       props: { data },
//     };
//   } catch {
//     return {
//       props: {},
//     };
//   }
// }

export default EventPage;
