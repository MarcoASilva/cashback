import React from 'react';
import logo from '../Common/logo.png';
import { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'

import New from '../New/New';
import './Orders.css';

function Orders(props) {

  const loading = false;

  const additionalOrders = props.additionalOrders || [];

  const initialOrders = additionalOrders;

  const [orders, setOrders] = useState(initialOrders);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    if (editingOrder) {
      document.querySelector('#new-btn').click();
    }
  }, [orders, editingOrder])

  const editOrder = (order) => {
    setEditingOrder(order);
    document.querySelector('#new-btn').click();
  }

  const removeOrder = (order) => {

    try {
      let additionalOrders = JSON.parse(localStorage.getItem('additionalOrders'));
      if (Array.isArray(additionalOrders)) {
        additionalOrders = additionalOrders.filter(_order => _order.code !== order.code);
        localStorage.setItem('additionalOrders', JSON.stringify(additionalOrders));
        let updatedOrders = orders.filter(_order => _order.code !== order.code);
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.info(error);
      // it's not an additional order
    }

  }

  useEffect(() => {
    async function getOrders() {
      const response = await fetch(process.env.REACT_APP_ORDERS_URL);
      let orders = await response.json();
      orders = orders.concat(initialOrders)
      setOrders(orders);
    }
    getOrders();
  }, [initialOrders, editingOrder]);

  const rows = orders.map(order =>
    <tr key={order.id}>
      <td>{order.code}</td>
      <td>{order.price}</td>
      <td>{order.date}</td>
      <td>{order.cashbackPercentage}</td>
      <td>{order.cashbackAbsolute.toFixed(2)}</td>
      <td>{order.statusText}</td>
      <td>
        <Button variant="primary" onClick={editOrder.bind(this, order)} style={{ display: order.status === 0 ? 'initial' : 'none' }}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        &emsp;
        <Button variant="danger" onClick={removeOrder.bind(this, order)} style={{ display: order.status === 0 ? 'initial' : 'none' }}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </td>
    </tr>
  );

  const Logo = loading ?
    <Container className="AnimatedLogo">
      <img src={logo} alt="logo" />
    </Container> :
    <Container className="Logo">
      <img src={logo} alt="logo" />
    </Container>

  return <Container className="OrdersContainer">

    {Logo}

    <Table responsive variant="dark" hover="true">
      <thead>
        <tr>
          <th>Código</th>
          <th>Valor</th>
          <th>Data</th>
          <th>Cashback (%)</th>
          <th>Cashback (R$)</th>
          <th>Status</th>
          <th className="text-muted">OPÇÕES</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
    <New order={editingOrder} />
  </Container>

}

export default Orders