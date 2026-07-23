import PcBuilderProductCard from '@/components/pcBuilder/PcBuilderProductCard';
import { PcBuildSettings } from '@/types/pcbuilder';
import { TProduct } from '@/types/product.interface';
import React from 'react';

const getProducts = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/pc-builder/${id}`,
    );
    const data = await res.json();

    return data?.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getInitialSettings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings/pc-builder`,
    );
    const data = await res.json();

    return data?.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const SelectComponetPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await getProducts(id);
  const pcBuilder: PcBuildSettings = await getInitialSettings();

  const products: TProduct[] = data?.products || [];

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className=""></div>
      <div className="col-span-4 grid grid-cols-4 gap-3">
        {products?.map((product) => (
          <PcBuilderProductCard
            partId={id}
            key={product._id}
            pcBuilder={pcBuilder}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectComponetPage;
