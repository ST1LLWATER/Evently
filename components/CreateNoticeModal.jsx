import React, { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import { AiOutlinePlus } from 'react-icons/ai';
import NoticeForm from './NoticeForm';

const CreateEventModal = ({ event_id }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal
        opened={modalOpen}
        closeOnClickOutside={false}
        title="Create Event"
        size="lg"
        styles={{
          modal: {
            backgroundColor: 'white',
            padding: '20px 35px',
            color: 'black',
            borderRadius: '10px',

            '@media screen and (max-width: 500px)': {
              padding: '20px 15px',
            },
          },
          title: { color: 'black' },
          header: {
            '& > .mantine-ActionIcon-root': {
              color: 'black',
              outline: 'none',
            },
            '& > .mantine-ActionIcon-root:hover': {
              backgroundColor: 'transparent',
              color: 'black',
            },
          },
        }}
        // overlayColor="black"
        onClose={() => {
          //   setOpened(false);
          setModalOpen(false);
        }}
      >
        <NoticeForm setModalOpen={setModalOpen} event_id={event_id} />
      </Modal>
      <Button
        onClick={() => setModalOpen(true)}
        className="bg-rose-600 flex justify-center items-center absolute bottom-5 right-5 h-14 w-14 rounded-full hover:bg-rose-700"
      >
        <div className="text-xl">
          <AiOutlinePlus />
        </div>
      </Button>
    </>
  );
};

export default CreateEventModal;
