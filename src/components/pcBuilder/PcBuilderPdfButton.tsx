'use client';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';
import { pdf } from '@react-pdf/renderer';
import { IPcBuild } from '@/types/pcbuilder';
import PcBuilderPdfSummary from './PcBuildSummary';
import { saveAs } from 'file-saver';

export default function PcBuilderPdfButton({ build }: { build: IPcBuild[] }) {
  const handleDownload = async () => {
    const doc = <PcBuilderPdfSummary buildData={build} />;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, 'BuildSummary.pdf');
  };

  return (
    <>
      <Button
        onClick={handleDownload}
        variant={'primary_light'}
        customClassName="flex-col"
        size={'sm'}
        className="h-14"
      >
        <Download size={18} />
        Download
      </Button>
    </>
  );
}
