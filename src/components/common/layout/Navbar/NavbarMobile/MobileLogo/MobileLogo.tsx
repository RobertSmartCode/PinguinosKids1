import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const MobileLogo: React.FC = () => {
  const alt = 'Logo móvil'; 
  const width = '49px'; // Ancho opcional para el logo móvil
  const height = 'auto'; // Altura opcional para el logo móvil
   const logoUrl = "https://firebasestorage.googleapis.com/v0/b/pinguinos-kids.appspot.com/o/LogoMobile%2FLogoMobile.png?alt=media&token=eca73682-14ea-4dbd-803d-31be6a85d6ad"

  return (
    <Box marginLeft="0px" marginRight="0px">
    <Link to="/" style={{ color: "whitesmoke", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", margin: "0px 0px 0px 0px", padding: "0px" }}>
      <img
        src={logoUrl}
        alt={alt}
        style={{
          width,
          height,
        }}
      />
    </Link>
    </Box>
  );
};

export default MobileLogo;
