# n8n-nodes-ssw

This is an n8n community node. It lets you use SSW WhatsApp API in your n8n workflows.

SSW (Super Simple WhatsApp) is a WhatsApp Business API service that allows you to send and receive WhatsApp messages programmatically through their REST API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Use the package name: `n8n-nodes-ssw`

## Operations

This package provides two nodes:

### SSW WhatsApp API Node
- **Send Message**: Send WhatsApp messages to a specific phone number or conversation_id using your configured device

### SSW WhatsApp Trigger Node
- **Message Received**: Listen for incoming WhatsApp messages via webhooks

## Credentials

To use this node, you need:

1. **SSW WhatsApp API Account**: Sign up at [Super Simple WhatsApp](https://supersimplewhats.com)
2. **API Key**: Obtain your API key from the SSW dashboard
3. **Device Setup**: Configure at least one WhatsApp device in your SSW account
4. **Webhook URL**: Set up a webhook URL in your SSW account to receive incoming messages

### Setting up credentials in n8n:
1. Go to **Credentials** in your n8n instance
2. Click **Add Credential** 
3. Search for "SSW WhatsApp API"
4. Enter your API key from the SSW dashboard
5. Test the connection to ensure it works

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Node API version**: 1
- **Tested with**: n8n v1.x

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [SSW WhatsApp API Documentation](https://supersimplewhats.com/)
* [GitHub Repository](https://github.com/super-simple-whats/n8n-nodes-ssw)