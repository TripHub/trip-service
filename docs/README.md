---
description: The trip service is responsible for managing trips and their members, locations and places (semi-monolith).
---

View on [GitHub](https://github.com/TripHub/trip-service).

## Authorisation

All endpoints require authorisation which associates each request to an individual user.

Authorisation is achieved by including an authorisation header, set to a JSON Web Token which encodes details on the user.

```text
Authorization: Bearer <JWT>
```
