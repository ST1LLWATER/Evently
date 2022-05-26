import React, { useState } from 'react';
import { Textarea, TextInput, Button, MultiSelect } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useNotifications } from '@mantine/notifications';
import { CalendarIcon, CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import { useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';

const EventForm = ({ setModalOpen }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [rno, setRno] = useState([]);
  const [managers, setManagers] = useState([]);
  const [year, setYear] = useState([]);
  const [meetUrl, setMeetUrl] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [isRollNumber, setIsRollNumber] = useState(true);

  const notifications = useNotifications();
  const queryClient = new useQueryClient();

  useEffect(() => {
    if (year[0]) {
      setIsRollNumber(true);
      fetch(`/api/users/rollnumbers?year=${year}`)
        .then((res) => res.json())
        .then((data) => {
          let rno = [];
          data?.rollnumbers.map((val) => {
            let x = val.roll_no.toUpperCase();
            rno.push(x);
          });
          return rno;
        })
        .then((data) => {
          setRno(data);
          setIsRollNumber(false);
        });
    }
  }, [year]);

  const handleSubmit = () => {
    if (
      eventName === '' ||
      eventDescription === '' ||
      year.length === 0 ||
      scheduleDate === ''
    ) {
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
      title: 'Creating Event',
      message: 'Please Wait Patiently',
      autoClose: false,
      disallowClose: true,
    });

    fetch('/api/event/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        description: eventDescription,
        managers,
        year,
        scheduleDate,
        meetUrl,
      }),
    })
      .then((res) => {
        setEventName('');
        setEventDescription('');
        setYear([]);
        setRno([]);
        setModalOpen(false);
        if (res.status !== 200) {
          notifications.updateNotification(id, {
            title: 'Error',
            color: 'red',
            message: `Event Creation Failed!`,
            icon: <Cross1Icon />,
            autoClose: 4000,
          });
          throw new Error(`Event Creation Failed!`);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        notifications.updateNotification(id, {
          color: 'teal',
          title: 'Event Created!',
          message: 'Event Created Successfully!',
          icon: <CheckIcon />,
          autoClose: 4000,
        });
      })
      .then(() => {
        queryClient.invalidateQueries('my_events');
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

  const mutation = useMutation(handleSubmit, {
    onSuccess: () => {
      console.log('success');
      queryClient.invalidateQueries('my_events');
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
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
          label="Event Name"
          placeholder="Event name"
          value={eventName}
          onChange={(event) =>
            // form.setFieldValue("email", event.currentTarget.value)
            setEventName(event.target.value)
          }
        />

        <Textarea
          label="Description"
          styles={{
            label: { color: 'black' },
            input: { backgroundColor: 'white', border: '1px solid gray' },
          }}
          placeholder="Describe The Event Briefly"
          required
          autosize
          // maxLength={50}
          minRows={2}
          maxRows={3}
          value={eventDescription}
          onChange={(event) => setEventDescription(event.target.value)}
        />

        <MultiSelect
          placeholder="Event Scope"
          styles={{
            defaultValue: { backgroundColor: 'rgb(229 231 235)' },
            label: { color: 'black' },
            defaultValueRemove: { color: 'black' },
            input: { backgroundColor: 'white', border: '1px solid gray' },
          }}
          label="Years which will be participating"
          required
          value={year}
          data={[
            { value: '1', label: '1st Year' },
            { value: '2', label: '2nd Year' },
            { value: '3', label: '3rd Year' },
          ]}
          onChange={(val) => {
            setYear(val);
          }}
          clearable
        />

        <MultiSelect
          disabled={isRollNumber || year.length === 0}
          styles={{
            defaultValue: { backgroundColor: 'rgb(229 231 235)' },
            label: { color: 'black' },
            defaultValueRemove: { color: 'black' },
            input: { backgroundColor: 'white', border: '1px solid gray' },
          }}
          placeholder="Roll Number(s)"
          label="Select Manager(s)"
          data={rno}
          onChange={(val) => setManagers(val)}
          clearable
          searchable
          nothingFound="No User Found"
        />

        <DatePicker
          placeholder="Pick date"
          styles={{
            label: { color: 'black' },
            input: { backgroundColor: 'white', border: '1px solid gray' },
            icon: {
              color: 'black',
            },
          }}
          label="Event date"
          value={scheduleDate}
          onChange={(event) => {
            setScheduleDate(event);
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
          label="Meet Url (If Any)"
          placeholder="Meeting Url"
          value={meetUrl}
          onChange={(event) => setMeetUrl(event.target.value)}
        />

        <Button
          // loading={isLoading ? true : false}
          className="rounded-lg self-end w-full sm:w-1/3 my-4 text-white bg-rose-600 hover:bg-rose-700"
          type="submit"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
