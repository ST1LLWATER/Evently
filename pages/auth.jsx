import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SVG from '../assets/register.svg';
import NextImage from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

import {
  TextInput,
  Button,
  Select,
  PasswordInput,
  InputWrapper,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';

const Register = () => {
  const { userData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [fullName, setFullName] = useState('');
  const [year, setYear] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [changeInputs, setChangeInputs] = useState(false);

  const notifications = useNotifications();
  const router = useRouter();

  const loading = () => {
    setTimeout(() => {
      setChangeInputs(!changeInputs);
    }, 240);
  };

  const handleLogin = (e) => {
    if (!rollNo || !password) {
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
      title: 'Loggin In',
      message: 'Please Wait Patiently',
      autoClose: false,
      disallowClose: true,
    });
    e.preventDefault();
    setIsLoading(true);
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        rollNo,
      }),
    })
      .then(async (res) => {
        let user = await res.json();
        if (res.status === 200) {
          return user;
        } else {
          setIsLoading(false);
          notifications.updateNotification(id, {
            title: 'Error',
            color: 'red',
            message: `Login Failed!\n ${user.message}`,
            icon: <Cross1Icon />,
            autoClose: 4000,
          });
          throw new Error(user.message);
        }
      })
      .then((user) => {
        setIsLoading(false);
        dispatch(setUserData(user.data));
        notifications.updateNotification(id, {
          color: 'teal',
          title: 'Logged In',
          message: 'Login Successful! Welcome To EventLy',
          icon: <CheckIcon />,
          autoClose: 4000,
        });
        router.push('/');
      })
      .catch((e) => {
        notifications.updateNotification(id, {
          title: 'Error',
          color: 'red',
          message: `Login Failed!\n ${e}`,
          icon: <Cross1Icon />,
          autoClose: 4000,
        });
      });
  };
  const handleSubmit = (event) => {
    if (
      !fullName ||
      !username ||
      !password ||
      !confirmPassword ||
      !rollNo ||
      !year
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

    setIsLoading(true);
    const id = notifications.showNotification({
      loading: true,
      title: 'Registering',
      message: 'Please Wait Patiently',
      autoClose: false,
      disallowClose: true,
    });
    event.preventDefault();
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        rollNo: rollNo,
        fullName: fullName,
        year: year,
      }),
    })
      .then(async (res) => {
        let user = await res.json();
        if (res.status === 200) {
          return user;
        } else {
          setIsLoading(false);
          notifications.updateNotification(id, {
            title: 'Error',
            message: `Registration Failed!\n You Must Be ${user.oldUser.full_name} Try Logging In!`,
            autoClose: 4000,
          });
          throw new Error('User Already Exists');
        }
      })
      .then((user) => {
        setIsLoading(false);
        dispatch(setUserData(user.user));
        notifications.updateNotification(id, {
          color: 'teal',
          title: 'Registration Successful',
          message: 'Registration Succeded! Welcome To EventLy',
          icon: <CheckIcon />,
          autoClose: 4000,
        });
        router.push('/');
      })
      .catch((e) => {
        notifications.updateNotification(id, {
          title: 'Error',
          message: `Registration Failed!\n ${e.message}`,
          autoClose: 4000,
        });
      });
    setRollNo('');
    setUsername('');
    setPassword('');
    setFullName('');
    setYear('');
    setConfirmPassword('');
  };

  return (
    <>
      <div className="flex flex-col relative lg:flex-row sm:min-h-screen bg-gray-200">
        <div
          className={`lg:w-1/2  ${
            !isLogin ? 'iLeft' : 'iRight'
          } common iLeft h-screen px-6 flex flex-col z-50 bg-gray-200 lg:absolute justify-evenly items-center`}
        >
          <div className="absolute w-20 sm:w-11/12 top-3 left-3">
            {/* <NextImage
              width={100}
              height={30}
              src={LOGO.src}
              alt="evently logo"
            /> */}
          </div>
          <div className="px-6">
            <NextImage width={500} height={500} src={SVG.src} alt="" />
          </div>
          <div className="text-3xl antialiased font-bold md:text-5xl w-10/12 text-center">
            Turn your <span className="text-gray-700">plans</span> to an
            organized <span className="text-gray-700">event</span>
          </div>
          <div className="text-lg font-semibold text-center text-gray-700 w-10/12">
            Now have an easier way to organize <br /> and manage events within
            your fingertips
          </div>
        </div>
        <form
          // onSubmit={handleSubmit}
          className={`bg-gray-800 ${
            !isLogin
              ? 'iRight lg:rounded-tl-2xl lg:rounded-bl-2xl lg:rounded-tr-none py-6'
              : 'iLeft lg:rounded-tr-2xl lg:rounded-br-2xl lg:rounded-tl-none py-20'
          } common lg:absolute lg:px-16 h-full grid place-items-center font-Rubik px-4 text-white sm:px-8 sm:py-6 lg:w-1/2 rounded-tl-2xl rounded-tr-2xl`}
        >
          <div
            className={`w-full flex flex-col ${isLogin ? '-mt-6 py-20' : ''}`}
          >
            <div className="mb-4 tracking-wide flex flex-col gap-y-2">
              <p className="text-4xl font-semibold text-gray-100">
                Welcome {`${!changeInputs ? 'To EventLy' : 'Back'}`}
              </p>
              <p className="text-5xl font-bold">
                {`${
                  !changeInputs
                    ? 'Get Yourself Registered'
                    : 'Login to your account'
                }`}
              </p>
            </div>
            <InputWrapper>
              <TextInput
                className={`mb-4 ${changeInputs ? 'hidden' : ''}`}
                styles={{
                  input: { color: 'black', padding: '15px 10px' },
                  label: { color: 'white', fontSize: '1rem' },
                  required: { color: 'red' },
                }}
                id="fullName"
                required
                label="Full Name"
                placeholder="Your name"
                value={fullName}
                onChange={(event) =>
                  // form.setFieldValue("email", event.currentTarget.value)
                  setFullName(event.target.value)
                }
              />

              <div className="sm:flex gap-4 my-4">
                <TextInput
                  className={`${changeInputs ? 'w-full py-6' : 'sm:w-1/2'}`}
                  styles={{
                    input: { color: 'black', padding: '15px 10px' },
                    label: { color: 'white', fontSize: '1rem' },
                    required: { color: 'red' },
                  }}
                  required
                  id="rollNo"
                  label="Roll Number"
                  description="College Roll Number"
                  placeholder="Roll Number"
                  value={rollNo}
                  onChange={(event) =>
                    // form.setFieldValue("email", event.currentTarget.value)
                    setRollNo(event.target.value)
                  }
                />

                <Select
                  className={`sm:w-1/2 ${changeInputs ? 'hidden' : ''}`}
                  styles={{
                    input: { color: 'black', padding: '15px 10px' },
                    label: { color: 'white', fontSize: '1rem' },
                    required: { color: 'red' },
                  }}
                  label="Year"
                  id="year"
                  description="Select your year"
                  placeholder="Current Year"
                  required
                  value={year}
                  data={[
                    { value: '1', label: '1st Year' },
                    { value: '2', label: '2nd Year' },
                    { value: '3', label: '3rd Year' },
                  ]}
                  onChange={(e) => {
                    setYear(e);
                  }}
                />
              </div>

              <TextInput
                className={`my-4 ${changeInputs ? 'hidden' : ''}`}
                styles={{
                  input: { color: 'black', padding: '15px 10px' },
                  label: { color: 'white', fontSize: '1rem' },
                  required: { color: 'red' },
                }}
                required
                id="username"
                label="Callsign/Username"
                description="Your callsign (Name used in the app)"
                placeholder="Callsign"
                value={username}
                onChange={(event) =>
                  // form.setFieldValue("email", event.currentTarget.value)
                  setUsername(event.target.value)
                }
              />

              <PasswordInput
                className="my-4"
                styles={{
                  input: { color: 'black', padding: '15px 10px' },
                  label: { color: 'white', fontSize: '1rem' },
                  required: { color: 'red' },
                }}
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                required
              />

              <PasswordInput
                className={`my-4 ${changeInputs ? 'hidden' : ''}`}
                styles={{
                  input: { color: 'black', padding: '15px 10px' },
                  label: { color: 'white', fontSize: '1rem' },
                  required: { color: 'red' },
                }}
                placeholder="Confirm Password"
                error={
                  password !== confirmPassword && confirmPassword.length >= 1
                    ? 'Password Does Not Match'
                    : ''
                }
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                required
              />
            </InputWrapper>

            <div className="flex sm:flex-row flex-col gap-4 py-4 sm:gap-10">
              <Button
                loading={isLoading ? true : false}
                className="rounded-lg sm:w-1/2 bg-blue-600 hover:bg-blue-700"
                onClick={isLogin ? handleLogin : handleSubmit}
              >
                Submit
              </Button>
              <Button
                className="rounded-lg sm:w-1/2 bg-gray-50 hover:bg-gray-200 text-gray-700"
                type="button"
                // onClick={handleLogin}
                onClick={() => {
                  setIsLogin(!isLogin);
                  loading();
                  setRollNo('');
                  setUsername('');
                  setPassword('');
                  setFullName('');
                  setYear('');
                  setConfirmPassword('');
                }}
              >
                {`${
                  !isLogin
                    ? 'Already Registered? Login'
                    : "Don't Have Account? Register"
                }`}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
