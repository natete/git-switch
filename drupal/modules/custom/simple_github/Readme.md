# Simple GitHub Module

Module to work with the GitHub REST API from Drupal exposing a REST service to be used from another clients (Angular, Ionic, etc).

It also supports OAuth integrations.

## REST Services exposed

The REST API base PATH will be: **/simple_github_api**

### Connector

REST service to retrieve the configured connector to work with a GitHub App.

**Path:** /connector

| Method  | Parameters | Response | Description |
| ------------- | ------------- | ------------- | ------------- |
| GET  | None  | {client_id: "XXXX"} | Returns the GitHub App Client ID.  |

### Account

REST service to link and retrieve accounts information.

**Path:** /account

| Method  | Parameters | Description |
| ------------- | ------------- | ------------- |
| GET  | None  | Returns all the linked account.  |