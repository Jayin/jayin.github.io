#!/usr/bin/python
# coding:utf-8

import os
import sys

port = '8000'
if len(sys.argv) > 1 :
    port = sys.argv[1]

os.system('python -m SimpleHTTPServer {port}'.format(port=port))


