### Redis

| Action | Command |
| :--- | :--- |
| List keys (Safe) | `SCAN 0` |
| List keys (Dangerous) | `KEYS *` |
| View Hash Data | `HGETALL <key>` |
| View String Data | `GET <key>` |
| Check Data Structure | `TYPE <key>` |