---
description: >-
  Search for and get details for places. Currently uses Google Places API
  internally.
---

# Places

{% api-method method="get" host="https://trip.api.triphub.io" path="/v1/places/search?query=London" %}
{% api-method-summary %}
Search Places
{% endapi-method-summary %}

{% api-method-description %}
Returns a list of places that match a text search.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-query-parameters %}
{% api-method-parameter name="query" type="string" required=true %}
Search string.
{% endapi-method-parameter %}

{% api-method-parameter name="fields" type="string" %}
Fields to return for each location. Can be any from `formatted_address`, `geometry`, `icon`, `id`, `name`, `permanently_closed`, `photos`, `place_id`, `scope`, `types`. If specifying multiple, separate with a comma. Default is `formatted_addr`
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
    "candidates": [
        {
            "formatted_address": "Girona, Spain"
        }
    ],
    "status": "OK"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
    "status": "INVALID_REQUEST"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



