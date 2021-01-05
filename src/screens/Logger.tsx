import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background: #f37ff3;
`;
const Text = styled.Text``;

interface Props {}

const Logger = (props: Props) => {
  return (
    <Container>
      <Text>Logger</Text>
    </Container>
  );
};

export default Logger;
