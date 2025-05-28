import type {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class SswCredentialsApi implements ICredentialType {
	name = 'sswWhatsAppApi';
	documentationUrl = 'https://github.com/super-simple-whats/n8n-nodes-ssw';
    displayName = 'SSW WhatsApp API';
    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            required: true,
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '={{$credentials.apiKey}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://app.supersimplewhats.com',
            url: '/v1/devices/list', // Adjust this to an actual test endpoint
            method: 'GET',
        },
    };
}