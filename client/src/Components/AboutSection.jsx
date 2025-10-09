
import React from 'react';

const AboutSection = ({ title, content }) => {
  return (
    <section className="about-section">
      <h2 className='text-white font-bold text-2xl'>{title}</h2>
      {content.map((line, index) => (
        <p key={index} className='text-white'>{line}</p>
      ))}
    </section>
  );
};

export default AboutSection;
