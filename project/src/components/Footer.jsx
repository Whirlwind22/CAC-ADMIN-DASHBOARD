import React from 'react';
import coatOfArms from '../assets/coatOfArms.png';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white p-4 text-center text-sm">
      <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-2 space-y-2 md:space-y-0">
        <a href="">
          <img src={coatOfArms} alt="coatOfArms" className="w-12 h-12 md:w-16 md:h-16" />
        </a>
        <span className="text-xs md:text-sm">
          © Copyright {new Date().getFullYear()} | CAC | All Rights Reserved | Powered by CAC Corporate Affairs Commission
        </span>
      </div>

      <div className="text-xs mt-2">
        ICT HELPDESK
      </div>
    </footer>
  );
};

export default Footer;
