---
description: Endpoints for managing a trip's invitations.
---

# Invitations

{% api-method method="get" host="https://trip.api.triphub.io" path="/v1/trips/:tid/invitations" %}
{% api-method-summary %}
Get a trip's invitations
{% endapi-method-summary %}

{% api-method-description %}
Get a list of active invitations associated with a specific trip.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="tid" type="number" required=true %}
Trip ID to get invitations for.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
[

]
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://trip.api.triphub.io" path="/v1/trips/:tid/invitations" %}
{% api-method-summary %}
Create Invitation
{% endapi-method-summary %}

{% api-method-description %}
Creates a new invitation to the specified trip. The requesting user must be a member of the specified trip.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="tid" type="number" required=true %}
Trip ID to create invitation for.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="role" type="string" required=false %}
Role to assign the user when joining via this invitation. Can be one of \`member\` or \`admin\`. Defaults to \`member\`.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="patch" host="https://trip.api.triphub.io" path="/v1/invitations/:id" %}
{% api-method-summary %}
Patch an Invitation
{% endapi-method-summary %}

{% api-method-description %}
Update an invitation. Only the invitation creator can update an invitation.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
The invitation ID.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="role" type="string" required=false %}
One of \`member\` or \`admin\`. Defaults to \`member\`.
{% endapi-method-parameter %}

{% api-method-parameter name="is\_active" type="boolean" required=false %}
Whether the invitation can be used.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
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

{% api-method method="post" host="https://trip.api.triphub.io" path="/v1/invitations/:id" %}
{% api-method-summary %}
Respond to Invitation
{% endapi-method-summary %}

{% api-method-description %}
Performs an action on a given invitation, currently the only action is to accept.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
Invitation ID
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="action" type="string" required=true %}
Must be set to `accept`
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=204 %}
{% api-method-response-example-description %}
User has successfully joined the trip. 
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

