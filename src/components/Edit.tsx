import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    contato: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Editcontato extends React.Component<RouteComponentProps<any>, IFormState> {
    
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            contato: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:4000/contatos/${this.state.id}`).then(data => {
            this.setState({ contato: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:4000/contatos/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.contato &&
                    <div>
                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Atualizar contato </h2>

                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        contato atualizado com sucesso </div>
                                )}

                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    
                                <div className="form-group row">
                                     <label htmlFor="nome" className="col-sm-2 col-form-label">Nome</label>
                                     <div className="col-sm-10"> 
                                        <input type="text" id="nome" defaultValue={this.state.contato.nome} 
                                               onChange={(e) => this.handleInputChanges(e)} name="nome" className="form-control" 
                                               placeholder="Informe o nome do contato" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="telefone" className="col-sm-2 col-form-label"> Telefone </label>
                                    <div className="col-sm-10"> 
                                        <input type="text" id="telefone" defaultValue={this.state.contato.telefone} 
                                               onChange={(e) => this.handleInputChanges(e)} name="telefone" className="form-control" 
                                               placeholder="Informe o telefone do contato" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="email" className="col-sm-2 col-form-label"> E-mail </label>
                                    <div className="col-sm-10"> 
                                        <input type="text" id="email" defaultValue={this.state.contato.email} 
                                               onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" 
                                               placeholder="Informe o email do contato" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="endereco" className="col-sm-2 col-form-label"> Endereço </label>
                                    <div className="col-sm-10"> 
                                        <input type="text" id="endereco" defaultValue={this.state.contato.endereco} 
                                               onChange={(e) => this.handleInputChanges(e)} name="endereco" className="form-control" 
                                               placeholder="Informe o endereço do contato" />
                                    </div>
                                </div>    

                                <div className="form-group float-right">
                                    <button className="btn btn-primary" type="submit">
                                        Atualizar </button>
                                    {loading &&
                                        <span className="fa fa-circle-o-notch fa-spin" />
                                    }
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(Editcontato)