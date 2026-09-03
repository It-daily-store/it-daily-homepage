import React from 'react';
import parser from 'html-react-parser';
import { cn } from '@/lib/utils';

const RenderHtml = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div className={cn(className, 'html_render')}>{parser(text || '')}</div>
  );
};

export default RenderHtml;
