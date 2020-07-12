import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import { Router } from '../../routes'; //Let us move programatically

class CampaignNew extends Component {
    state = {
        minimunContribution: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try{
            const accounts = await web3.eth.accounts[0];
            await factory.methods .createCampaign(this.state.minimunContribution).send({from: accounts});
            Router.pushRoute('/');
        }
        catch(err)
        {
            this.setState({errorMessage: err.message});
        }


        this.setState({loading: false});

    };
    
    render() {
        return (
            <Layout>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <h3>Create a Campaign</h3>
                    <Form.Field>
                        <label>Minimun Contribution </label>
                        <Input 
                            label="wei" 
                            labelPosition="right"
                            value={this.state.minimunContribution}
                            onChange={event => this.setState({minimunContribution: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Oops" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
            </Layout>
        
            );

    }
}

export default CampaignNew;