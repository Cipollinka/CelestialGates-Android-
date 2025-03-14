import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Svg, {Defs, RadialGradient, Stop, Rect} from 'react-native-svg';
import {createPulseAnimation} from '@/utils/animations';

interface SafeWrapperProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'light';
}

export default function SafeWrapper({
  children,
  variant = 'default',
}: SafeWrapperProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    const animation = createPulseAnimation(pulseAnim);
    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const getGradientStops = () => {
    const colors = {
      dark: ['#120718', '#1A0B2E', '#2A1B3D'],
      light: ['#2A1B3D', '#1A0B2E', '#120718'],
      default: ['#1A0B2E', '#2A1B3D', '#120718'],
    };

    return colors[variant].map((color, index) => (
      <Stop
        key={index}
        offset={`${index === 0 ? 10 : index === 1 ? 40 : 90}%`}
        stopColor={color}
        stopOpacity="1"
      />
    ));
  };

  return (
    <SafeAreaView className="flex-1" style={{marginTop: 50}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%">
          <Defs>
            <RadialGradient
              id="grad"
              cx="150"
              cy="150"
              rx="350"
              ry="350"
              gradientUnits="userSpaceOnUse">
              {getGradientStops()}
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width={width} height={height} fill="url(#grad)" />
        </Svg>
        <View className="absolute inset-0 opacity-30">
          {/* Animated mystical particles */}
          <Animated.View
            className="absolute w-2 h-2 bg-accent rounded-full"
            style={[{top: '10%', left: '20%'}, {opacity: pulseAnim}]}
          />
          <Animated.View
            className="absolute w-2 h-2 bg-accent rounded-full"
            style={[{top: '30%', right: '15%'}, {opacity: pulseAnim}]}
          />
          <Animated.View
            className="absolute w-2 h-2 bg-accent rounded-full"
            style={[{bottom: '25%', left: '40%'}, {opacity: pulseAnim}]}
          />
        </View>
      </View>
      <View className="flex-1 px-5">{children}</View>
    </SafeAreaView>
  );
}
