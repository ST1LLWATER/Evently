import React, { useState } from 'react';
import EventForm from './EventForm';
import { Modal, Button } from '@mantine/core';

const CreateEventModal = () => {
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
        <EventForm setModalOpen={setModalOpen} />
      </Modal>
      <Button
        size="lg"
        className="bg-rose-600 hover:bg-rose-700 outline-none"
        onClick={() => setModalOpen(true)}
      >
        Create Event
      </Button>
    </>
  );
};

export default CreateEventModal;
