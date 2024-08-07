import React from "react";
import { Table, Button, Form, Modal, InputGroup } from "react-bootstrap";
import { RiDeleteBin6Line, RiImageAddLine } from "react-icons/ri";
import { FiEdit, FiUserPlus, FiMail } from "react-icons/fi";
import { MdOutlineImageNotSupported, MdFormatListBulleted, MdDriveFileRenameOutline } from "react-icons/md";
import { FaUser, FaEnvelope } from "react-icons/fa";
import './Alunos.css';



class Alunos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nome: '',
            email: '',
            alunos: [],
            img: null,
            modalAberta: false
        };
    }

    componentDidMount() {
        this.buscarAluno();
    }

    buscarAluno = () => {
        fetch('http://localhost:8080/school-1.0.0/api/alunos')
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ alunos: dados });
            });
    }

    deletarAluno = (id) => {
        fetch('http://localhost:8080/school-1.0.0/api/deleteAlunos?id=' + id, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAluno();
                }
            });
    }

    carregarDados = (id) => {
console.log ('nd')
        fetch('http://localhost:8080/school-1.0.0/api/findById?id=' + id, { method: 'GET' })
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({
                    id: dados.id,
                    nome: dados.nome,
                    email: dados.email,
                    img: dados.img,
                });
                this.abrirModal();

            })

    }

    cadastroAluno = (aluno) => {
        fetch('http://localhost:8080/school-1.0.0/api/insertAlunos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAluno();
                    this.setState({ nome: '', email: '', img:''});
                } else {
                    alert('Não foi possível adicionar o aluno!');
                }
            });
    }

    atualizarAluno = (aluno) => {         
        fetch('http://localhost:8080/school-1.0.0/api/updateAlunos', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarAluno();
                } else {
                    alert('Não foi possível atualizar os dados o aluno!');
                }
            });
    }

    atualizaName = (e) => {
        this.setState({ nome: e.target.value });
    }

    atualizaEmail = (e) => {
        this.setState(
            {
                email: e.target.value
            }
        )
    }

    atualizaImagem = (e) => {
        this.setState({ img: e.target.value });
    };

    submit = () => {

        if (this.state.id === 0) {
            const aluno = {
                nome: this.state.nome,
                email: this.state.email,
                img: this.state.img,
            }

            this.cadastroAluno(aluno);
        } else {
            const aluno = {
                id: this.state.id,
                nome: this.state.nome,
                email: this.state.email,
                img : this.state.img,
            }
            this.atualizarAluno(aluno);
        }
        this.fecharModal();

    }

    resert = () => {
        this.setState(
            {
                id: 0,
                nome: "",
                email: "",
                img : ""
            }
        )
        this.abrirModal()
    }


    renderTabela() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th><MdDriveFileRenameOutline /> Nome</th>
                        <th><FiMail /> Email </th>
                        <th>< MdFormatListBulleted /> Opções </th>
                        <th><RiImageAddLine /> Imagem </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.alunos.map((aluno) => (
                        <tr key={aluno.id}>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>

                            <td>
                                <Button variant="secondary" onClick={() => this.carregarDados(aluno.id)}> <FiEdit /> Atualizar</Button>
                                <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>
                                    <RiDeleteBin6Line /> Excluir</Button>
                            </td>
                            <td>
                                {aluno.img ? (
                                    <img src={aluno.img} alt="Imagem do aluno" style={{ width: '100px', height: 'auto' }} />
                                ) : (
                                    <span> <MdOutlineImageNotSupported /> Sem Imagem</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };

    fecharModal = () => {
        this.setState(
            {
                modalAberta: false
            }
        )
    }

    abrirModal = () => {
        this.setState(
            {
                modalAberta: true
            }
        )
    }


    render() {
        return (
            <div>

                <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Dados dos Alunos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>

                        <Form.Group className="mb-3">
                    <Form.Label>Imagem</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>                        
                        {this.state.img ? (
                                    <img src={this.state.img} alt="Imagem do aluno" style={{ width: '100px', height: 'auto' }} />
                                ) : ( <span >Sem Imagem</span>

                                )} 
                        </InputGroup.Text>                        
                    </InputGroup>
                    <Form.Control
                            type="url"
                            accept="image/*"
                            onChange={this.atualizaImagem}
                        />
                </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Nome</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaUser className="icon" />
                                    </InputGroup.Text>
                                    <Form.Control type="text" placeholder="Digite o nome do aluno" value={this.state.nome} onChange={this.atualizaName} />
                                </InputGroup>
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaEnvelope className="icon" />
                                    </InputGroup.Text>
                                    <Form.Control type="email" placeholder="Digite o e-mail do aluno" value={this.state.email} onChange={this.atualizaEmail} />
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Utilize o melhor e-mail do aluno.
                                </Form.Text>

                                

                            </Form.Group>

                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.fecharModal}>
                            Fechar
                        </Button>
                        <Button variant="success" onClick={this.submit}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="primary" onClick={this.resert}>
                    <FiUserPlus /> Novo </Button>


                {this.renderTabela()}
            </div >
        );
    }
}

export default Alunos;
