import React from "react";

const SplashScreen = () => {
  let welcome = ["E", "v", "e", "n", "t", "L", "y"];

  return (
    <div className="splash-screen">
      <div className="flex lg:-mt-14">
        {welcome.map((letter, index) => {
          return (
            <span
              style={{
                animationDelay: `${index * 0.4}s`,
              }}
              className="text-6xl lg:text-9xl px-1 letters"
              key={index}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SplashScreen;
