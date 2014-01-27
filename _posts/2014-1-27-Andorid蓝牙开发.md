#Android bluetooth develope
introduction the basic api

##realative class
* BluetoothAdapter  
* BluetoothDevice
* BluetoothSocket
* BluetoothServerSocket

##permission
```xml
<uses-permissionandroid:name="android.permission.BLUETOOTH" />
```


#set up bluetooth
###get luetoothAdapter  
```java
BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
if (mBluetoothAdapter == null) {
    // Device does not support Bluetooth
}
```
###enable bluetooth
![](http://developer.android.com/images/bt_enable_request.png)
```java
//notify the user
if (!mBluetoothAdapter.isEnabled()) {
    Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
    startActivityForResult(enableBtIntent, REQUEST_ENABLE);
}
```

```java
//without  notify the user
mBluetoothAdapter.enable();
```

#Discovering devices
* create a BroadcastReceiver to receive result of discovery 
```java
mReceiver = new BroadcastReceiver() {

			@Override
			public void onReceive(Context context, Intent intent) {
				if (BluetoothDevice.ACTION_FOUND.equals(intent.getAction())) {
					BluetoothDevice device = intent
							.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
				
					if (device.getBondState() != BluetoothDevice.BOND_BONDED) {
						info += "find device-> " + device.getName()
								+ " address-> " + device.getAddress() + "\n";
						tv.setText(info);
					}
				} else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED
						.equals(intent.getAction())) {
					Set<BluetoothDevice> pairDevice = mAdapter
							.getBondedDevices();
					info += "total number of found : " + pairDevice.size()
							+ "\nfind over\n";
					tv.setText(info);
				}
			}
		};
		IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
		filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
		registerReceiver(mReceiver, filter);
```

* start to discovery
```java
mBluetoothAdapter.startDiscovery()
```

##Enabling discoverability

* By default, the device will become discoverable for 120 seconds. 
*  The maximum duration an app can set is 3600 seconds, and a value of 0 means the device is always discoverable. Any value below 0 or above 3600 is automatically set to 120 secs).   
* if you are enabling discoverability without enabling bluetooth ,it's automatically enable bluetooth.
and display the following dialog
 ![](http://developer.android.com/images/bt_enable_discoverable.png)
```java
int defalutDiscoverableTime = 120;
Intent discoverableIntent = new
Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
discoverableIntent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, defalutDiscoverableTime );
startActivity(discoverableIntent);
```

##Connecting Devices
* they are connectting with socket
* ine the concept of Server and Client
* `accept()`will causes block ,so go with `Thread`

###Server   for example
```java
private class AcceptThread extends Thread {
    private final BluetoothServerSocket mmServerSocket;
 
    public AcceptThread() {
        // Use a temporary object that is later assigned to mmServerSocket,
        // because mmServerSocket is final
        BluetoothServerSocket tmp = null;
        try {
            // MY_UUID is the app's UUID string, also used by the client code
            tmp = mBluetoothAdapter.listenUsingRfcommWithServiceRecord(NAME, MY_UUID);
        } catch (IOException e) { }
        mmServerSocket = tmp;
    }
 
    public void run() {
        BluetoothSocket socket = null;
        // Keep listening until exception occurs or a socket is returned
        while (true) {
            try {
                socket = mmServerSocket.accept();
            } catch (IOException e) {
                break;
            }
            // If a connection was accepted
            if (socket != null) {
                // Do work to manage the connection (in a separate thread)
                manageConnectedSocket(socket);
                mmServerSocket.close();
                break;
            }
        }
    }
 
    /** Will cancel the listening socket, and cause the thread to finish */
    public void cancel() {
        try {
            mmServerSocket.close();
        } catch (IOException e) { }
    }
}
```

###Client  for example
```java
private class ConnectThread extends Thread {
    private final BluetoothSocket mmSocket;
    private final BluetoothDevice mmDevice;
 
    public ConnectThread(BluetoothDevice device) {
        // Use a temporary object that is later assigned to mmSocket,
        // because mmSocket is final
        BluetoothSocket tmp = null;
        mmDevice = device;
 
        // Get a BluetoothSocket to connect with the given BluetoothDevice
        try {
            // MY_UUID is the app's UUID string, also used by the server code
            tmp = device.createRfcommSocketToServiceRecord(MY_UUID);
        } catch (IOException e) { }
        mmSocket = tmp;
    }
 
    public void run() {
        // Cancel discovery because it will slow down the connection
        mBluetoothAdapter.cancelDiscovery();
 
        try {
            // Connect the device through the socket. This will block
            // until it succeeds or throws an exception
            mmSocket.connect();
        } catch (IOException connectException) {
            // Unable to connect; close the socket and get out
            try {
                mmSocket.close();
            } catch (IOException closeException) { }
            return;
        }
 
        // Do work to manage the connection (in a separate thread)
        manageConnectedSocket(mmSocket);
    }
 
    /** Will cancel an in-progress connection, and close the socket */
    public void cancel() {
        try {
            mmSocket.close();
        } catch (IOException e) { }
    }
}
```

##Managing a Connection
the example above ,it's talking about How to connect.When they connected ,the thread had finished their  
permission.Next,it's going to focuse on how to transport the data between Server and Client
with  `read(byte[])` and `write(byte[])`  
example :
```java
private class ConnectedThread extends Thread {
    private final BluetoothSocket mmSocket;
    private final InputStream mmInStream;
    private final OutputStream mmOutStream;
 
    public ConnectedThread(BluetoothSocket socket) {
        mmSocket = socket;
        InputStream tmpIn = null;
        OutputStream tmpOut = null;
 
        // Get the input and output streams, using temp objects because
        // member streams are final
        try {
            tmpIn = socket.getInputStream();
            tmpOut = socket.getOutputStream();
        } catch (IOException e) { }
 
        mmInStream = tmpIn;
        mmOutStream = tmpOut;
    }
 
    public void run() {
        byte[] buffer = new byte[1024];  // buffer store for the stream
        int bytes; // bytes returned from read()
 
        // Keep listening to the InputStream until an exception occurs
        while (true) {
            try {
                // Read from the InputStream
                bytes = mmInStream.read(buffer);
                // Send the obtained bytes to the UI activity
                mHandler.obtainMessage(MESSAGE_READ, bytes, -1, buffer)
                        .sendToTarget();
            } catch (IOException e) {
                break;
            }
        }
    }
 
    /* Call this from the main activity to send data to the remote device */
    public void write(byte[] bytes) {
        try {
            mmOutStream.write(bytes);
        } catch (IOException e) { }
    }
 
    /* Call this from the main activity to shutdown the connection */
    public void cancel() {
        try {
            mmSocket.close();
        } catch (IOException e) { }
    }
}
```

#That all.

 