import React from 'react';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import Images from '../images';
import {getPropertyName, getStylesForProperty} from 'css-to-react-native';

interface BackgroundProps {
  focused?: boolean;
  tintColor?: string;
}

console.log(getStylesForProperty('tintColor', '#fff'));

const Container = styled.TouchableWithoutFeedback``;
const Background = styled.View<BackgroundProps>`
  flex: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.focused ? props.tintColor : 'transparent')};
  border-radius: 100px;
  margin: 6px;
`;
const Icon = styled.Image<BackgroundProps>`
  height: 24px;
  width: 24px;
`;

const Label = styled.Text<BackgroundProps>`
  color: ${(props) => (props.focused ? props.tintColor : 'white')};
`;

interface Props extends BottomTabBarButtonProps {
  label: string;
  tintColor: string;
}

interface Label1 {
  home: any;
  logger: any;
  documents: any;
  menu: any;
}

interface Label2 {
  homeFocused: any;
  loggerFocused: any;
  documentsFocused: any;
  menuFocused: any;
}

const Tab = ({
  label,
  accessibilityState,
  onPress,
  tintColor = '#123ff9',
}: Props) => {
  const focused = accessibilityState?.selected;

  const icon = Images.icons[label as keyof Label1];

  return (
    <Container onPress={onPress}>
      <Background focused={focused} tintColor={tintColor}>
        <Icon
          source={icon}
          style={{tintColor: focused ? '#fff' : tintColor}}
          focused={focused}
          tintColor={tintColor}
        />
        {focused && (
          <Label
            focused={focused}
            tintColor={tintColor}
            style={{color: !focused ? tintColor : '#fff'}}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Label>
        )}
      </Background>
    </Container>
  );
};

export default Tab;
