Fuck ActionBar
---
  这两日又回来搞下ActionBar，一开始我并不觉得ActionBar很美观，用了下Fuubo、Weico、StartUpNews才有点改观，Actionbar并不意味着死板。

  之前都是过了一小遍，基本配置及api都了解了一下。但是有一点困惑木有解决的就是，左上角的的homeAsUpIndicator是默认的，理所当然地就是替换掉成自己的图标(默认的看着不爽)。对，就是这货耗了我2个下午去如何设置。（第一张图为默认，第二张图为我们想要的效果）  
  ![default](../img/2014040902.png) ![custom](../img/2014040901.png)

  这个android guide/trainning都没有说，只好百度和google了。无奈百度不到，google搜也找了几次，找到类似的，但是按着做无效果(啊，莫非是搜索技术太渣？)。

  只好从源文件开干了....
  通常，定义个Activity的theme 在style里这么写：  
```xml  

	<style name="actionbarActivity" parent="@android:style/Theme.Holo.Light">  
		<item name="android:actionBarStyle">@style/myactionbarStyle</item>
	</style>  

	<style name="myactionbarStyle" parent="@android:style/Widget.Holo.Light.ActionBar">
		<item name="android:background">@drawable/ic_bg_tweet</item>
	</style>
```

  打开`android:style/Widget.Holo.Light.ActionBar` 发现有个这么一个属性`<item name="android:homeAsUpIndicator">@android:drawable/ic_ab_back_holo_light</item>`  

  显然就是从这里修改了啊。于是咱就这么写了:  
```xml  

	<style name="actionbarActivity" parent="@android:style/Theme.Holo.Light">  
		<item name="android:actionBarStyle">@style/myactionbarStyle</item>
	</style>  

	<style name="myactionbarStyle" parent="@android:style/Widget.Holo.Light.ActionBar">
		<item name="android:background">@drawable/ic_bg_tweet</item>
		<item name="android:homeAsUpIndicator">@drawable/ic_btn_web_back_unclick</item>
	</style>
```

  部署了以后发现,妈蛋！木有效果！当时想莫非又有什么高大上的设置？搞啊找啊，还是木有找到原因，差点想放弃算了，换用@JakeWharton 大神的ActionBarSherlock 库可能还有戏。于是download下来，妈蛋！工作室的网络太渣，又要等N久，所以取消！

  静下来思考一下：木有出我想要的效果，显然是属性被覆盖了啊！那哪里会覆盖了？会不会`@android:style/Theme.Holo.Light`覆盖了？

  于是打开`@android:style/Theme.Holo.Light`系统定义的地方：这个style很多属性定义，而且有继承关系，用力一搜，请看下图:  
  ![whatTheHell](../img/2014040903.jpg)  
  妈蛋！1283行果然是出现了`android:homeAsUpIndicator`的属性了！果然是重复定义！  
  
  所以应该这么做：  
```xml  

	<style name="actionbarActivity" parent="@android:style/Theme.Holo.Light">  
		<item name="android:actionBarStyle">@style/myactionbarStyle</item>
		<item name="android:homeAsUpIndicator">@drawable/ic_btn_web_back_unclick</item>   
	</style>  

	<style name="myactionbarStyle" parent="@android:style/Widget.Holo.Light.ActionBar">
		<item name="android:background">@drawable/ic_bg_tweet</item>
	</style>
```  

  没错就是换了一下位置。  
  好了，虽然觉得耗了点时间，但是我觉得这时间耗得值，而且必须耗一下。发现问题不可怕，可怕是不去解决问题。绕开问题也是一种解决方案，但我木有这么做，不然怎么提高自己的debug能力？
   
   
  
   
   