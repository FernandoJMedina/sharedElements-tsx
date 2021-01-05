import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background: #4b458c;
`;
const Text = styled.Text``;

interface Props {}

const Documents = (props: Props) => {
  return (
    <Container>
      <Text>Documents</Text>
    </Container>
  );
};

export default Documents;
