from redis import Redis

rd = Redis("42.120.49.135", 6379, 0,'')

keys = rd.keys('*')
result = {}
for key in keys:
    if key:
        keypair = key.split(':')
        sp = keypair[0]
        sp1 = sp.split('-')
        if not result.get(sp1[0],None):
            result[sp1[0]] = key
print result