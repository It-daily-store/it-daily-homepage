import RenderHtml from '@/components/global/editor/RenderHtml';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TProduct } from '@/types/product.interface';
import React from 'react';
import ProductReviews from './ProductReviews';
import ProductSpecifications from './ProductSpecifications';

const ProductTabs = ({ product }: { product: TProduct }) => {
  const hasSpecifications =
    product?.attributes && product?.attributes?.length > 0;

  return (
    <Tabs defaultValue={hasSpecifications ? 'specifications' : 'description'}>
      <TabsList className="w-full justify-start">
        {hasSpecifications && (
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
        )}
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent
        value="specifications"
        className="bg-background-foreground mt-2 md:mt-4"
      >
        <ProductSpecifications product={product} />
      </TabsContent>
      <TabsContent value="description" className="mt-4">
        <div className="prose max-w-none">
          <RenderHtml text={product?.description} />
        </div>
      </TabsContent>
      <TabsContent value="reviews" className="mt-4">
        <ProductReviews product={product} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
