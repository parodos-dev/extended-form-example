
# Custom Form Plugin Example

This repository demonstrates a Backstage plugin designed to customize and extend the workflow execution form. It provides a standalone Backstage instance for debugging and testing the plugin prior to integration with the orchestrator in a Red Hat Developer Hub deployment. The plugin’s customized features are showcased in conjunction with the [example workflow](https://github.com/parodos-dev/serverless-workflows-config/tree/main/charts/extendable-workflow). The input schema for this workflow includes custom UI properties that activate specific form enhancements. For instance, the property ["ui:widget": "CountryWidget"](https://github.com/parodos-dev/serverless-workflows-config/blob/main/charts/extendable-workflow/templates/02-configmap_01-extendable-workflow-resources-schemas.yaml#L24) directs the form to load the custom CountryWidget component provided by this plugin.
 

## Getting Started

### To Run the Plugin Locally:

#### 1. Install Dependencies:

```bash
yarn install
```

#### 2. Run the Application:

```bash
yarn dev
```

### To run the plugin on RHDH deployment

#### 1. Install the example workflow:

Follow [these instructions](https://github.com/parodos-dev/serverless-workflows-config/blob/main/docs/main/extendable-workflow/README.md#persistence-pre-requisites) to install the workflow.

> **Note:** when running the workflow without the plugin installed, the form will throw errors.

#### 2. Configure RHDH to load the plugin

Add the following entry to the [RHDH plugins ConfigMap](https://docs.redhat.com/fr/documentation/red_hat_developer_hub/1.3/html/installing_and_viewing_dynamic_plugins/proc-config-dynamic-plugins-rhdh-operator_title-plugins-rhdh-about):

```yaml

```

