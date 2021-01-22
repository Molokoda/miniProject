import PushNotification from 'react-native-push-notification';


type options = {
  largeIcon: string,
  smallIcon: string,
  vibrate: boolean,
  vibration: number,
  priority: string,
  importance: string,
  playSound: boolean,
  soundName: string
}

class NotificationManager {
    configure = () => {
      PushNotification.configure({
        onRegister: function(token){
          console.log('[NotificationManager] onRegister token:', token);
        },
  
        onNotification: function(notification) {
          console.log('[NotificationManager] onNotification:', notification);   
        }
      })
    }
  
    _buildAndroidNotification = (
        id: number, 
        title: string, 
        message: string, 
        data = {}, 
        options: options
      ) => {
      return({
        id: id,
        autoCancel: true,
        largeIcon: options.largeIcon || 'ic_launcher',
        smallIcon: options.smallIcon || 'ic_launcher',
        bigText: message || '',
        subText: title || '',
        vibrate: options.vibrate || false,
        vibration: options.vibration || 300,
        priority: options.priority || 'high',
        importance: options.importance || 'high',
        data: data
      })
    }
  
    showNotification = (
        id: number, 
        title: string, 
        message: string, 
        data = {}, 
        options : options
      ) => {
      PushNotification.localNotification({
        ...this._buildAndroidNotification(id, title, message, data, options),
        title: title || '',
        message: message || '',
        playSound: options.playSound || false,
        soundName: options.soundName || 'default',
        userInteraction: false
      })
    }
  }

export const notificationManager = new NotificationManager;