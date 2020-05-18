import React, { useState } from 'react';
import Popup from "reactjs-popup";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './New.css';

const New = (props) => {

	const initialState = { open: props.open || false }
	// let initialFormData = props.order || {};

	const [state, setState] = useState(initialState);
	// const [formData, setFormData] = useState(initialFormData);

	let formData = props.order || { };

	const openModal = () => {
		setState({ open: true });
	}

	const closeModal = () => {
		// setFormData({});
		document.getElementById("NewOrderForm").reset();
		setState({ open: false });
	}

	const save = (event) => {

		event.preventDefault();

		if (formData.id) {

			try {
				var additionalOrders = JSON.parse(localStorage.getItem('additionalOrders'));
			} catch (error) {
				localStorage.setItem('additionalOrders', JSON.stringify([formData]));
			}
			if (Array.isArray(additionalOrders)) {
				(additionalOrders = additionalOrders.filter(order => order.id !== formData.id)).push(formData);
				localStorage.setItem('additionalOrders', JSON.stringify(additionalOrders));
			} else {
				localStorage.setItem('additionalOrders', JSON.stringify([formData]));
			}

			return;

		}

		const cashbackPercentage = Math.ceil(Math.random() * 20);

		const newOrder = { ...formData, id: Math.ceil(Math.random() * 10000), cashbackPercentage: cashbackPercentage, cashbackAbsolute: (formData.price * cashbackPercentage / 100), status: 0, statusText: "Em Análise" };

		try {
			var additionalOrders = JSON.parse(localStorage.getItem('additionalOrders'));
		} catch (error) {
			localStorage.setItem('additionalOrders', JSON.stringify([newOrder]));
		}
		if (Array.isArray(additionalOrders)) {
			additionalOrders.push(newOrder);
			localStorage.setItem('additionalOrders', JSON.stringify(additionalOrders));
		} else {
			localStorage.setItem('additionalOrders', JSON.stringify([newOrder]));
		}
	}

	const handleChange = (event) => {
		// const updatedFormData = {...formData};
		formData[event.target.id] = event.target.value;
		// setFormData(updatedFormData);
		setState({ open: true });
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
								<Form.Control required type="number" placeholder="Código" value={formData.code} onChange={handleChange} />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="price">
								<Form.Control required type="number" placeholder="0.00" step="0.01" min="1" placeholder="Valor" value={formData.price} onChange={handleChange} />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="date">
								<Form.Control required type="date" placeholder="Data" value={formData.date} onChange={handleChange} />
							</Form.Group>
						</Col>
					</Row>
					<hr></hr>
					{
						formData.id ?
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