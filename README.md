Firebase rules:

{
  "rules": {
    "ingredients": {
      ".read": "true",
      ".write": "true"     
    },
    "orders": {
      ".read": "auth != null",
      ".write": "auth != null",     
      ".indexOn": ["userId"]
    }
  }
}
