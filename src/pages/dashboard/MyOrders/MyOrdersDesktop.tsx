import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  getDocs,
  collection,
  DocumentData,
} from "firebase/firestore";
import {
  Typography,
  Card,
  CardContent,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Modal,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Order } from "../../../type/type";

const MyOrdersDesktop: React.FC = () => {
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  useEffect(() => {
    const ordersCollection = collection(db, "orders");

    getDocs(ordersCollection)
      .then((res) => {
        const newArr: Order[] = res.docs.map((order) => ({
          ...(order.data() as DocumentData),
          id: order.id,
          date: order.data().date.toDate(),
        })) as Order[];

        // Ordenar las órdenes del más nuevo al más viejo
        newArr.sort((a, b) => b.date.getTime() - a.date.getTime());

        setMyOrders(newArr);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDetailsModalOpen = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Paginación
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = myOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Box sx={{ padding: "0px", margin: "0px" }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Cliente</TableCell>
              <TableCell align="center">Correo</TableCell>
              <TableCell align="center">Cantidad Total</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Ver Detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id} style={{ cursor: 'pointer' }}>
                <TableCell align="center">{order.userData.firstName}</TableCell>
                <TableCell align="center">{order.userData.email}</TableCell>
                <TableCell align="center">{order.total}</TableCell>
                <TableCell align="center">{order.date.toLocaleString()}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Ver detalles">
                    <IconButton onClick={() => handleDetailsModalOpen(order)}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        <IconButton sx={{ fontSize: '32px', marginRight: '16px' }} onClick={prevPage} disabled={currentPage === 1}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="body1" sx={{ marginRight: '16px' }}>
          Página {currentPage}
        </Typography>
        <IconButton sx={{ fontSize: '32px' }} onClick={nextPage} disabled={indexOfLastOrder >= myOrders.length}>
          <NavigateNextIcon />
        </IconButton>
      </Box>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card style={{ width: '70%', margin: 'auto', marginTop: '5%', maxHeight: '80%', overflowY: 'auto' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Detalles del Pedido Seleccionado
            </Typography>
            {selectedOrder && (
              <div>
                <Typography variant="body1">Total: {selectedOrder.total}</Typography>
                <Typography variant="body1">Tipo de Pago: {selectedOrder.paymentType}</Typography>
                <Typography variant="body1">Email: {selectedOrder.userData.email}</Typography>
                <Typography variant="body1">Recibe Ofertas: {selectedOrder.userData.receiveOffers ? 'Sí' : 'No'}</Typography>
                <Typography variant="body1">País: {selectedOrder.userData.country}</Typography>
                <Typography variant="body1">Documento de Identificación: {selectedOrder.userData.identificationDocument}</Typography>
                <Typography variant="body1">Nombre: {selectedOrder.userData.firstName}</Typography>
                <Typography variant="body1">Apellido: {selectedOrder.userData.lastName}</Typography>
                <Typography variant="body1">Teléfono: {selectedOrder.userData.phone}</Typography>
                <Typography variant="body1">Recibirá el envío otra Persona: {selectedOrder.userData.isOtherPerson ? 'Sí' : 'No'}</Typography>
                {selectedOrder.userData.isOtherPerson && (
                  <>
                    <Typography variant="body1">Nombre de Otra Persona: {selectedOrder.userData.otherPersonFirstName}</Typography>
                    <Typography variant="body1">Apellido de Otra Persona: {selectedOrder.userData.otherPersonLastName}</Typography>
                  </>
                )}
                <Typography variant="body1">Calle y Número: {selectedOrder.userData.streetAndNumber}</Typography>
                <Typography variant="body1">Departamento: {selectedOrder.userData.department}</Typography>
                <Typography variant="body1">Barrio: {selectedOrder.userData.neighborhood}</Typography>
                <Typography variant="body1">Ciudad: {selectedOrder.userData.city}</Typography>
                <Typography variant="body1">Código Postal: {selectedOrder.userData.postalCode}</Typography>
                <Typography variant="body1">Provincia: {selectedOrder.userData.province}</Typography>
                <Typography variant="body1">Tipo de Cliente: {selectedOrder.userData.customerType}</Typography>
                {selectedOrder.userData.customerType === 'invoice' && (
                  <Typography variant="body1">CUIT/CUIL: {selectedOrder.userData.cuilCuit}</Typography>
                )}
                {selectedOrder.userData.customerType === 'invoice' && (
                  <Typography variant="body1">Nombre de la Empresa: {selectedOrder.userData.businessName}</Typography>
                )}
                <Typography variant="body1">Productos:</Typography>
                {selectedOrder.items.map((product, index) => (
                  <div key={index}>
                    {product.images && product.images.length > 0 && (
                      <img src={product.images[0]} alt={product.title} style={{ width: '50px', height: '50px', margin: '5px' }} />
                    )}
                    <Typography variant="body2" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Precio: {product.unit_price} | Cantidad: {product.quantity} | SKU: {product.sku}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant="contained" onClick={handleModalClose}>Cerrar Detalles</Button>
            </CardContent>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
};

export default MyOrdersDesktop;
