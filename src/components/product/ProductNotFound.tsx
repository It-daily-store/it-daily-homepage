import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { generateStaticParams } from '@/app/product/[slug]/page';

const ProductNotFound = () => {
  return (
    <div className="my-container my-8">
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
        <div className="relative">
          <div className="bg-muted flex size-20 items-center justify-center rounded-full">
            <AlertCircle className="text-dark-gray size-10" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-foreground text-3xl font-bold">
            Product Not Found
          </h1>
          <p className="text-muted-foreground max-w-md text-lg">
            Sorry, the product you&apos;re looking for doesn&apos;t exist or may
            have been removed.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="default">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>

        <div className="bg-muted/50 mt-8 max-w-md rounded-lg p-6">
          <h3 className="mb-2 font-semibold">What you can do:</h3>
          <ul className="text-muted-foreground space-y-1 text-left text-sm">
            <li>• Check the URL for any typos</li>
            <li>• Browse our product categories</li>
            <li>• Use the search function</li>
            <li>• Contact support if you need help</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductNotFound;
