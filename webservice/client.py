# -*- coding: utf-8 -*-
import suds

url = 'http://211.150.70.206:8888/axis/xmapi?wsdl'
client = suds.client.Client(url)
result =  client.service.getDomainUserlist_New('1','1','1')
print result