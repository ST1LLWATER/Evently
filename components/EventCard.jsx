/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { Plock } from 'react-plock';
import { loadUserData } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMyEvents } from '../reactQuery/hooks';
import { useMutation, useQueryClient } from 'react-query';
import { useNotifications } from '@mantine/notifications';
import Loader from '../components/Loader';

const EventCard = () => {
  const { userData } = useSelector((state) => state);
  const { data, status } = useGetMyEvents();

  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  // const getEventDetails = async () => {
  //   let eventDetails = await fetch('/api/event/myevents');
  //   eventDetails = await eventDetails.json();
  //   setEventData(eventDetails);
  // };

  const deleteEvent = async ({ creator, event_id }) => {
    console.log(creator, event_id);
    const success = await fetch(`/api/event/delete/${event_id}/${creator}`, {
      method: 'DELETE',
    }).then((res) => res.json());

    console.log(success);

    if (!success.success) {
      notifications.showNotification({
        color: 'red',
        title: 'Error',
        message: 'Something went wrong',
      });
    }
  };

  const mutation = useMutation(deleteEvent, {
    onSuccess: () => {
      console.log('mutation running');
      queryClient.invalidateQueries('my_events');
      notifications.showNotification({
        color: 'green',
        title: 'Event Deleted',
        message: 'Event successfully deleted',
      });
    },
  });

  useEffect(() => {
    console.log('NEW FETCH STATUS');
    console.log(status);
  }, [status]);

  useEffect(() => {
    dispatch(loadUserData());
  }, []);

  const breakpoints = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
  ];
  //

  if (status === 'loading')
    return (
      <div className="absolute h-screen w-screen bg-white flex justify-center items-center">
        <Loader />
      </div>
    );

  if (data.events.length === 0) {
    return (
      <div className="text-8xl tracking-wide font-Rubik h-full w-full grid place-items-center">
        <div>
          <h1>No Events</h1>
          <h2>Come Tomorrow</h2>
        </div>
      </div>
    );
  }

  return (
    <Plock nColumns={breakpoints} gap={0} debounce={100}>
      {data.events.map((event, index) => {
        let creatorRollNo = event.creator.split(':')[1];
        let parsedDate = '' + new Date(event.scheduled_date);
        let [day, month, date, ...rest] = parsedDate.split(' ');
        event.scheduled_date = parsedDate;
        return (
          <div
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
            className="p-3 event-card"
          >
            <div className="border border-gray-200 p-6 rounded-xl bg-gray-50 shadow-sm cursor-default select-none hover:shadow-lg">
              <div className="flex justify-start gap-x-4 items-center">
                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                  <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                    {month}
                  </span>
                  <span className="font-medium text-lg text-gray-800 title-font leading-none">
                    {date}
                  </span>
                </div>

                <h2 className="text-xl text-gray-900 font-bold title-font mb-2">
                  {event.event_name}
                </h2>
                <div
                  onClick={() =>
                    mutation.mutate({
                      creator: creatorRollNo,
                      event_id: event.event_id,
                    })
                  }
                  className={`text-xl rounded-full bg-rose-800 p-1 ml-auto text-gray-900 font-bold title-font mb-2 ${
                    creatorRollNo.toUpperCase() !==
                    userData.roll_no.toUpperCase()
                      ? 'hidden'
                      : ''
                  }`}
                >
                  <MdDeleteForever
                    style={{
                      cursor: 'pointer',
                      color: 'white',
                      fontSize: '1.4rem',
                    }}
                  />
                </div>
              </div>
              <p className="break-words font-Franklin text-lg mt-4">
                {event.description}
              </p>
              {/* <div className="mt-2 leading-8 text-gray-500">
        {`Created By: ${event.creator}`}
      </div> */}
              <button
                onClick={() => router.push(`/events/${event.event_id}`)}
                className="mt-3 text-rose-500 hover:text-rose-800 inline-flex items-center"
              >
                Go to Event
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </Plock>
  );
};

export default EventCard;
