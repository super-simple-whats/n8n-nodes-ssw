# AI Agent SSW WhatsApp Workflow

This n8n workflow demonstrates how to create an AI-powered WhatsApp chatbot using the SSW WhatsApp nodes and LangChain AI Agent. The bot can receive WhatsApp messages, process them through an AI agent, and send intelligent responses back.

## Features

- **WhatsApp Integration**: Receive and send WhatsApp messages
- **AI Agent**: Powered by OpenAI's GPT-4o-mini model
- **Memory**: Maintains conversation context with Simple Memory
- **Real-time Processing**: Automatic message handling and responses

## Requirements

### System Requirements
- Node.js 18.x or higher
- npm or yarn package manager
- Git (for installation)

### Accounts & Credentials
- **OpenAI Account**: For AI language model access
- **SSW WhatsApp Account**: For WhatsApp API integration
    - Sign up at [Super Simple WhatsApp](https://supersimplewhats.com) and create a WhatsApp device
    - Obtain your API key from the SSW dashboard
    - Follow the steps to register a device

## Installation

### 1. Install n8n

Choose one of the following installation methods:

#### Option A: Global Installation (Recommended)
```bash
npm install n8n -g
```

#### Option B: Using npx (No installation required)
```bash
npx n8n
```

#### Option C: Docker
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 2. Install SSW WhatsApp Nodes

After n8n is installed, you need to install the SSW WhatsApp community nodes:

1. Open n8n interface (usually at `http://localhost:5678`)
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter: `n8n-nodes-ssw`
5. Click **Install**

Alternatively, if running n8n with npm, you can install via command line:
```bash
npm install n8n-nodes-ssw
```

## Setup Instructions

### 1. Configure Credentials

#### OpenAI Credentials
1. Go to **Credentials** in n8n
2. Click **Add Credential**
3. Select **OpenAI API**
4. Enter your OpenAI API key
5. Save as "OpenAi account"

#### SSW WhatsApp Credentials
1. Go to **Credentials** in n8n
2. Click **Add Credential**
3. Select **SSW WhatsApp API**
4. Enter your SSW WhatsApp API credentials
5. Save as "SSW WhatsApp account"

### 2. Import the Workflow

1. **Download the workflow file**: Save the `ai_agent.json` file to your computer
2. **Import in n8n**:
   - Open n8n interface
   - Click the **+** button to create a new workflow
   - Click the **⋯** (three dots) menu
   - Select **Import from file**
   - Choose the `ai_agent.json` file

### 3. Configure Workflow Parameters

#### SSW WhatsApp Trigger
- **Device Name**: Update `deviceName` parameter to match your WhatsApp device
- **Credentials**: Ensure "SSW WhatsApp account" credential is selected
- **Webhook URL**: You need to set up the receiving webhook URL in your SSW account to point to your n8n instance (e.g., `https://your-n8n-instance.com/webhook/ssw-whatsapp-trigger` or `http://ngrok-url/webhook/ssw-whatsapp-trigger` if using [ngrok](https://ngrok.com/))

#### SSW WhatsApp API (Response Node)
- **Device Name**: Should automatically reference the trigger device
- **Phone Number**: Automatically uses conversation ID from trigger
- **Message**: Uses AI Agent output

#### OpenAI Chat Model
- **Model**: Currently set to `gpt-4o-mini` (can be changed)
- **Credentials**: Ensure "OpenAi account" credential is selected

## Usage

### 1. Activate the Workflow
1. Open the imported workflow
2. Click **Save** to save any configuration changes
3. Toggle the workflow status to **Active**

### 2. Test the Integration
1. Send a WhatsApp message to your configured device
2. The workflow will:
   - Receive the message via SSW WhatsApp Trigger
   - Process it through the AI Agent
   - Generate a response using OpenAI
   - Send the response back via SSW WhatsApp API

### 3. Monitor Executions
- Go to **Executions** tab to view workflow runs
- Check for any errors or successful completions
- View input/output data for debugging

## Workflow Components

### Nodes Overview

1. **SSW WhatsApp Trigger**: Listens for incoming WhatsApp messages
2. **AI Agent**: Processes messages using LangChain agent framework
3. **OpenAI Chat Model**: Provides the language model for AI responses
4. **Simple Memory**: Maintains conversation context across messages
5. **SSW WhatsApp API**: Sends responses back to WhatsApp

### Data Flow
