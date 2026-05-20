import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './myToast';

export default class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
  }

  initialState = {
    id: '',
    marque: '',
    modele: '',
    couleur: '',
    immatricule: '',
    annee: '',
    prix: ''
  };

  componentDidMount() {
    const voitureId = this.props.match.params.id;
    if (voitureId) {
      this.findVoitureById(voitureId);
    }
  }

  findVoitureById = (voitureId) => {
    axios
      .get('/api/voitures/' + voitureId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: voitureId,
            marque: response.data.marque,
            modele: response.data.modele,
            couleur: response.data.couleur,
            immatricule: response.data.immatricule,
            annee: response.data.annee,
            prix: response.data.prix
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching voiture:', error);
      });
  };

  resetVoiture = () => {
    this.setState(() => this.initialState);
  };

  submitVoiture(event) {
    event.preventDefault();

    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: this.state.annee,
      prix: this.state.prix
    };

    if (this.state.id) {
      // Update existing voiture
      axios
        .put('/api/voitures/' + this.state.id, voiture)
        .then((response) => {
          if (response.data != null) {
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
          } else {
            this.setState({ show: false });
          }
        });
    } else {
      // Create new voiture
      axios
        .post('/api/voitures', voiture)
        .then((response) => {
          if (response.data != null) {
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
            this.resetVoiture();
          } else {
            this.setState({ show: false });
          }
        });
    }
  }

  voitureChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { marque, modele, couleur, immatricule, annee, prix } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast
            children={{
              show: this.state.show,
              message: this.state.id
                ? 'Voiture modifiée avec succès.'
                : 'Voiture ajoutée avec succès.',
              type: 'success'
            }}
          />
        </div>
        <Card className={'border border-dark bg-dark text-white'}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{' '}
            {this.state.id ? 'Modifier Voiture' : 'Ajouter Voiture'}
          </Card.Header>
          <Form
            onSubmit={this.submitVoiture}
            onReset={this.resetVoiture}
            id="VoitureFormId"
          >
            <Card.Body>
              <Row>
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="marque"
                    value={marque}
                    onChange={this.voitureChange}
                    className={'bg-dark text-white'}
                    placeholder="Entrez Marque Voiture"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modele</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="modele"
                    value={modele}
                    onChange={this.voitureChange}
                    className={'bg-dark text-white'}
                    placeholder="Entrez Modele Voiture"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="couleur"
                    value={couleur}
                    onChange={this.voitureChange}
                    className={'bg-dark text-white'}
                    placeholder="Entrez Couleur Voiture"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridImmatricule">
                  <Form.Label>Immatricule</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="immatricule"
                    value={immatricule}
                    onChange={this.voitureChange}
                    className={'bg-dark text-white'}
                    placeholder="Entrez Immatricule Voiture"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label>Annee</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="number"
                    name="annee"
                    value={annee}
                    onChange={this.voitureChange}
                    className={'bg-dark text-white'}
                    placeholder="Entrez Annee Voiture"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="number"
                    name="prix"
                    value={prix}
                    onChange={this.voitureChange}
                    className={'bg-dark text-white'}
                    placeholder="Entrez Prix Voiture"
                  />
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'right' }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{' '}
                {this.state.id ? 'Modifier' : 'Submit'}
              </Button>{' '}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{' '}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={() => this.props.history.push('/list')}
              >
                <FontAwesomeIcon icon={faList} /> Liste des Voitures
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
