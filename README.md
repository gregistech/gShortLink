# gShortLink
A link shortener REST API.

## Usage
### Shorten urls
`/saveUrl?url=[LONGURL]`
#### Response
`[{"id":"[SHORTENEDURLID]"}]`

### Get url from ID
`/[ID]`
#### Response
`[{"id":"[SHORTENEDURLID]", "url":"[URL]"}]`
