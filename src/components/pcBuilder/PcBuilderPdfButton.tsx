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
    <Button
      onClick={handleDownload}
      variant={'outline'}
      className="w-full gap-2"
    >
      <Download size={17} />
      Download PDF
    </Button>
  );
}
