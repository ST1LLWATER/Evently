import React, { useState } from 'react';
import { Textarea, TextInput, Button, MultiSelect } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useNotifications } from '@mantine/notifications';
import { CalendarIcon, CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import { useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';

const EventForm = ({ setModalOpen, event_id }) => {
  const [formData, setFormData] = useState({
    title: null,
    notice: null,
    date: null,
    time: null,
    url: null,
  });

  const notifications = useNotifications();
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    if (formData.title === '' || formData.description === '') {
      notifications.showNotification({
        color: 'red',
        title: 'Error',
        message: 'Please Fill All Fields',
        autoClose: 2000,
        disallowClose: true,
      });
      return;
    }

    const id = notifications.showNotification({
      loading: true,
      title: 'Adding Notice',
      message: 'Please Wait Patiently',
      autoClose: false,
      disallowClose: true,
    });

    fetch(`/api/event/add/notice/${event_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        setFormData({
          title: null,
          notice: null,
          date: null,
          time: null,
          url: null,
        });
        setModalOpen(false);
        if (res.status !== 200) {
          notifications.updateNotification(id, {
            title: 'Error',
            color: 'red',
            message: `Notice Addition Failed!`,
            icon: <Cross1Icon />,
            autoClose: 4000,
          });
          throw new Error(`Notice Addition Failed!`);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        notifications.updateNotification(id, {
          color: 'teal',
          title: 'Notice Added!',
          message: 'Notice Added Successfully!',
          icon: <CheckIcon />,
          autoClose: 4000,
        });
      })
      .catch((err) => {
        console.log(err);
        notifications.updateNotification(id, {
          title: 'Error',
          color: 'red',
          message: `${err.message}`,
          icon: <Cross1Icon />,
          autoClose: 4000,
        });
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="grid place-items-center  text-black"
    >
      <div className="w-full flex flex-col gap-y-4">
        <TextInput
          // className="mb-4"
          className="placeholder-black"
          styles={{
            label: { color: 'black' },
            input: {
              backgroundColor: 'white',
              border: '1px solid gray',
              // "&::placeholder": { color: "black" },
            },
          }}
          id="eventName"
          required
          label="Title"
          placeholder="Notice Title"
          value={formData.title}
          onChange={(event) =>
            // form.setFieldValue("email", event.currentTarget.value)
            setFormData({ ...formData, title: event.target.value })
          }
        />

        <Textarea
          label="Notice"
          styles={{
            label: { color: 'black' },
            input: { backgroundColor: 'white', border: '1px solid gray' },
          }}
          placeholder="Enter The Notice"
          required
          autosize
          // maxLength={50}
          minRows={2}
          maxRows={3}
          value={formData.notice}
          onChange={(event) =>
            setFormData({ ...formData, notice: event.target.value })
          }
        />

        <DatePicker
          placeholder="Date"
          styles={{
            label: { color: 'black' },
            input: { backgroundColor: 'white', border: '1px solid gray' },
            icon: {
              color: 'black',
            },
          }}
          label="Date of occasion"
          value={formData.date}
          onChange={(event) => {
            setFormData({ ...formData, date: event });
          }}
          icon={<CalendarIcon />}
        />

        <TextInput
          // className="mb-4"
          className="placeholder-black"
          styles={{
            label: { color: 'black' },
            input: {
              backgroundColor: 'white',
              border: '1px solid gray',
              // "&::placeholder": { color: "black" },
            },
          }}
          id="meetUrl"
          label="Meet Url"
          placeholder="Meeting Url"
          value={formData.url}
          onChange={(event) =>
            setFormData({ ...formData, url: event.target.value })
          }
        />

        <Button
          // loading={isLoading ? true : false}
          className="rounded-lg self-end w-full sm:w-1/3 my-4 text-white bg-rose-600 hover:bg-rose-700"
          type="submit"
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
