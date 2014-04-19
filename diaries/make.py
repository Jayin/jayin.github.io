#encoding:utf-8
#to do:
#support Chinese File name yet...  [ok]
#support paging yet
#support sort the diaries by time [ok]
__author__ = 'Jayin Ton'

import os, re, json, copy


#config
limit = 10
ignore = [
    'README.md',
    '.+\.json',
    '.+\.py'
]


def generation(page, list):
    with open(str(page) + ".json", mode="w") as f:
        f.write(json.dumps({'result': ','.join(list).decode('gbk').split(',')}))


def main():
    l = list(os.listdir(os.getcwd()))
    raw = copy.deepcopy(l)
    for ig in ignore:
        pattern = re.compile(ig, re.IGNORECASE)
        for t in l:
            if re.findall(pattern, t):
                raw.remove(t)
    raw.sort(reverse=False)
    # with open("1.json", mode="w") as f:
    #     f.write(json.dumps({'result': [','.join(l).decode('gbk').split(',')]}))
    size = len(raw)
    print size
    page = 1
    while page * limit <= size:
        print page, '--> ', raw[(page - 1) * limit:page * limit]
        generation(page, raw[(page - 1) * limit:page * limit])
        page += 1
    print page, '--> ', raw[(page - 1) * limit:]
    generation(page, raw[(page - 1) * limit:])

    print("Build finished")


def cleanUp():
    pass


if __name__ == "__main__":
    cleanUp()
    main()

