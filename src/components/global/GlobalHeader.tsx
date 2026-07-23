import React, { ReactNode } from 'react';

const GlobalHeader = ({
  title,
  subTitle,
  buttons,
}: {
  title: string;
  subTitle?: string;
  buttons?: ReactNode;
}) => {
  return (
    <div className="mb-2 flex w-full items-center justify-between border-b pb-1">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        {subTitle && <p className="text-gray text-sm">{subTitle}</p>}
      </div>
      {buttons && buttons}
    </div>
  );
};

export default GlobalHeader;
