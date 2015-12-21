import requests
import json

google_api_key =  'AIzaSyArbx_H602BDP3Fq8QWSsml4YypRMe_ctg'

# Chico State University Farm
# lng = -121.8211
# lat = 39.6911

# Paradise
lng = -121.6239
lat = 39.7536




url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={api_key}'.format(lat=lat, lng=lng, api_key=google_api_key)
r = requests.get(url)
rjson = r.json()

formatted_address = rjson['results'][0]['formatted_address']

with open('reverse_geocode_result.json', 'w') as outfile:
  # Only save the most accurate result
  json.dump(r.json()['results'][0], outfile)
