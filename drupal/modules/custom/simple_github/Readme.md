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
| GET  | None  | {"client_id": "XXXX"} | Returns the GitHub App Client ID.  |

### Account

REST service to link and retrieve accounts information.

**Path:** /account

| Method  | Parameters | Response | Description |
| ------------- | ------------- | ------------- | ------------- |
| GET  | None  | [{ "id": 1, "fullname": "Alejandro Gómez Morón", "username": "agomezmoron", "email": "amoron@emergya.com", "photoUrl": "http://lorempixel.com/200/200/", "repoNumber": 10, "organization": "Emergya", "location": "Sevilla" }] | It returns all the associated accounts  |
| POST  | { "code": "ABCD", "nonce": "EDFG" } | { "id": 3, "fullname": "Alejandro Gómez Morón", "username": "agomezmoron", "email": "amoron@emergya.com", "photoUrl": "http://lorempixel.com/200/200/", "repoNumber": 10, "organization": "Emergya", "location": "Sevilla" } | It connects to GitHub and returns the linked account information.  | 
| DELETE  | None  | {"client_id": "XXXX"} | Returns the GitHub App Client ID.  |

### Pull Requests

**Path:** /pull_request

| Method  | Parameters | Response | Description |
| ------------- | ------------- | ------------- | ------------- |
| GET  | None  | {"client_id": "XXXX"} | Returns the GitHub App Client ID.  |