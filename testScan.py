#!/usr/bin/env python
from zapv2 import requests
headers = {
  'Accept': 'application/json',
  'X-ZAP-API-Key': 'gu6nvolgc8407mn97ia2kns2o3'
}

r = requests.get('http://zap/JSON/alert/view/alertsSummary/', params={

}, headers = headers)

print(r.json())