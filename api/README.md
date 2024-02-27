# API Documentation

Welcome to the documentation for the [Your API Name] API. This documentation provides detailed information about available endpoints, query parameters, and expected responses.

## Introduction

[A brief description of your API and its purpose.]

## Accessing the API

The API is accessible at the following URL: [Your url]

## Endpoints

### Convert a Value

Endpoint: `GET /`

This endpoint allows you to convert a value from one unit to another.

#### Query Parameters

- `to`: (Required) The target unit for the conversion.
- `from`: (Required) The source unit for the conversion.
- `value`: (Required) The value to convert.

#### Example Request

GET /?to=USD&from=EUR&value=100

#### Expected Response

The response is a decimal number representing the converted value.

### Get Exchange Rate

Endpoint: `GET /rate`

This endpoint allows you to retrieve the current exchange rate.

#### Example Request
