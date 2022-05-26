import NextImage from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserData } from '../redux/userSlice';

const SideNav = ({ eventData }) => {
  const dispatch = useDispatch();
  const [managers, setManagers] = useState([]);
  const [members, setMembers] = useState([]);

  const [creator, creator_rollno] = eventData.creator.split(':');

  const { userData, sharedVariables } = useSelector((state) => state);
  useEffect(() => {
    dispatch(loadUserData());
  }, []);

  useEffect(() => {
    setManagers([
      ...managers,
      ...sharedVariables.allUsers.filter((user) => {
        return (
          eventData.managers.includes(user.roll_no) &&
          !eventData.managers.includes(creator_rollno)
        );
      }),
    ]);
    setMembers([
      ...sharedVariables.allUsers.filter((user) => {
        return (
          eventData.year.includes(user.year) &&
          !eventData.managers.includes(user.roll_no) &&
          user.roll_no !== creator_rollno
        );
      }),
    ]);
  }, [sharedVariables?.allUsers, eventData]);

  return (
    <>
      <div
        className="
        hidden
        lg:flex flex-col
        w-64
        h-full
        py-4
        pb-0
        overflow-hidden
       "
      >
        <h2 className="text-xl flex justify-start items-center pb-2 uppercase border-b-2 px-2 font-semibold text-gray-400">
          Members
        </h2>

        <div className="flex flex-col px-2 flex-1 py-3 h-5/6 sidenav overflow-y-scroll">
          <div className="text-sm text-gray-400 font-Rubik font-semibold uppercase">
            Creator - 1
          </div>
          <div className="text-white py-2 flex gap-x-4 items-center">
            <div className="rounded-full h-10 w-10 overflow-hidden object-contain">
              <NextImage
                className="h-full w-full object-cover"
                height={500}
                width={500}
                src={`https://avatars.dicebear.com/api/initials/${creator}.svg`}
              />
            </div>
            <div className="flex flex-col text-sm font-Rubik font-semibold justify-center items-start">
              <div>{creator}</div>
              <div className="text-gray-400 text-xs">{creator_rollno}</div>
            </div>
          </div>

          {!!managers.length ? (
            <>
              <div className="text-sm text-gray-400 font-Rubik font-semibold uppercase mt-4">
                Managers - {managers.length}
              </div>
              {managers.map((banda, key) => {
                return (
                  <div
                    className="text-white py-2 flex gap-x-4 items-center"
                    key={key}
                  >
                    <div className="rounded-full h-10 w-10 overflow-hidden object-contain">
                      <NextImage
                        className="h-full w-full object-cover"
                        height={500}
                        width={500}
                        src={`https://avatars.dicebear.com/api/initials/${banda.username}.svg`}
                      />
                    </div>
                    <div className="flex flex-col text-sm font-Rubik font-semibold justify-center items-start">
                      <div>{banda.username}</div>
                      <div className="text-gray-400 text-xs">
                        {banda.roll_no.toUpperCase()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : null}
          {!!members.length && (
            <>
              <div className="text-sm text-gray-400 font-Rubik font-semibold uppercase mt-4">
                Members - {members.length}
              </div>
              {members.map((banda, key) => {
                return (
                  <div
                    className="text-white py-2 flex gap-x-4 items-center"
                    key={key}
                  >
                    <div className="rounded-full h-10 w-10 overflow-hidden object-contain">
                      <NextImage
                        className="h-full w-full object-cover"
                        height={500}
                        width={500}
                        src={`https://avatars.dicebear.com/api/initials/${banda.username}.svg`}
                      />
                    </div>
                    <div className="flex flex-col text-sm font-Rubik font-semibold justify-center items-start">
                      <div>{banda.username}</div>
                      <div className="text-gray-400 text-xs">
                        {banda.roll_no.toUpperCase()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="flex items-start flex-col pl-4 pr-2 py-4 border-t-2 w-full text-white -ml-4">
          <div className="flex justify-center items-center">
            <div className="rounded-full h-10 w-10 overflow-hidden object-contain">
              <NextImage
                className="h-full w-full object-cover"
                height={500}
                width={500}
                src={`https://avatars.dicebear.com/api/initials/${userData.username}.svg`}
              />
            </div>
            <div
              className="
          mx-2
          font-bold
          font-Rubik
          "
            >
              {userData.full_name}
              <div className="text-xs text-gray-400 ">
                {userData.roll_no.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
