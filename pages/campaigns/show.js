import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call(); //The result is an object even thought it seens like a array

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCard() {

        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const item = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create request to withdraw manager',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (Wei)',
                description: 'You must contribute at least this much wei to become an approver'
            },
            {
                header: requestCount,
                meta: 'Number of Request',
                description: 'A request tries to withdraw money from the contract. '
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who already donated money'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Balance of the Campaign in Ether',
                description: 'Balance is how much money this campaign has to spend'
            }
        ];

        return <Card.Group items={item}/>
    }
    
    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCard()}
                        </Grid.Column>
                        
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>
                                        View Requests
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;