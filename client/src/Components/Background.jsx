import React from "react";

const Background = () => {
  return (
    <div className="w-full h-full overflow-hidden relative">
      <video
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
        style={{ objectPosition: 'right -100px' }} // 👈 shifts the video up
      >
        <source
          src="/images/vecteezy_happy-child-back-to-school-child-goes-to-school-with_28735054.mp4"
          type="video/mp4"
        />
      </video>
      <style jsx>{`
        @media (max-width: 768px) {
          video {
            object-position: center top !important;
          }
        }
        @media (max-width: 480px) {
          video {
            object-position: center center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Background;
