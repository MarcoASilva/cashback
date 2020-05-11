import React, { useState } from 'react';
import logo from '../Common/logo.png';
import './Orders.css';
import { Table, Container, Button } from 'react-bootstrap';
import { useFetch } from '../Hooks/Hooks';

function Orders() {

  const [orders, loading] = useFetch(
    process.env.REACT_APP_ORDERS_URL
  );

  console.log(process.env.REACT_APP_ORDERS_URL);

  const rows = orders.map(order =>
    <tr key="{order.id}">
      <td>{order.code}</td>
      <td>{order.price}</td>
      <td>{order.date}</td>
      <td>{order.cashbackPercentage}</td>
      <td>{order.cashbackAbsolute.toFixed(2)}</td>
      <td>{order.statusText}</td>
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
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  </Container>

}

export default Orders