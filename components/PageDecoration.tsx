import React from "react";

const PageDecoration = () => {
  return (
    <>
      {/* DESKTOP DECORATION */}

      {/* top right decoration */}
      <div className="absolute -top-72 -right-48 -z-10 hidden h-[50rem] w-[50rem] rounded-full bg-white bg-gradient-decorator-circle blur-2xl lg:block"></div>
      {/* top left decoration */}
      <div className="absolute -top-40 -left-24 -z-10 hidden h-[40rem] w-[40rem] rounded-full bg-white bg-gradient-decorator-circle blur-2xl lg:block"></div>
      {/* bottom right decoration */}
      <div className="absolute top-[688px] -right-48 -z-10 hidden h-[45rem] w-[45rem] rounded-full bg-white bg-gradient-decorator-circle blur-2xl lg:block"></div>

      {/* MOBILE DECORATION */}
      {/* left decoration */}
      <div className="absolute -top-32 -left-16 -z-10 block h-[20rem] w-[20rem] rounded-full bg-gradient-mobile-radial-l blur-xl lg:hidden"></div>

      {/* right decoration */}
      <div className="absolute -top-16 right-0 -z-10 block h-[25rem] w-[25rem] rounded-full bg-gradient-mobile-radial-r blur-xl lg:hidden"></div>
    </>
  );
};

export default PageDecoration;
