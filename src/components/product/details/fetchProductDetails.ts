import { TCategory } from '@/types/category.interface';
import { TProduct } from '@/types/product.interface';

export type TProductDetails = {
  product?: TProduct;
  relatedProducts: TProduct[];
  breadcrumCats: TCategory[];
};

export const fetchProductDetails = async (
  slug: string,
): Promise<TProductDetails> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-single/${slug}`,
      {
        cache: 'force-cache',
        next: {
          revalidate: 60,
        },
      },
    );
    const data = await res.json();

    return {
      product: data?.data?.product,
      relatedProducts: data?.data?.relatedProducts || [],
      breadcrumCats: data?.data?.breadcrum || [],
    };
  } catch {
    return { product: undefined, relatedProducts: [], breadcrumCats: [] };
  }
};
