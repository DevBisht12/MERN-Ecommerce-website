import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import useMediaQuery from "@mui/material/useMediaQuery";


export default function BasicSkeleton() {

  const isMobile = useMediaQuery("(max-width:430px)");


  return (
    <Card variant="outlined" sx={{ width:  isMobile ? 170: 240 , display:  'flex', margin:'5px' , gap: 1, border:0, borderRadius:0 }}>
      <AspectRatio ratio="5/4">
        <Skeleton variant="overlay">
          <img
            alt=""
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          />
        </Skeleton>
      </AspectRatio>
      {isMobile 
        ? <Typography variant="caption"><Skeleton>A heading subheading...</Skeleton></Typography>
        : Array.from({ length: 3 }).map((_, i) => (
            <Typography key={i}>
              <Skeleton>A heading subheading...</Skeleton>
            </Typography>
          ))
      }
     
    </Card>
  );
}


// import * as React from "react";
// import Skeleton from "@mui/material/Skeleton";
// import Box from "@mui/material/Box";

// export default function SkeletonColor() {
//   return (
//     <Box>
//       <Skeleton
//         sx={{ bgcolor: "grey.900" }}
//         variant="rectangular"
//         width={210}
//         height={118}
//       />
//     </Box>
//   );
// }
