import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Head from 'next/head';

type TBanner = {
  id: 'gridSlider';
  active: boolean;
  data: {
    sliders: {
      content: string;
      link: string;
    }[];
    right_top: {
      content: string;
      link: string;
    };
    right_bottom: {
      content: string;
      link: string;
    };
  };
};

const getBannerData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banner/get-banner/gridSlider`,
      { next: { revalidate: 600 } },
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return undefined;
  }
};

const Banner = async () => {
  const data = await getBannerData();
  const banner: TBanner = data?.data;

  if (!banner) {
    return <></>;
  }

  const lcpImage = banner?.data?.sliders?.[0]?.content;

  return (
    <>
      {lcpImage && (
        <Head>
          <link rel="preload" as="image" href={lcpImage} />
        </Head>
      )}
      <div className="my-container mt-2 grid-cols-[5fr_2fr] gap-2 lg:grid">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {banner?.data?.sliders?.map((slider, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Link href={slider?.link}>
                      <Image
                        priority
                        height={500}
                        fetchPriority="high"
                        width={700}
                        src={slider?.content}
                        alt={slider.link}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                        className="h-full max-h-[550px] w-full"
                      />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex max-h-[550px] flex-col gap-2">
          <Link href={banner?.data?.right_top?.link || '/'} className="h-full">
            <Image
              priority
              fetchPriority="high"
              height={500}
              width={700}
              sizes="(max-width: 768px) 100vw, 350px"
              src={banner?.data?.right_top?.content}
              alt={banner?.data?.right_top?.link}
              className="h-full w-full object-cover"
            />
          </Link>
          <Link
            href={banner?.data?.right_bottom?.link || '/'}
            className="h-full"
          >
            <Image
              height={500}
              priority
              fetchPriority="high"
              width={700}
              sizes="(max-width: 768px) 100vw, 350px"
              src={banner?.data?.right_bottom?.content}
              alt={banner?.data?.right_bottom?.link}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
