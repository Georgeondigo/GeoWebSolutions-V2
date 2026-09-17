# Domain and DNS

## Domains

Production domains:
- `geowebsolutions.co.ke`
- `www.geowebsolutions.co.ke`

## DNS Provider

Cloudflare remains the authoritative DNS provider.

Vercel reported:

```text
Intended Nameservers:
ns1.vercel-dns.com
ns2.vercel-dns.com

Current Nameservers:
dee.ns.cloudflare.com
rocky.ns.cloudflare.com
```

This is expected because DNS is intentionally managed through Cloudflare rather than Vercel DNS.

## Important History

The domain was previously attached to the older `geowebsolutions` Vercel project.

It was removed and then assigned to `geoweb-solutions-v2` after the V2 production deployment became healthy.

## Verification

Both custom domains returned HTTP `200 OK` through Vercel.
