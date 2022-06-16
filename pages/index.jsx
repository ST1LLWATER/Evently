import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { negateShouldAnimate } from '../redux/sharedVariables';
import SplashScreen from '../components/SplashScreen';
import Typewriter from 'typewriter-effect';

const LandingPage = () => {
  const { sharedVariables } = useSelector((state) => state);
  const [isAnimating, setIsAnimating] = useState(true);

  const dispatch = useDispatch();

  const animation = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3800);
    });
  };

  const router = useRouter();

  useEffect(() => {
    animation().then(() => {
      setIsAnimating(false);
      dispatch(negateShouldAnimate());
    });

    const shouldAnimate = localStorage.getItem('shouldAnimate');
    if (shouldAnimate === 'false') {
      dispatch(negateShouldAnimate());
    }
  }, [sharedVariables.shouldAnimate, dispatch]);

  if (isAnimating && sharedVariables.shouldAnimate) {
    //ENABLE LATER
    // if (isAnimating) {
    return <SplashScreen />;
  }

  return (
    <div className="hero px-4 lg:px-10 gap-y-4 font-Rubik flex flex-col justify-start text-white font-bold text-5xl md:text-5xl lg:text-8xl">
      <div className="mt-32 md:mt-52 tracking-wide">
        <Typewriter
          options={{
            strings: ['Welcome To EventLy', 'Management made easy!'],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <p className="text-2xl lg:text-3xl font-semibold font-Franklin">
        Now managing and co-ordination events made simpler like never before....
      </p>
      <div className="flex flex-col sm:flex-row text-lg md:text-3xl font-semibold text-white sm:w-1/3 gap-4 sm:gap-10">
        {/* <button className="rounded-lg py-2 px-4 sm:w-1/2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
          Profile
        </button> */}
        <button
          onClick={() => router.push('/events')}
          className="rounded-lg py-2 px-4 sm:w-1/2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
        >
          Events
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
