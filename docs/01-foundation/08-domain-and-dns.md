# GeoWeb Solutions — Domain & DNS

## Primary Domain

```text
geowebsolutions.co.ke
```

## WWW

```text
www.geowebsolutions.co.ke
```

Both are assigned to:

```text
geoweb-solutions-v2
```

## DNS

Current authoritative Cloudflare nameservers:

```text
dee.ns.cloudflare.com
rocky.ns.cloudflare.com
```

Vercel's intended nameservers are different, but the production setup retains Cloudflare as the DNS provider.

## Architecture

```text
Domain Registrar
 ↓
Cloudflare DNS
 ↓
Vercel
 ↓
GeoWeb Solutions V2
```

## Verification

```bash
curl -I https://geowebsolutions.co.ke
curl -I https://www.geowebsolutions.co.ke
```

Both returned:

```text
HTTP/1.1 200 OK
Server: Vercel
```

## Important Note

The misspelled domain:

```text
geowebsoltions.co.ke
```

was encountered during configuration. It is not the production domain.

The correct domain is:

```text
geowebsolutions.co.ke
```
