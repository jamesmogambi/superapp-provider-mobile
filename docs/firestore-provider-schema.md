# Firestore Provider Schema

Collection: `providers`

Document ID = Clerk `user.id`

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `userId` | `string` | Clerk user ID. Document ID and this field should match. |
| `fullName` | `string` | Provider full name. |
| `gender` | `string` | `"Male"` or `"Female"`. Empty if not set. |
| `email` | `string` | Primary email address. |
| `mobileNumber` | `string` | Phone number. |
| `landmark` | `string` | Nearby landmark for location context. |
| `homeLocation` | `string` | Home / base location text. |
| `serviceRadius` | `string` | Delivery / service radius, e.g. `"10.0 Km"`. |
| `minOrder` | `string` | Minimum order value, e.g. `"0.0"`. |
| `imageUrl` | `string?` | Profile image URL. Can be empty if none uploaded. |
| `role` | `string` | Fixed value `"provider-service"`. |
| `online` | `boolean?` | Provider online status for orders. Written separately. |
| `updatedAt` | `timestamp` | Firestore server timestamp of last update. |

## Example Document

```json
{
  "userId": "user_2abc123XYZ",
  "fullName": "Jonathan Smith",
  "gender": "Male",
  "email": "jonathan@example.com",
  "mobileNumber": "+254712345678",
  "landmark": "Near City Mall",
  "homeLocation": "Eldoret Kenya, Langas Estate",
  "serviceRadius": "10.0 Km",
  "minOrder": "0.0",
  "imageUrl": "https://...",
  "role": "provider-service",
  "online": true,
  "updatedAt": "2026-07-14T00:00:00Z"
}
```

## Write Patterns

- **Create / Update profile**: `setDoc(doc(db, "providers", user.id), profile, { merge: true })`
- **Update online status**: `setDoc(doc(db, "providers", userId), { online, updatedAt: serverTimestamp() }, { merge: true })`

## Notes

- The document ID is the Clerk user ID.
- `updatedAt` is always refreshed on profile or status updates.
- `online` may not exist until the provider toggles availability.

---

# Firestore Services Schema

Collection: `services`

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `category` | `string` | Service category, e.g. `"provider-service"`. |
| `name` | `string` | Service display name, e.g. `"Plumbing"`. |
| `status` | `string` | `"Active"` or `"Deactive"`. |
| `iconImage` | `string` | Cloudinary URL for service icon. |
| `iconPublicId` | `string` | Cloudinary public ID for the icon. |
| `counties` | `array<int64>` | County IDs where service is offered. |
| `countyNames` | `array<string>` | County display names, e.g. `["Turkana", "Nakuru"]`. |
| `createdBy` | `string` | Clerk user ID of creator. |
| `createdAt` | `timestamp` | Creation timestamp. |
| `updatedAt` | `timestamp` | Last update timestamp. |

## Example Document

```json
{
  "category": "provider-service",
  "name": "Plumbing",
  "status": "Deactive",
  "iconImage": "https://res.cloudinary.com/dz58xxg6l/image/upload/v1781445801/superapp/services/j4ph6cprlshd9ksa8yqm.jpg",
  "iconPublicId": "",
  "counties": [23, 32, 36, 9, 13, 21, 25, 29, 35, 39],
  "countyNames": ["Turkana", "Nakuru", "Bomet", "Mandera", "Tharaka-Nithi", "Murang'a", "Samburu", "Nandi", "Kericho", "Bungoma"],
  "createdBy": "user_3F65XQVEESLiFPKt9yLaEpPgyUb",
  "createdAt": "2026-06-14T17:03:22Z",
  "updatedAt": "..."
}
```

## Query Pattern

```ts
const q = query(collection(db, "services"), where("category", "==", "provider-service"));
const snapshot = await getDocs(q);
const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```
