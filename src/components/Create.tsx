import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IValues {
    nome: string,
    telefone: string,
    email: string,
    endereco: string
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            nome: '',
            telefone: '',
            email: '',
            endereco: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });

        const formData = {
            nome: this.state.nome,
            telefone: this.state.telefone,
            email: this.state.email,
            endereco: this.state.endereco
        }

        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        axios.post(`http://localhost:4000/contatos`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Cadastrar Contato </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Preencha os campos para cadastrar
                        </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Cadastro realizado com sucesso!!!
                            </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        
                        <div className="form-group row">
                            <label htmlFor="nome" className="col-sm-2 col-form-label">Nome</label>
                            <div className="col-sm-10">
                              <input type="text" id="nome" onChange={(e) => this.handleInputChanges(e)} required
                                   name="nome" className="form-control" placeholder="Informe o nome do contato" />
                            </div>
                        </div> 

                        <div className="form-group row">
                            <label htmlFor="telefone" className="col-sm-2 col-form-label"> Telefone </label>
                            <div className="col-sm-10">
                                   <input type="text" id="telefone" onChange={(e) => this.handleInputChanges(e)} 
                                   name="telefone" className="form-control" placeholder="Informe o telefone do contato" />
                             </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label"> E-mail </label>
                            <div className="col-sm-10">
                                  <input type="text" id="email" onChange={(e) => this.handleInputChanges(e)} 
                                   name="email" className="form-control" placeholder="Informe o e-mail do contato" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="endereco" className="col-sm-2 col-form-label"> Endereço </label>
                            <div className="col-sm-10">
                                <input type="text" id="endereco" onChange={(e) => this.handleInputChanges(e)} 
                                    name="endereco" className="form-control" placeholder="Informa o endereço do contato" />
                            </div> 
                        </div>

                        <div className="form-group float-right">
                            <button className="btn btn-success" type="submit">
                                Salvar
                            </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)