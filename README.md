# HTTP Fingerprint(ing)

Fingerprinting can be used to identify clients that connect to your application.

This can be useful when:

* Significant attacks should be detected faster

* There is the need to make attack schemes easier visible

* Limitations on a per-client basis need to be imposed

* There are multiple clients behind a single IP and you need to differentiate them without a session (Example: [Carrier-grade NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT))

* ...

----

## Information

More detailed information can be found here:

* [Browser fingerprinting](https://github.com/niespodd/browser-fingerprinting)
* [TLS Fingerprinting (JA3)](https://github.com/salesforce/ja3)
* [TCP/OS Fingerprinting](https://incolumitas.com/2021/03/13/tcp-ip-fingerprinting-for-vpn-and-proxy-detection/)
* [wiki.superstes.eu - WAF](https://wiki.superstes.eu/en/latest/1/infra/waf.html)
* [Mozilla - Browser Fingerpinting](https://developer.mozilla.org/en-US/docs/Glossary/Fingerprinting)
* [Javascript Fingerprinting](https://fingerprint.com/blog/browser-fingerprinting-techniques/)

  * [Canvas Fingerprinting](https://fingerprint.com/blog/canvas-fingerprinting/) | [Canvas Fingerprinting #2](https://eric-diehl.com/fingerprinting-canvas-of-browser/)

  * [Audio Fingerprinting](https://fingerprint.com/blog/audio-fingerprinting/)


----

## Server-Side

There is not too much server-side information that can be used to reach a good uniqueness to identify a single client across multiple IPs.

Basically:

* TCP/UDP Protocol
* TLS Protocol
* HTTP Protocol

  * Application-specific headers, cookies, and so on

For more detailed information see: [wiki.superstes.eu - WAF](https://wiki.superstes.eu/en/latest/1/infra/waf.html#server-side-fingerprint)

### GeoIP

IP metadata can give you some information about the kind of client we might be dealing with.

* [Location example](https://ipinfo.io/1.1.1.1)

* [ASN example](https://ipinfo.io/AS60068)

Networks of hosting providers have a higher probability of being used for cyber attack/bot requests.

Some countries are known to be used as easy/cheap sources of nodes for botnets. Per example: [Cloudflare Radar - Security](https://radar.cloudflare.com/security-and-attacks)

### Sources

There are some well-known providers of good-quality GeoIP data.

But if you want to use it commercially it might get expensive fast!



* [IPInfo](https://ipinfo.io/)

  * [Free Databases](https://ipinfo.io/products/free-ip-database)


* [MaxMind](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data)

  * [GeoIP2](https://dev.maxmind.com/)
  * [Free MaxMind GeoLite2](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data)


* [ipapi.is](https://github.com/ipapi-is) - quality might not be the best

  * [Geolocation](https://ipapi.is/geolocation.html)
  * [ASN](https://ipapi.is/asn.html)
  * [Hosting](https://ipapi.is/hosting-detection.html)
  * [FREE Databases](https://github.com/ipapi-is/ipapi/tree/main/databases)

If you are interested: Information on how to [create GeoIP databases from scratch](https://www.hackitu.de/geoip)

----

## Client-Side

To be continued..

This is what I want to dive into here.. (;


