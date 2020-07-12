import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
import campaing_address from './campaing_address';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    campaing_address[0]
)

export default instance;