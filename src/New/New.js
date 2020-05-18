import React, { useState } from 'react';
import Popup from "reactjs-popup";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './New.css';

const New = (props) => {

	const defaultForm = { code: '', price: '', date: '' };

	const initialState = { open: false, formData: props.order || defaultForm };

	const [state, setState] = useState(initialState);

	const openModal = () => {
		console.log(props.order);
		setState({ open: true, formData: props.order || defaultForm });
	}

	const closeModal = () => {
		document.getElementById("NewOrderForm").reset();
		setState({ open: false, formData: {} });
	}

	const save = (event) => {

		try {
			var savedAdditionalOrders = JSON.parse(localStorage.getItem('additionalOrders'));
		} catch (error) {
			return localStorage.setItem('additionalOrders', JSON.stringify([state.formData]));
		}

		if (state.formData.id) {
			if (Array.isArray(savedAdditionalOrders)) {
				(savedAdditionalOrders = savedAdditionalOrders.filter(order => order.id !== state.formData.id)).push(state.formData);
				localStorage.setItem('additionalOrders', JSON.stringify(savedAdditionalOrders));
			} else {
				localStorage.setItem('additionalOrders', JSON.stringify([state.formData]));
			}
			return;
		}

		const cashbackPercentage = Math.ceil(Math.random() * 20);

		const newOrder = { ...state.formData, id: Math.ceil(Math.random() * 10000), cashbackPercentage: cashbackPercentage, cashbackAbsolute: (state.formData.price * cashbackPercentage / 100), status: 0, statusText: "Em Análise" };

		if (Array.isArray(savedAdditionalOrders)) {
			savedAdditionalOrders.push(newOrder);
			localStorage.setItem('additionalOrders', JSON.stringify(savedAdditionalOrders));
		} else {
			localStorage.setItem('additionalOrders', JSON.stringify([newOrder]));
		}
	}

	const handleChange = (event) => {
		const { id, code, price, date, cashbackAbsolute, cashbackPercentage, status, statusTex } = state.formData;
		const updatedFormData = Object.assign({ id, code, price, date, cashbackAbsolute, cashbackPercentage, status, statusTex }, { [event.target.id]: event.target.value });
		setState({ open: true, formData: updatedFormData });
	}

	return <div>

		<Button id="new-btn" variant="success" onClick={openModal}>
			<FontAwesomeIcon icon={faPlus} />
			&nbsp;
			Nova Compra
		</Button>
		<Popup
			open={state.open}
			closeOnDocumentClick
			onClose={closeModal}
		>
			<div>
				<Container>
					<h3>Cadastro de Compra</h3>
					<p>Preencha abaixo os dados da sua compra:</p>
				</Container>
				<Form id="NewOrderForm" onSubmit={save} action="/orders">
					<Row>
						<Col>
							<Form.Group controlId="code">
								<Form.Control required type="number" placeholder="Código" value={state.formData.code} onChange={handleChange} />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="price">
								<Form.Control required type="number" step="0.01" min="1" placeholder="Valor" value={state.formData.price} onChange={handleChange} />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="date">
								<Form.Control required type="date" placeholder="Data" value={state.formData.date} onChange={handleChange} />
							</Form.Group>
						</Col>
					</Row>
					<hr></hr>
					{
						state.formData.id ?
							(
								<Button variant="success" type="submit">
									Salvar
							</Button>
							) :
							(
								<Button variant="success" type="submit">
									Confirmar
							</Button>
							)
					}
				</Form>
			</div>
		</Popup>
	</div>
}

export default New