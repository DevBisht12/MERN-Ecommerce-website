import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ProductCard({id,imgSrc1,name,price,category}) {

  const isMobile=useMediaQuery('(max-width:430px)');
  
  return (
    <Card sx={{ width: isMobile ? 172 : 234, maxWidth: '100%', borderRadius: 'none', m: 0.5, border: 0 }}>
      <CardOverflow>
        <AspectRatio ratio= "4/4" sx={{ minWidth: isMobile? 100: 200 }}>
          <img
            src={imgSrc1}
            loading="Loading..."
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">{category}</Typography>
        <Link
          sx={{ fontSize: 13 }}
          fontWeight="bold"
          color="neutral"
          textColor="text.primary"
          overlay
        >
          {name}
        </Link>

        <Typography
          level="title-lg"
          sx={{ mt: 1,fontWeight: 'regular',fontSize: 13 }}
          endDecorator={
            <Chip sx={{ display: isMobile ? 'none' : 'block' }} component="span" size="sm" variant="soft" color="neutral">
              Lowest price
            </Chip>
          }
        >
          {price}
        </Typography>
      </CardContent>
      <CardOverflow sx={{ display: 'none' }} >
        <Button variant="solid" color="danger" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}