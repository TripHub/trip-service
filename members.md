---
description: >-
  A member is a specific user account associated with a trip. Only members can
  view a trip's details. Members have specific roles defining what permissions
  they have.
---

# Members

{% api-method method="get" host="https://trip.api.triphub.io" path="/v1/trips/:id/members" %}
{% api-method-summary %}
List Members
{% endapi-method-summary %}

{% api-method-description %}
List all members of a specific trip.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
ID of the trip
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Cake successfully retrieved.
{% endapi-method-response-example-description %}

```
[
    {
        "tripId": 1,
        "userId": "auth0|42678491",
        "role": "member",
        "createdAt": "2018-06-11T17:37:36.371Z",
        "updatedAt": "2018-06-11T17:37:36.371Z"
    }
]
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Trip with ID does not exist.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://trip.api.triphub.io" path="/v1/trips/:id/members" %}
{% api-method-summary %}
Add Member
{% endapi-method-summary %}

{% api-method-description %}
Add a member to this trip.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
ID of the trip to add the member to.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="role" type="string" required=false %}
The role to assign to this member, either "admin" or "member". Defaults to "member".
{% endapi-method-parameter %}

{% api-method-parameter name="user\_id" type="string" required=true %}
User ID to add to this trip.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Successfully added member.
{% endapi-method-response-example-description %}

```
{
    "created_at": "2018-06-12T15:42:38.279Z",
    "updated_at": "2018-06-12T15:42:38.279Z",
    "trip_id": 1,
    "user_id": "auth0|14a8370c1f45a",
    "role": "member"
}
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

{% api-method method="delete" host="https://trip.api.triphub.io" path="/v1/trips/:tid/members" %}
{% api-method-summary %}
Delete Member
{% endapi-method-summary %}

{% api-method-description %}
Removes a member from a trip. Only admins can perform this action.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="tid" type="number" required=true %}
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

