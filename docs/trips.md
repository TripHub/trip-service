---
description: >-
  A Trip represents a single trip instance. It stores generic information such
  as the title, owners and members.
---

# Trips

{% api-method method="get" host="https://trip.api.triphub.io" path="/v1/trips" %}
{% api-method-summary %}
List Trips
{% endapi-method-summary %}

{% api-method-description %}
Get a list of all trips.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
List of user trips.
{% endapi-method-response-example-description %}

```
[
    {
        "id": 1,
        "pid": "6hh5VNewJtL",
        "title": "Spain",
        "description": null,
        "created_at": "2018-06-15T14:17:51.763Z",
        "updated_at": "2018-06-15T14:17:51.763Z"
    },
    {
        "id": 2,
        "pid": "dQCagyWmIvw",
        "title": "Camping",
        "description": "Two weeks of bliss 🏕",
        "created_at": "2018-06-15T14:18:08.984Z",
        "updated_at": "2018-06-15T14:18:08.984Z"
    }
]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://trip.api.triphub.io" path="/v1/trips/:id" %}
{% api-method-summary %}
Retrieve Trip
{% endapi-method-summary %}

{% api-method-description %}
Retrieve detailed information about a single trip. This endpoint returns the trips locations and members.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Trip ID.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
    "id" :1,
    "pid": "JVEjX7kfpNH",
    "title": "Spain",
    "description": null,
    "locations": [
        {
            "id": 1,
            "pid": "q4SJAryNZYq",
            "tripId": 1,
            "title": "Lisbon",
            "lat": 4.29582,
            "lng": 25.2889,
            "googlePlaceId": null,
            "arrive": null,
            "depart": null,
            "createdAt": "2018-06-15T13:52:45.774Z",
            "updatedAt": "2018-06-15T13:52:45.774Z"
        }
    ],
    "members": [
        {
            "trip_id": 1,
            "user_id": "facebook|1649842728363424",
            "role": "admin",
            "created_at": "2018-06-15T14:17:51.777Z",
            "updated_at": "2018-06-15T14:17:51.777Z"
        }
    ],
    "createdAt": "2018-06-14T09:29:33.085Z",
    "updatedAt": "2018-06-14T09:29:33.085Z"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://trip.api.triphub.io" path="/v1/trips" %}
{% api-method-summary %}
Create Trip
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="title" type="string" required=true %}
Title of the trip.
{% endapi-method-parameter %}

{% api-method-parameter name="description" type="string" required=false %}
Description of the trip.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Details of the successfully created trip.
{% endapi-method-response-example-description %}

```
{
    "title": "Camping",
    "members":
        {
            "user_id": "facebook|1649842728363424",
            "trip_id": 2,
            "role": "admin",
            "created_at": "2018-06-15T14:18:08.990Z",
            "updated_at": "2018-06-15T14:18:08.990Z"
        },
    "pid": "dQCagyWmIvw",
    "created_at": "2018-06-15T14:18:08.984Z",
    "updated_at": "2018-06-15T14:18:08.984Z",
    "id": 2,
    "description": "Two weeks of bliss 🏕"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}
Missing parameters.
{% endapi-method-response-example-description %}

```
{
    "type": "Validation error",
    "message": "title: is a required property"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="patch" host="https://trip.api.triphub.io" path="/v1/trips/:id" %}
{% api-method-summary %}
Update Trip
{% endapi-method-summary %}

{% api-method-description %}
Updates a trip. Note: if you want to add or remove members or locations you should use the member and location endpoints.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Trip ID.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="delete" host="https://trip.api.triphub.io" path="/v1/trips/:id" %}
{% api-method-summary %}
Delete Trip
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Trip ID.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}
