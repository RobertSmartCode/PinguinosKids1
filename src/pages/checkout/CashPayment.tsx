// CashPayment.jsx
import { useState, useContext, useEffect } from 'react';
import {  Snackbar, Tooltip } from '@mui/material';
import { db} from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FaWhatsapp } from 'react-icons/fa';

const CashPayment = () => {
  const { cart, clearCart, getSelectedShippingMethod, getTotalPrice, discountInfo, getCustomerInformation } = useContext(CartContext)! || {};
  const subtotal = getTotalPrice ? getTotalPrice() : 0;
  const selectedShippingMethod = getSelectedShippingMethod();

  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState<string>('');
  const [whatsappURL, setWhatsappURL] = useState('');

  const phoneNumber = '+5491136557584';

  const shippingCost = selectedShippingMethod ? selectedShippingMethod.price : 0;
  const discountPercentage = discountInfo?.discountPercentage ?? 0;
  const maxDiscountAmount = discountInfo?.maxDiscountAmount ?? 0;
  const discountAmount = (discountPercentage / 100) * (subtotal + shippingCost);

  let total = (subtotal + shippingCost) * (1 - (discountPercentage ?? 0) / 100);

  if (discountAmount < maxDiscountAmount) {
    total = (subtotal + shippingCost) * (1 - discountPercentage / 100);
  } else {
    total = subtotal + shippingCost - maxDiscountAmount;
  }

  const userData = getCustomerInformation()!;




  useEffect(() => {

    const generateWhatsAppURL = () => {
      const message = `¡Nueva orden!\n\nTeléfono: ${userData.phone}\nCliente: ${
        userData.firstName
      }\nDirección de entrega: CP:${userData.postalCode}, ${userData.city}, ${userData.department}, ${userData.streetAndNumber}\n\nProductos:\n${cart
        .map(
          (product) =>
            `${product.title}, SKU: ${
              product.sku
            }, Precio: ${product.unit_price}, Cantidad: ${
              product.quantity
            }, Total: ${product.unit_price * product.quantity}\n`
        )
        .join('')}`;
      const encodedMessage = encodeURIComponent(message);
      return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    };

    setWhatsappURL(generateWhatsAppURL()); 

  }, []); 

  const handleOrder = async () => {
    const order = {
      userData,
      items: cart,
      shippingMethod: selectedShippingMethod ? selectedShippingMethod.name : 'No shipping method',
      shippingCost,
      total,
      date: serverTimestamp(),
      status: "pending",
      paymentType: "efectivo", 
    };

    const ordersCollection = collection(db, 'orders');

    try {
      const orderDocRef = await addDoc(ordersCollection, {
        ...order,
      });

      console.log('Orden creada con éxito:', orderDocRef.id);

      navigate('/checkout/pendingverification');
      setSnackbarMessage('Orden generada con éxito.');
      setSnackbarOpen(true);
      clearCart()
    } catch (error) {
      console.error('Error al generar la orden:', error);
      setUploadMessage('Error al generar la orden.');
    }
  };




  return (
    <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '40px' }}>
    <h2 style={{ color: 'black' }}>Mandar el Pedido por WhatsApp</h2>
    <Tooltip title="Enviar mensaje por WhatsApp">
      <a
        href={whatsappURL} // Establece la URL generada para WhatsApp
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#25d366',
          color: 'white',
          borderRadius: '8px', // Ajusta el radio de los bordes según sea necesario
          padding: '10px 20px', // Ajusta el padding horizontal y vertical según sea necesario
          textDecoration: 'none',
          display: 'block', // Cambia a bloque para permitir el centrado horizontal
          margin: '0 auto', // Centra horizontalmente
          maxWidth: '20%', // Establece el ancho máximo al 20% del contenedor
          zIndex: 99,
        }}
        onClick={handleOrder}
      >
        <FaWhatsapp size={40} />
      </a>
    </Tooltip>

    <p>{uploadMessage}</p>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={() => setSnackbarOpen(false)}
      message={snackbarMessage}
    />
  </div>
);

  
};

export { CashPayment };
