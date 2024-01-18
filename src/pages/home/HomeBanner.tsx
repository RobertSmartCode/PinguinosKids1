import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const HomeBanner: React.FC = () => {
  const banner="https://firebasestorage.googleapis.com/v0/b/pinguinos-kids.appspot.com/o/LogoMobile%2FHomeBanner%20.png?alt=media&token=90588c2d-f44a-49fc-8378-54bcdbccf712"
  return (
    <Grid container justifyContent="center" alignItems="center" marginTop="0px">
      <Grid item xs={12} lg={6}>
        <Link to="/shop">
          <img
            src={banner}
            alt="Banner"
            style={{
              width: "100%", 
              height: "auto", 
              cursor: "pointer", 
            }}
          />
        </Link>
      </Grid>
    </Grid>
  );
};

export default HomeBanner;
