import React, { Component } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class AiChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: '',
      messages: [],
      loading: false
    };
    this.messagesEndRef = React.createRef();
  }

  componentDidMount() {
    // Welcome message from the AI assistant
    this.setState({
      messages: [
        {
          role: 'assistant',
          content:
            "Bonjour ! 🚗 Je suis l'Assistant IA du Magasin des Voitures. Posez-moi vos questions sur les voitures : recommandations, comparaisons, entretien, et plus encore !"
        }
      ]
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEndRef.current) {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { prompt } = this.state;
    if (!prompt.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: prompt };
    this.setState(
      (prevState) => ({
        messages: [...prevState.messages, userMessage],
        prompt: '',
        loading: true
      }),
      () => {
        // Call AI endpoint
        axios
          .post('/api/ai/chat', { prompt })
          .then((response) => {
            const aiMessage = {
              role: 'assistant',
              content: response.data.response
            };
            this.setState((prevState) => ({
              messages: [...prevState.messages, aiMessage],
              loading: false
            }));
          })
          .catch((error) => {
            console.error('AI Chat Error:', error);
            const errorMessage = {
              role: 'assistant',
              content:
                "Désolé, une erreur s'est produite. Vérifiez que le service Ollama est démarré et réessayez."
            };
            this.setState((prevState) => ({
              messages: [...prevState.messages, errorMessage],
              loading: false
            }));
          });
      }
    );
  };

  clearChat = () => {
    this.setState({
      messages: [
        {
          role: 'assistant',
          content:
            "Conversation effacée ! 🚗 Comment puis-je vous aider avec les voitures ?"
        }
      ],
      prompt: ''
    });
  };

  render() {
    const { prompt, messages, loading } = this.state;

    const chatContainerStyle = {
      height: '55vh',
      overflowY: 'auto',
      padding: '15px',
      backgroundColor: '#1a1a2e',
      borderRadius: '8px',
      marginBottom: '10px'
    };

    const userBubbleStyle = {
      backgroundColor: '#0f3460',
      color: '#e0e0e0',
      padding: '10px 15px',
      borderRadius: '18px 18px 4px 18px',
      maxWidth: '75%',
      marginLeft: 'auto',
      marginBottom: '12px',
      wordWrap: 'break-word',
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
    };

    const assistantBubbleStyle = {
      backgroundColor: '#16213e',
      color: '#e0e0e0',
      padding: '10px 15px',
      borderRadius: '18px 18px 18px 4px',
      maxWidth: '75%',
      marginRight: 'auto',
      marginBottom: '12px',
      wordWrap: 'break-word',
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      border: '1px solid #0f3460'
    };

    const labelStyle = {
      fontSize: '0.75rem',
      color: '#888',
      marginBottom: '3px'
    };

    return (
      <div>
        <Card className={'border border-dark bg-dark text-white'}>
          <Card.Header
            className="d-flex justify-content-between align-items-center"
            style={{ backgroundColor: '#0f3460' }}
          >
            <div>
              <FontAwesomeIcon icon={faRobot} />{' '}
              <strong>Assistant IA — Expert Automobile</strong>
            </div>
            <Button
              size="sm"
              variant="outline-light"
              onClick={this.clearChat}
              title="Effacer la conversation"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Card.Header>
          <Card.Body>
            <div style={chatContainerStyle}>
              {messages.map((msg, index) => (
                <div key={index}>
                  <div
                    style={
                      msg.role === 'user'
                        ? { textAlign: 'right', ...labelStyle }
                        : { textAlign: 'left', ...labelStyle }
                    }
                  >
                    <FontAwesomeIcon
                      icon={msg.role === 'user' ? faUser : faRobot}
                    />{' '}
                    {msg.role === 'user' ? 'Vous' : 'Assistant IA'}
                  </div>
                  <div
                    className="d-flex"
                    style={{
                      justifyContent:
                        msg.role === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      style={
                        msg.role === 'user'
                          ? userBubbleStyle
                          : assistantBubbleStyle
                      }
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="d-flex align-items-center" style={{ color: '#888' }}>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  L'assistant réfléchit...
                </div>
              )}
              <div ref={this.messagesEndRef} />
            </div>
            <Form onSubmit={this.handleSubmit}>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Posez votre question sur les voitures..."
                  value={prompt}
                  onChange={(e) => this.setState({ prompt: e.target.value })}
                  className="bg-dark text-white border-secondary"
                  disabled={loading}
                  autoComplete="off"
                />
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  style={{ backgroundColor: '#0f3460', border: 'none' }}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
