### Filter Case Insensitive

```
fields @timestamp, @message
| sort @timestamp desc
| filter @message like /(?i)error/
```