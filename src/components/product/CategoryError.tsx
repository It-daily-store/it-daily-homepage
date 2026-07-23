'use client';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const CategoryError = ({ error }: { error: string }) => (
  <div className="my-container mt-3">
    <div className="border-destructive/25 bg-destructive/5 flex min-h-[500px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
      <AlertTriangle className="text-destructive/70 mb-4 h-16 w-16" />
      <h2 className="text-foreground mb-2 text-2xl font-bold">
        Category Not Available
      </h2>
      <p className="text-muted-foreground mb-6 max-w-lg">
        {error === 'not-found'
          ? "The category you're looking for doesn't exist or may have been moved."
          : "We're having trouble loading this category right now. Please try again later."}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default CategoryError;
