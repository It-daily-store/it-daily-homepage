import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { TCategory } from '@/types/category.interface';
import { TProduct } from '@/types/product.interface';
import Link from 'next/link';
import React from 'react';

const ProductBreadcrumb = ({
  breadcrumCats,
  product,
}: {
  breadcrumCats: TCategory[];
  product: TProduct;
}) => {
  if (!breadcrumCats?.length) {
    return null;
  }

  return (
    <Breadcrumb className="pb-3">
      <BreadcrumbList>
        {breadcrumCats?.map((cat) => (
          <React.Fragment key={cat._id}>
            <BreadcrumbItem>
              <Link
                className={`hover:text-primary text-dark-gray truncate text-sm`}
                href={`/${cat?.slug}`}
              >
                {cat?.name}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem className="truncate">
          <Link
            className={`hover:text-primary text-primary md:text-dark-gray text-sm`}
            href={product?.slug}
          >
            {product?.name}
          </Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductBreadcrumb;
