Install maven in linux
=======

Go to [apache-maven Download](https://maven.apache.org/download.cgi) and check what is the latest tar.gz file

Supposing it is e.g. apache-maven-3.2.1-bin.tar.gz, from the command line; you should be able to simply do:

```shell
wget http://mirror.olnevhost.net/pub/apache/maven/binaries/apache-maven-3.2.1-bin.tar.gz
```

And then proceed to install it.

Run command above from the dir you want to extract maven to (e.g. /usr/local/apache-maven)
run the following to extract the tar:

```shell
tar xvf apache-maven-3.2.1-bin.tar.gz
```

Next add the env varibles such as

```shell
export M2_HOME=/usr/local/apache-maven/apache-maven-3.2.1
export M2=$M2_HOME/bin
export PATH=$M2:$PATH
```

### Verify

```shell
mvn -version
```



