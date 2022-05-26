import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetNotices } from '../reactQuery/hooks';

import marquee from 'react-fast-marquee';
import CreateNoticeModal from './CreateNoticeModal';
import Loader from './Loader';

const NoticeBoard = ({ admins, event_id }) => {
  const [coordinators, setCoordinators] = useState([]);
  const [Loading, setLoading] = useState(true);
  const { data, status } = useGetNotices({ event_id });

  useEffect(() => {
    setCoordinators(() => {
      const [creator, creator_rollno] = admins.creator.split(':');
      creator_rollno.toUpperCase();
      return [creator_rollno, ...admins.managers];
    });
  }, []);

  const { userData } = useSelector((state) => state);

  if (status === 'loading')
    return (
      <div className="absolute h-screen w-screen bg-white flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col relative h-full overflow-hidden lg:w-full w-full shadow-sm bg-gray-50 rounded-lg justify-end">
      <div className="h-full flex flex-col overflow-hidden mb-20 pt-4 px-3">
        <div className="flex flex-col" height="100%" direction="up">
          <div className="text-2xl pb-2 text-center border-b-2 border-b-gray-600 font-bold">
            Notice Board
          </div>
          <div className="flex-1 overflow-y-scroll sidenav">
            {data.notices.length > 0 &&
              data.notices.map((notice) => {
                let parsedDate = '' + new Date(notice.date);
                let [day, month, date, ...rest] = parsedDate.split(' ');
                return (
                  <div
                    className="last:border-b-0 py-4 border-b-2 border-gray-400"
                    key={notice.id}
                  >
                    <div className="flex gap-4 flex-row items-center">
                      <div
                        className={`w-12 flex-shrink-0 flex flex-col text-center leading-none ${
                          notice.date ? '' : 'hidden'
                        }`}
                      >
                        <span className="text-gray-500 text-md pb-2 mb-2 border-b-2 border-gray-200">
                          {month}
                        </span>
                        <span className="font-medium text-md text-gray-800 title-font leading-none">
                          {date}
                        </span>
                      </div>
                      <div className="flex select-none justify-between flex-col">
                        <div className="text-xl first-letter:text-rose-700 font-bold">
                          {notice.title}
                        </div>
                        <div className="text-sm leading-5">{notice.notice}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div
        className={`${
          coordinators.includes(userData.roll_no.toUpperCase()) ? '' : 'hidden'
        }`}
      >
        <CreateNoticeModal event_id={event_id} />
      </div>
    </div>
  );
};

export default NoticeBoard;
