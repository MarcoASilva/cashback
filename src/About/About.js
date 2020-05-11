import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import logo from '../logo.svg';

import './About.css';
import profile from './profile.jpeg';


function About() {

	return <Container id="content">

		<p>
			Developed By:
		</p>

		<Card style={{ width: '18rem', color: '#212529' }}>
			<Card.Img src={logo} className="App-logo" alt="logo" />
			<Card.Body>
				<Card.Title>Marco Silva</Card.Title>
				<Card.Text>
					Arquiteto de Soluções Cloud
					marco.aurelio_silva@hotmail.com
    	</Card.Text>
				<Button href="https://www.linkedin.com/in/marco-aurelio-silva/" target="_blank" variant="primary">Profile</Button>
			</Card.Body>
		</Card>

	</Container>

}

export default About