import React from "react";

const PageDecoration = () => {
  return (
    <>
      {/* top right decoration */}
      <div className="absolute -top-72 -right-48 -z-10 h-[915px] w-[915px] rounded-full bg-white bg-gradient-decorator-circle blur-2xl"></div>
      {/* top left decoration */}
      <div className="absolute -top-40 -left-24 -z-10 h-[637px] w-[637px] rounded-full bg-white bg-gradient-decorator-circle blur-2xl"></div>
      {/* bottom right decoration */}
      <div className="absolute top-[688px] -right-48 -z-10 h-[664px] w-[664px] rounded-full bg-white bg-gradient-decorator-circle blur-2xl"></div>
    </>
  );
};

export default PageDecoration;
