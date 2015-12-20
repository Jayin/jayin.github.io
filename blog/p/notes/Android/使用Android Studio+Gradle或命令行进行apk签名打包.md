## 使用Android Studio+Gradle进行apk签名打包

参考文章:
- http://blog.csdn.net/jjwwmlp456/article/details/44942109  
- https://developer.android.com/tools/publishing/app-signing.html  
- http://www.trinea.cn/android/android-view-signatures/  
- http://www.jianshu.com/p/f97959e8e919  

1. 默认为debug mode，使用的签名文件在： `$HOME/.android/debug.keystore`

2. Release Mode 签名：

    build.gradle：
    ```    
    android {  
        signingConfigs {  
            releaseConfig {  
                keyAlias 'stone'  
                keyPassword 'mypwd'  
                storeFile file('/Users/stone/Documents/project_AS/myapplication/stone.keystore')  
                storePassword 'mypwd'  
            }  
        }  
            buildTypes {  
               release {  
                 ...  
                 signingConfig signingConfigs.release  
               }  
            }  
    }
    ```  
    signingConfigs 即签名配置。 配置名`releaseConfig{ //配置内容 }`
    在buildTypes中指定release时的signingConfigs对应的配置名

    执行gradle 命令， `$ gradle assembleRelease`
    编译并发布。 在`build/outputs/apk/` 下能看到未签名的apk 和 已经签名的apk
    如果未用签名文件，使用debug mode的debug签名。那就会生成一个debug签名的apk

3. 签名密码写在gradle中不安全：
    ```
    signingConfigs { //gradle assembleRelease  
        myConfig {  
            storeFile file("stone.keystore")  
            storePassword System.console().readLine("\nKeystore password: ")  
            keyAlias "stone"  
            keyPassword System.console().readLine("\nKey password: ")  
        }  
    }  
    ```
    这样在命令 执行 命令时，就会被要求输入密码

    更优雅的办法：
    我这里把它们(密码信息)写在local.properties中然后在版本库中排除这个文件。

    获取local.properties的内容
    ```
    //这里是读取local.properties文件，提供给下方代码用来提取keystroe_storeFile等key的值
    Properties properties = new Properties()
    properties.load(project.rootProject.file('local.properties').newDataInputStream())
    signingConfigs {

            release {
                // relase签名
                storeFile file(properties.getProperty("keystroe_storeFile"))
                storePassword properties.getProperty("keystroe_storePassword")
                keyAlias properties.getProperty("keystroe_keyAlias")
                keyPassword properties.getProperty("keystroe_keyPassword")
            }
        }
    ```
    在`local.properties`文件中加入
    ```
    keystroe_storeFile=keystore.jks  //对应自己实际的证书路径和名字，因为我上面提到 把证书放在 项目的app目录下，所以不用写绝对路径。
    keystroe_storePassword=123456
    keystroe_keyAlias=alias
    keystroe_keyPassword=123456
    ```
4. 使用Android Studio 签名打包

    菜单 Build > Generate Signed APK

5. 使用Android Studio 自动签名打包

    1. 打开project structure (cmd+;)
    2. 选中需要构建的moudle，打开Signing，添加config
     ![config](http://img.blog.csdn.net/20150408163615227?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamp3d21scDQ1Ng==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

      执行完成后，会在build.gradle中自动加上 `signingConfigs{ config {...} }`的信息
    3. 打开build types > release
    ![release](http://img.blog.csdn.net/20150408164124479?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamp3d21scDQ1Ng==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

    在signing Config中选择定义的配置
    `zip align enabled` 默认为true， 用于启用优化Apk的操作

    4. `$ gradle build`
      会在build/outputs/apk/ 目录下输出 在build types中定义的 编译类型
     如：
      ```
      myapplication-debug-unaligned.apk
      myapplication-debug.apk
      myapplication-release-unaligned.apk
      myapplication-release-unsigned.apk
      myapplication-release.apk
      ```

### 查看应用签名信息
 >查看自己的应用签名及三方APK或系统APK签名信息，包含其中的MD5、SHA1、SHA256值和签名算法等信息。

1. 某个keystore签名的应用（会要求输入签名密码）

 ```
 $ keytool -list -v -keystore path/to/your.keystore(jks)
 ```

2. 查看三方应用或是系统应用签名

用winrar打开待查看的apk，将其中META-INF文件夹解压出来，得到其中的CERT.RSA文件

```
keytool -printcert -file META-INF/CERT.RSA
```
