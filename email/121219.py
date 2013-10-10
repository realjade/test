import smtplib
from email.mime.text import MIMEText
from email.encoders import encode_base64
from sendgrid import Message
from sendgrid.transport.web import Http
from sendgrid.transport.smtp import Smtp
import DNS
def testemail():
    http = Http('tongbupan_test_register1','register2012',ssl=True)
    fromemail = ('309893455@qq.com','tesst')
    message = Message(fromemail,'test email',text='test email content')
    message = message.add_to('jade.zhang@emacle.com')
    try:
        ret = http.send(message)
        if ret:
            print 'ret:%s'%ret
    except Exception,e:
        print 'error'

def testdns():
    DNS.DiscoverNameServers()
    mx_hosts = DNS.mxlookup('saf.com')
    host = mx_hosts[0][1]
    print host[host.rfind('.')+1:]

if __name__ == '__main__':
    testdns()