---
description: >-
  A location represents a specific geographic location, typically a city or a
  town.
---

# Locations



{% api-method method="get" host="https://trip.api.triphub.io" path="/v1/trips/:id/locations" %}
{% api-method-summary %}
List Trip's Locations
{% endapi-method-summary %}

{% api-method-description %}
Lists all locations associated with a specific trip.
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
[
    {
        "id": 1,
        "pid": "6ZxsFladM7i",
        "tripId": 1,
        "title": "London",
        "createdAt": "2018-06-04T15:34:35.264Z",
        "updatedAt": "2018-06-04T15:34:35.264Z"
    }
]
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Trip with given ID was not found.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://trip.api.triphub.io" path="/v1/locations/:id/next" %}
{% api-method-summary %}
Get Next Locations
{% endapi-method-summary %}

{% api-method-description %}
Get the list of next locations for a location.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Location ID to get next locations for.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
[
    {
        "location_id": 3,
        "next": 1
    },
    {
        "location_id": 3,
        "next": 2
    }
]
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Location does not exist.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://trip.api.triphub.io" path="/v1/trips/:id/locations" %}
{% api-method-summary %}
Create Location
{% endapi-method-summary %}

{% api-method-description %}
Create a new location on the specified trip.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Trip ID
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="lng" type="number" required=true %}
Longitude of the location
{% endapi-method-parameter %}

{% api-method-parameter name="lat" type="number" required=true %}
Latitude of the location
{% endapi-method-parameter %}

{% api-method-parameter name="title" type="string" required=true %}
Title of the location
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=204 %}
{% api-method-response-example-description %}
Next location added successfully.
{% endapi-method-response-example-description %}

```javascript

```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
One of the location IDs does not exist.
{% endapi-method-response-example-description %}

```javascript

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="patch" host="https://trip.api.triphub.io" path="/v1/locations/:target/next/:next" %}
{% api-method-summary %}
Add Next Location
{% endapi-method-summary %}

{% api-method-description %}
Adds a next location to the set of next locations. Making the same request multiple times is safe, the same `(:target, :next)` pair is only ever added once.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="target" type="string" required=true %}
ID of the target location.
{% endapi-method-parameter %}

{% api-method-parameter name="next" type="number" required=true %}
ID of the location to add to next.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=204 %}
{% api-method-response-example-description %}
Next location added successfully.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
One of the location IDs does not exist. 
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="delete" host="https://trip.api.triphub.io" path="/v1/locations/:target/next/:next" %}
{% api-method-summary %}
Remove Next Location
{% endapi-method-summary %}

{% api-method-description %}
Remove a location from the set of next locations.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="target" type="number" required=true %}
ID of the target location.
{% endapi-method-parameter %}

{% api-method-parameter name="next" type="number" required=true %}
ID of the location to remove from next.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=204 %}
{% api-method-response-example-description %}
Returns the updated set of next locations.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Either the target location or next location was not found.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

