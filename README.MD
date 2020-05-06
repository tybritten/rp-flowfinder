## RP-Flowfinder

This tool will search exported flows from [RapidPro](https://github.com/rapidpro/rapidpro) to find values for specific keys.

`rp-flowfinder filename --property|-p --string|-s [--hostname|-h]`

_filename_ is the path to the JSON flow export file
--property is the string of the node property you're looking for (type, url, etc.)
--string is the value you're looking for that property to contain
--hostname is optional. When it finds the flow uuid of a node that contains the property/string combination, it outputs the URL to open it. hostname will replace `localhost` with whatever your rapidpro installation uses like [texit](https://textit.in).

