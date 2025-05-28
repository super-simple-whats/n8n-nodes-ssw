import type {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class SswWhatsappApi implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'SSW WhatsApp API',
        name: 'sswWhatsappApi',
        icon: 'file:ico.svg', // References the SVG in the same directory
        group: ['transform'],
        version: 1,
        description: 'Send messages via WhatsApp SaaS API',
        defaults: {
            name: 'SSW WhatsApp API',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'sswWhatsAppApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Device Name',
                name: 'deviceName',
                type: 'string',
                default: '',
                placeholder: 'my-device',
                required: true,
                description: 'The device name configured in your WhatsApp API',
            },
            {
                displayName: 'Phone Number',
                name: 'phoneNumber',
                type: 'string',
                default: '',
                placeholder: '+5511999999999',
                required: true,
            },
            {
                displayName: 'Message',
                name: 'message',
                type: 'string',
                default: '',
                required: true,
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
            const message = this.getNodeParameter('message', i) as string;
            const deviceName = this.getNodeParameter('deviceName', i) as string;

            const response = await this.helpers.httpRequestWithAuthentication.call(
                this,
                'sswWhatsAppApi',
                {
                    method: 'POST',
                    url: `https://app.supersimplewhats.com/v1/messages/send/${deviceName}/${phoneNumber}`,
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: message,
                }
            );

            returnData.push({ json: response });
        }

        return [returnData];
    }
}