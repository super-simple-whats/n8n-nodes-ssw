import type {
    INodeType,
    INodeTypeDescription,
    IWebhookFunctions,
    IWebhookResponseData,
    ILoadOptionsFunctions,
    INodePropertyOptions,
} from 'n8n-workflow';

import { NodeConnectionType } from 'n8n-workflow';

export class SswTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'SSW WhatsApp Trigger',
        name: 'sswWhatsappTrigger',
        group: ['trigger'],
        version: 1,
        description: 'Listens for webhooks from SSW API',
        defaults: {
            name: 'SSW WhatsApp Trigger',
        },
        inputs: [],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'sswWhatsAppApi',
                required: true,
            },
        ],
        webhooks: [
            {
                name: 'default',
                httpMethod: 'POST',
                responseMode: 'onReceived',
                path: '={{$parameter["webhookName"]}}',
                isFullPath: true,
            },
        ],
        properties: [
            {
                displayName: 'Webhook Name',
                name: 'webhookName',
                type: 'string',
                default: 'ssw-hooks',
                placeholder: 'ssw-hooks',
                required: true,
                description: 'Unique name for this webhook (must be unique across your n8n instance)',
            },
            {
                displayName: 'Device Name',
                name: 'deviceName',
                type: 'options',
                default: '',
                required: true,
                description: 'The device to filter webhooks for',
                typeOptions: {
                    loadOptionsMethod: 'getDevices',
                },
            },
            {
                displayName: 'Event Types',
                name: 'eventTypes',
                type: 'multiOptions',
                options: [
                    {
                        name: 'Message Received',
                        value: 'message_received',
                    }
                ],
                default: ['message_received'],
                description: 'Which events to listen for',
            },
        ],
        icon: 'file:ico.svg',
    };

    methods = {
        loadOptions: {
            async getDevices(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const credentials = await this.getCredentials('sswWhatsAppApi');
                this.logger.info(`Loading devices from SSW API with credentials: ${JSON.stringify(credentials)}`);

                try {
                    const response = await this.helpers.request({
                        method: 'GET',
                        url: `https://app.supersimplewhats.com/v1/devices/list`,
                        headers: {
                            'Authorization': `Bearer ${credentials.apiKey}`,
                            'Content-Type': 'application/json',
                        },
                        json: true,
                    });

                    // If response has a data property containing the devices
                    if (response.data && Array.isArray(response.data)) {
                        let output = response.data.map((device: any) => ({
                            name: device.name || device.device_name || device.id,
                            value: device.name || device.device_name || device.id,
                        }));
                        this.logger.info(`Loaded ${output.length} devices from SSW API: ${JSON.stringify(output)}`);
                        return output;
                    }

                    return [];
                } catch (error) {
                    this.logger.error('Failed to load devices:', error);
                    return [];
                }
            },
        },
    };

    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const bodyData = this.getBodyData();
        const deviceName = this.getNodeParameter('deviceName') as string;
        const eventTypes = this.getNodeParameter('eventTypes') as string[];

        // Parse the body data properly
        let parsedData;
        try {
            if (typeof bodyData === 'string') {
                parsedData = JSON.parse(bodyData);
            } else if (bodyData && typeof bodyData === 'object') {
                const keys = Object.keys(bodyData);
                if (keys.length === 1 && bodyData[keys[0]] === "") {
                    parsedData = JSON.parse(keys[0]);
                } else {
                    parsedData = bodyData;
                }
            } else {
                parsedData = bodyData;
            }
        } catch (error) {
            this.logger.error('Failed to parse webhook body:', error);
            parsedData = bodyData; // Use raw data as fallback
        }

        if (eventTypes.length > 0 && !eventTypes.includes(parsedData.event_name)) {
            this.logger.info(`Event type ${parsedData.event_name} not in specified event types, ignoring webhook`);
            return {
                noWebhookResponse: true,
            };
        }

        if (parsedData.device_name !== deviceName) {
            this.logger.info(`Device name ${parsedData.device_name} does not match specified device name ${deviceName}, ignoring webhook`);
            return {
                noWebhookResponse: true,
            };
        }

        if (parsedData.data.from_me) {
            this.logger.info('Ignoring webhook because it is from the user themselves');
            return {
                noWebhookResponse: true,
            };
        }

        parsedData.chatInput = parsedData.data.message;
        parsedData.sessionId = parsedData.data.conversation_id;

        return {
            workflowData: [
                [
                    {
                        json: parsedData,
                    },
                ],
            ],
        };
    }
}