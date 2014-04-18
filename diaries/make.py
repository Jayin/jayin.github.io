#encoding:utf-8
#to do:
#support Chinese File name yet...
#support paging yet
#support sort the diaries by time
__author__ = 'Jayin Ton'

import os, re, json

pageCount = 10;
ignore = [
    'README.md',
    '.+\.json',
    '.+\.py'
]


def main():
    l = list(os.listdir(os.getcwd()))
    for ig in ignore:
        pattern = re.compile(ig, re.IGNORECASE)
        for t in l:
            if (re.findall(pattern, t)):
                l.remove(t)

    with open("1.json", mode="w") as f:
        f.write(json.dumps({'result': l}))
    print("Finish")


if __name__ == "__main__":
    main()
