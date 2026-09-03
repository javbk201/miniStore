//
//  ConnectionStatusModule.m
//  miniStore
//
//  Created by Jaime Avendaño on 3/09/26.
//
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ConnectionStatusModule, NSObject)

RCT_EXTERN_METHOD(checkConnectionStatus:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
