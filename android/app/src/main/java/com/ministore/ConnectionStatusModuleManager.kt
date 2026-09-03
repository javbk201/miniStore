package com.ministore; // replace your-apps-package-name with your app’s package name

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import com.facebook.react.bridge.Arguments // Importación necesaria para enviar objetos
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ConnectionStatusModuleManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val connectivity: ConnectivityManager? = 
        reactContext.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager

    override fun getName(): String {
        return "ConnectionStatusModule"
    }

    @ReactMethod
    fun checkConnectionStatus(promise: Promise) {
        var name: String? = null
        var connected = false

        connectivity?.let { manager ->
            val activeNetwork = manager.activeNetwork
            val capabilities = manager.getNetworkCapabilities(activeNetwork)

            if (capabilities != null) {
                if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)) {
                    name = "MOBILE"
                    connected = true
                } else if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)) {
                    name = "WIFI"
                    connected = true
                }
            }
        }

        val result = Arguments.createMap().apply {
            putString("name", name)
            putBoolean("connected", connected)
        }

        promise.resolve(result)
    }
}