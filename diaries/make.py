#encoding:utf-8
__author__ = 'Jayin Ton'

import os
import re
import json
import copy
import time


#config
limit = 10
ignore = [
    'README.md',
    '.+\.json',
    '.+\.py'
]


def generation(page, l):
    with open(str(page) + ".json", mode="w") as f:
        if len(l) > 0:
            f.write(json.dumps({'result': ','.join(l).decode('gbk').split(',')}))
        else:
            f.write(json.dumps({'result': []}))


def main():
    l = list(os.listdir(os.getcwd()))
    raw = copy.deepcopy(l)
    for ig in ignore:
        pattern = re.compile(ig, re.IGNORECASE)
        for t in l:
            if re.findall(pattern, t):
                raw.remove(t)
    raw.sort(reverse=False)
    size = len(raw)
    # print size
    page = 1
    while page * limit <= size:
        # print page, '--> ', raw[(page - 1) * limit:page * limit]
        generation(page, raw[(page - 1) * limit:page * limit])
        page += 1
    # print page, '--> ', raw[(page - 1) * limit:]
    generation(page, raw[(page - 1) * limit:])

    with open('info.json', mode='w') as f:
        f.write(json.dumps({'pages': page, 'last_motify': long(time.time() * 1000)}))
    print 'total=', size, 'pages=', page
    print "Build finished."


def cleanup():
    """
    clean up the `json` files
    """
    l = list(os.listdir(os.getcwd()))
    pattern = re.compile(r'.+\.json', re.IGNORECASE)
    for x in l:
        #
        if re.findall(pattern, x):
            os.remove(os.getcwd() + os.path.sep + x)
            print 'remove file--', os.getcwd() + os.path.sep + x
    print 'clean up .json files finished'


if __name__ == "__main__":
    cleanup()
    main()
