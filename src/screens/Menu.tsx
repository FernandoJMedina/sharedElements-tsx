import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background: #2d9cdb;
`;
const Text = styled.Text``;

interface Props {}

const Menu = (props: Props) => {
  return (
    <Container>
      <Text>Menu</Text>
    </Container>
  );
};

export default Menu;
