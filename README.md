---
description: API documentation for the Trip service.
---

# Trip Service

## Authorisation

All endpoints require authorisation which associates each request to an individual user.

Authorisation is achieved by including an authorisation header, set to a JSON Web Token which encodes details on the user.

```text
Authorization: Bearer <JWT>
```



