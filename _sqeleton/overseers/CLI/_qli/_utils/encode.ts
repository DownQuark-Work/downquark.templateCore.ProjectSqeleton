// https://github.com/denoland/deno_std/tree/main/encoding#toml
// https://toml.io/en/v1.0.0#table
// https://toml.io/en/v1.0.0#array-of-tables
/*
```
[dog."tater.man"]
type.name = "pug"
```
  In JSON land, that would give you the following structure:
`{ "dog": { "tater.man": { "type": { "name": "pug" } } } }`

Since tables cannot be defined more than once, redefining such tables using a [table] header is not allowed. Likewise, using dotted keys to redefine tables already defined in [table] form is not allowed. The [table] form can, however, be used to define sub-tables within tables defined via dotted keys.
```
[fruit]
apple.color = "red"
apple.taste.sweet = true
  # [fruit.apple]  # INVALID
  # [fruit.apple.taste]  # INVALID
[fruit.apple.texture]  # you can add sub-tables
smooth = true
```
Array of tables
```
[[products]]
name = "Hammer"
sku = 738594937

[[products]]  # empty table within the array

[[products]]
name = "Nail"
sku = 284758393

color = "gray"
```
JSON equivalent:
```
{
  "products": [
    { "name": "Hammer", "sku": 738594937 },
    { },
    { "name": "Nail", "sku": 284758393, "color": "gray" }
  ]
}
```
*/