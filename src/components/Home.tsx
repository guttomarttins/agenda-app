import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
    contatos: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { contatos: [] }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:4000/contatos`).then(data => {
            this.setState({ contatos: data.data })
        })
    }

    public deletecontato(id: number) {
        axios.delete(`http://localhost:4000/contatos/${id}`).then(data => {
            const index = this.state.contatos.findIndex(contato => contato.id === id);
            this.state.contatos.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const contatos = this.state.contatos;
        return (
            <div>
                {contatos.length === 0 && (
                    <div className="text-center">
                        <h2>Nenhum contato disponível... Que tal aproveitar e cadastrar um contato!?</h2>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Endereço</th> 
                                    <th scope="col">Ações</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {contatos && contatos.map(contato =>
                                    <tr key={contato.id}>
                                        <td>{contato.nome}</td>
                                        <td>{contato.telefone}</td>
                                        <td>{contato.email}</td>
                                        <td>{contato.endereco}</td> 
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${contato.id}`} className="btn btn-sm btn-primary">Atualizar </Link>
                                                    <button className="btn btn-sm btn-danger" 
                                                            onClick={() => this.deletecontato(contato.id)}>Excluir</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}