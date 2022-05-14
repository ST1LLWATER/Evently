import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers } from '../../redux/sharedVariables';
import CreateEventModal from '../../components/CreateEventModal';
import EventCard from '../../components/EventCard';
import { useGetAllUsers } from '../../reactQuery/hooks';
import Loader from '../../components/Loader';
import ClassMembersNav from '../../components/ClassMembersNav';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { data, status } = useGetAllUsers();

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data?.success === false) {
      router.push('/auth');
    } else {
      dispatch(setAllUsers(data.allUsers));
      setLoading(false);
    }
  }, [data, router]);

  return !loading ? (
    <>
      <div className="flex flex-1 overflow-y-auto">
        <div className="bg-gray-700 lg:px-2 lg:shadow-xl lg:shadow-gray-400 sidenav text-white max-h-full overflow-auto">
          <ClassMembersNav />
        </div>
        <div className="flex-1 bg-gray-200 overflow-y-auto max-h-full">
          <EventCard />
        </div>
      </div>
      <div className="absolute bottom-5 right-10">
        <CreateEventModal />
      </div>
    </>
  ) : (
    <div className="absolute h-screen w-screen bg-white flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default Home;
