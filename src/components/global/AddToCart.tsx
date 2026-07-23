import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Adjust path based on your shadcn/ui setup
import { ButtonProps } from '@/components/ui/button'; // Adjust to match your Button's type definitions

const AddToCart: React.FC<ButtonProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);
    // Simulate adding to cart (replace with your actual cart logic)
    setTimeout(() => {
      setIsLoading(false);
      console.log('Item added to cart!');
    }, 1000);
  };

  return <Button onClick={handleClick} disabled={isLoading} {...props} />;
};

export default AddToCart;
