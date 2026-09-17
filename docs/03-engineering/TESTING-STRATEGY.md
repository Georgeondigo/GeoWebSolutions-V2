# Testing Strategy

## Current Verification Layers

### Static Checks

```bash
pnpm lint
```

### Production Build

```bash
pnpm build
```

### HTTP Verification

Production pages were checked using `curl`.

Verified:
- `/`
- `/contact`
- `/api/inquiries`

### API Behavior

Tested:
- invalid email → `400`
- valid inquiry → `201`

## Future Testing

Potential additions:
- unit tests for validation
- integration tests for inquiry persistence
- authentication tests
- end-to-end browser tests
- regression tests for admin workflows
