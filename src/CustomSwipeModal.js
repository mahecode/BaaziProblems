import React, {useRef, useEffect} from 'react';
import {Animated, View, Dimensions, TouchableOpacity} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const CustomSwipeModal = ({
  isOpen,
  direction = 'bottom',
  onClose,
  closeOnBackDropTouch = true,
  children,
}) => {
  const translateValue = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    let toValue = 0;
    switch (direction) {
      case 'top':
        translateValue.setValue(-screenHeight);
        break;
      case 'bottom':
        translateValue.setValue(screenHeight);
        break;
      case 'left':
        translateValue.setValue(-screenWidth);
        break;
      case 'right':
        translateValue.setValue(screenWidth);
        break;
      default:
        translateValue.setValue(screenHeight);
    }

    Animated.spring(translateValue, {
      toValue,
      useNativeDriver: true,
    }).start();
  }, [direction, isOpen, screenHeight, screenWidth, translateValue]);

  const onGestureEvent = event => {
    const {translationX, translationY} = event.nativeEvent;
    if (direction === 'left' || direction === 'right') {
      translateValue.setValue(translationX);
    } else if (direction === 'top' || direction === 'bottom') {
      translateValue.setValue(translationY);
    }
  };

  const backdropPressHandler = () => {
    if (onClose && closeOnBackDropTouch) {
      onClose();
    }
  };

  const getModalStyle = () => {
    switch (direction) {
      case 'left':
        return {
          transform: [{translateX: translateValue}],
          width: '70%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        };
      case 'right':
        return {
          transform: [{translateX: translateValue}],
          width: '70%',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
        };
      case 'top':
        return {
          transform: [{translateY: translateValue}],
          width: '100%',
          height: '50%',
          position: 'absolute',
          top: 0,
        };
      case 'bottom':
      default:
        return {
          transform: [{translateY: translateValue}],
          width: '100%',
          height: '50%',
          position: 'absolute',
          bottom: 0,
        };
    }
  };

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translateValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      if (
        (direction === 'left' && event.nativeEvent.translationX < -150) ||
        (direction === 'right' && event.nativeEvent.translationX > 200) ||
        (direction === 'top' && event.nativeEvent.translationY < -200) ||
        (direction === 'bottom' && event.nativeEvent.translationY > 200)
      ) {
        onClose();
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <TouchableOpacity
        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
        onPress={backdropPressHandler}
        activeOpacity={1}
      />
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[getModalStyle(), {backgroundColor: 'white'}]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default CustomSwipeModal;
