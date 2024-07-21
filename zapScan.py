#!/usr/bin/env python
import sys
import time
import json
from zapv2 import ZAPv2

# The URL of the application to be tested
target = sys.argv[1]
# Change to match the API key set in ZAP, or use None if the API key is disabled
apiKey = 'p7k01upida279hlhu3qtr74si3'

# By default ZAP API client will connect to port 8080
zap = ZAPv2(apikey=apiKey)
# Use the line below if ZAP is not listening on port 8080, for example, if listening on port 8090
# zap = ZAPv2(apikey=apiKey, proxies={'http': 'http://127.0.0.1:8081', 'https': 'http://127.0.0.1:8081'})

# print('Spidering target {}'.format(target))
# The scan returns a scan id to support concurrent scanning
zap.core.new_session()
scanID = zap.spider.scan(target)
while int(zap.spider.status(scanID)) < 100:
    # Poll the status until it completes
    # print('Spider progress %: {}'.format(zap.spider.status(scanID)))
    time.sleep(1)

# print('Spider has completed!')
# Prints the URLs the spider has crawled
# print('\n'.join(map(str, zap.spider.results(scanID))))

time.sleep(2)

# # # print('Ajax Spider target {}'.format(target))
scanID = zap.ajaxSpider.scan(target)

timeout = time.time() + 60*2   # 2 minutes from now
# Loop until the ajax spider has finished or the timeout has exceeded
while zap.ajaxSpider.status == 'running':
    if time.time() > timeout:
        break
    # print('Ajax Spider status' + zap.ajaxSpider.status)
    time.sleep(2)

# # print('Ajax Spider completed')
# ajaxResults = zap.ajaxSpider.results(start=0, count=10)

# print(ajaxResults)
# If required post-process the spider results

while int(zap.pscan.records_to_scan) > 0:
    # Loop until the passive scan has finished
    # print('Records to passive scan : ' + zap.pscan.records_to_scan)
    time.sleep(2)

# print('Passive Scan completed')

# Collect Passive scan results/alerts into a dictionary
passive_scan_results = {
    # 'Hosts': zap.core.hosts,
    # 'Alerts': zap.core.alerts(),
    'html_report': zap.core.htmlreport(),
    'json_report':zap.core.jsonreport()
}

# report_html = zap.core.htmlreport()

# print(report_html)
# Save the report to a file
# with open('zap_report.html', 'w', encoding='utf-8') as html_file:
    # html_file.write(report_html)



# print('HTML report saved as zap_report.html')
# Serialize the results to JSON format
json_result = json.dumps(passive_scan_results, indent=4)
print(json_result)

# # Save the JSON report to a file
# with open('zap_report.json', 'w') as json_file:
#     json_file.write(json_result)

# print('JSON report saved as zap_report.json')