import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyToast from './myToast';

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      show: false
    };
  }

  componentDidMount() {
    axios
      .get('/api/voitures')
      .then((response) => {
        let voitures = [];
        if (response.data._embedded) {
          voitures = response.data._embedded.voitures.map((v) => {
            // Extract ID from _links.self.href (Spring Data REST doesn't include id in body)
            const selfLink = v._links.self.href;
            const id = selfLink.substring(selfLink.lastIndexOf('/') + 1);
            return { ...v, id: parseInt(id) };
          });
        } else if (Array.isArray(response.data)) {
          voitures = response.data;
        }
        this.setState({ voitures });
      })
      .catch((error) => {
        console.error('Error fetching voitures:', error);
      });
  }

  deleteVoiture = (voitureId) => {
    axios
      .delete('/api/voitures/' + voitureId)
      .then(() => {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.setState({
          voitures: this.state.voitures.filter(
            (voiture) => voiture.id !== voitureId
          )
        });
      })
      .catch((error) => {
        console.error('Error deleting voiture:', error);
      });
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast
            children={{
              show: this.state.show,
              message: 'Voiture supprimée avec succès.',
              type: 'danger'
            }}
          />
        </div>
        <Card className={'border border-dark bg-dark text-white'}>
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> Liste des Voitures
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modele</th>
                  <th>Couleur</th>
                  <th>Immatricule</th>
                  <th>Annee</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.voitures.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">Aucune Voiture n'est disponible</td>
                  </tr>
                ) : (
                  this.state.voitures.map((voiture) => (
                    <tr key={voiture.id}>
                      <td>{voiture.marque}</td>
                      <td>{voiture.modele}</td>
                      <td>{voiture.couleur}</td>
                      <td>{voiture.immatricule}</td>
                      <td>{voiture.annee}</td>
                      <td>{voiture.prix}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={'edit/' + voiture.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{' '}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={this.deleteVoiture.bind(
                              this,
                              voiture.id
                            )}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
