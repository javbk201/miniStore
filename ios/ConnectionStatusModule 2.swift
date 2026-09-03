//
//  ConnectionStatusModule 2.swift
//  miniStore
//
//  Created by Jaime Avendaño on 3/09/26.
//


import Foundation
import Network

@objc(ConnectionStatusModule)
class ConnectionStatusModule: NSObject {

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  func checkConnectionStatus(_ resolve: RCTPromiseResolveBlock,
                              rejecter reject: RCTPromiseRejectBlock) {
    let monitor = NWPathMonitor()
    let queue = DispatchQueue(label: "ConnectionStatusModule.monitor")

    monitor.pathUpdateHandler = { path in
      var name: String? = nil
      var connected = false

      if path.status == .satisfied {
        connected = true
        if path.usesInterfaceType(.wifi) {
          name = "WIFI"
        } else if path.usesInterfaceType(.cellular) {
          name = "MOBILE"
        }
      }

      let result: [String: Any] = [
        "name": name as Any,
        "connected": connected
      ]

      resolve(result)
      monitor.cancel()
    }

    monitor.start(queue: queue)
  }
}
