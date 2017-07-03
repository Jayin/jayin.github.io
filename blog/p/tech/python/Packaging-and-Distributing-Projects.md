Python:打包和分发你的项目
-----------------------
> 2015-02-06

遥记起上一次打包是2014年的6月份，项目是[ETipsService](https://pypi.python.org/pypi/ETipsService/),记得当时没有遇到什么坑，因为都是模仿别人，而且没有特别高的需求(例如需要设置命令行入口)。昨晚打包一个项目并上传到[PyPI](https://pypi.python.org/pypi)遇到不少问题(主要是文档不全or文档难找到)，特别苦恼(因为我看着XX文档 也是醉了),于是觉得有必要记录下。

首先，这是一个精简版教程，因为上面已经说了，我打包的时候是因为文档的问题，而不是真的有大坑,其次是先容易入门一下。要进行高级的打包姿势的话，
还是看官方文档，因为一般的打包足以够我们平常使用了。其次，不需要花太多时间在学习这些，因为意义不大，又不是经常要打包。

快速入门要点：现模仿别人的`setup.py`写法，再查官方文档每个参数的意思。

相关文档
--------

- 主要参考官方，看一遍就懂。[python-packaging-user-guide](https://python-packaging-user-guide.readthedocs.org/en/latest/distributing.html#working-in-development-mode)


#### 1. 编写setup.py

故名思议，就是用来安装项目的文件(包含项目名称、版本、作者等信息),具体写法可以参照别人项目。例如

- 带命令行入口处理的[httpie](https://github.com/jakubroztocil/httpie/blob/master/setup.py)
- 一般项目打包入[click](https://github.com/mitsuhiko/click/blob/master/setup.py)
- 大型项目[django](https://github.com/django/django/blob/master/setup.py)
- 如果要更多参考，我推荐参考[@mitsuhiko](https://github.com/mitsuhiko?tab=repositories)大神的写法，算是行业标准(个人感觉)

##### `entry_points`参数

`setup.py`
```python
entry_points={
    'console_scripts': [
        'sample=your_package.sample:main',
    ],
}
```

这样设置并安装以后,终端输入`sample`即可调用your_package.sample包下的main方法，但是我发现有其他的写法，例如在[click中](http://click.pocoo.org/3/setuptools/#scripts-in-packages)

推荐上面的写法，因为更清晰

##### `package`参数

package指定了那些包最后进行打包入库
```python
packages=find_packages(exclude=['contrib', 'docs', 'tests*']) //

//or
packages=find_packages(exclude=['contrib', 'docs', 'tests*'])
```

#### 打包时特殊对待的文件

- ‵README.rst`

我好奇怪为啥大部分的Python项目都不约而同的有这个文件，而不是mardown格式，原来打包的时候会尝试把他打包进 

- `MANIFEST.in`

我也奇怪为啥大部分的Python项目都不约而同的有这个文件，原来上述setup.py提供的参数`packages`,`package_data`,`data_files`,`scripts`指定的文件打包入库均与项目运行有关，但是一些项目的描述(例如：LICENSE，CHANGES，docs等)与项目运行成功与否无关，所以抽离出来了。


我遇到一次坑也在这里

```python
with open('README.md') as f:
    long_description = f.read()

setup(
    ....
    long_description=long_description,
    ....
);
```

当我安装的时候（`pip install xxx` or `python setup.py install`）
出现了`File not found:README.md `,说是找不到README.MD，显然他没有把这个文件打包入库。解决办法在`MANIFEST.in`添加`include README.md`就ok

`MANIFEST.in`写法，参考上面提到的项目均可，很简单，文档也在这:[the-manifest-in-template](https://docs.python.org/2/distutils/sourcedist.html#the-manifest-in-template)



#### 2. 打包并上传到PyPI

打包有sdist(Source Distributions),wheel(轮子打包)，两者区别在与安装时有无build这个步骤，前者是安装的时候才build，后者是不需要，但是要build好

我个人是习惯用前者，因为wheel打包需要额外考虑下有无用到py2,3的兼容性,是否有使用额外扩展，感觉复杂了。


- step 1 注册/识别该python包
```
python setup.py register
```

注意   
- 他会提示你登录or注册一个PyPI帐号
- 登陆后，他会问你是否保存登陆信息，方便起见，选择Y
- 如果已经登陆过，请忽略这一步


- step 2 上传打包好的项目
```
python setup.py sdist upload //推荐，打包并上传
//or
python setup.py sdist bdist_wheel upload //所有方式一并打包上传
```

【本文由“编程助手”发布，2017年7月3日】

















