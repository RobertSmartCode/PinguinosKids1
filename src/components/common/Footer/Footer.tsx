import { Box, Typography, Grid } from '@mui/material';

import { Link } from 'react-router-dom';


const Footer = () => {

  return (
    <Box sx={{ backgroundColor: '#f0f0f0'}}>
      <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center' }}>
        {/* Contenido adicional */}
        <Box mt={4}>
        <Typography variant="h5" color="prymary" gutterBottom>
          Pinguinos Kids
        </Typography>
          <Typography variant="body2" gutterBottom>
          
                Dirección: Rivadavia 2757, local 9, Galeria Wuilly <br />
                Teléfono: +5491136221705<br />
                Correo electrónico: pinguinoskidsonce@gmail.com<br />
             
          </Typography>
        
          {/* Agrega formas de pago aquí */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Typography variant="body1">
                <Link
                  to="/como-comprar-por-la-web"
                  style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
                >
                  CÓMO COMPRAR EN LA WEB
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <Link
                  to="/compras-de-forma-presencia"
                  style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
                >
                  COMPRAS PRESENCIALES EN EL LOCAL
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <Link
                  to="/envio-y-seguimiento"
                  style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
                >
                  ENVIOS Y SEGUIMIENTO
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <Link
                  to="/terminos-y-condiciones"
                  style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
                >
                  TERMINOS Y CONDICIONES
                </Link>
              </Typography>
            </Grid>
          </Grid>
          
          {/* Agrega información sobre la suscripción a la newsletter aquí */}
          <Typography variant="body2" gutterBottom color="inherit">
            © Copyright pinguinos Kids - 2024. Todos los derechos reservados.
           
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
