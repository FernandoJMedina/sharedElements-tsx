import React from 'react';
import {StyleSheet, TextInput, View, Animated} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

interface ProgressIndicatorProps {
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  textColor?: string;
  delay?: number;
  max?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const ProgressIndicator = ({
  percentage = 75,
  radius = 40,
  strokeWidth = 5,
  duration = 500,
  color = 'tomato',
  delay = 0,
  textColor,
  max = 100,
}: ProgressIndicatorProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef<any>();
  const inputRef = React.useRef<any>();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start(() => {
      animation(toValue === 0 ? percentage : 0);
    });
  };

  React.useEffect(() => {
    animation(percentage);

    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  });
  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            strokeOpacity={0.2}
            fill="transparent"
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <AnimatedInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {
            fontSize: radius / 2,
            color: textColor ?? color,
            fontWeight: '900',
            textAlign: 'center',
          },
        ]}
      />
    </View>
  );
};

export default ProgressIndicator;
