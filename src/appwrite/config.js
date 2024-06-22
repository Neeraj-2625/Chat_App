import {Account, Client, Databases} from 'appwrite'
import conf from './variable';


const client = new Client();


client.setEndpoint(conf.appwrite_url).setProject(conf.projectId);

export const account = new Account(client);

export const database = new Databases(client);

export default client; 