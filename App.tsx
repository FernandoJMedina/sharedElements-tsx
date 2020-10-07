import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';

type RootStackParamList = {
  Home: undefined;
  Detail: {
    item: {
      id: number;
      username: string;
      title: string;
      readtime: string;
      profilePic: string;
      image: string;
    };
  };
};

export type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;
export type DetailProps = StackScreenProps<RootStackParamList, 'Detail'>;

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              headerBackTitleVisible: false,
              cardStyleInterpolator: ({current: {progress}}) => {
                return {cardStyle: {opacity: progress}};
              },
            }}
            sharedElements={(route) => {
              const {item} = route.params;
              return [
                {
                  id: `item.${item.id}.photo`,
                  animation: 'move',
                  resize: 'clip',
                  align: 'center-top',
                },
                {
                  id: `item.${item.id}.text`,
                  animation: 'fade',
                  resize: 'clip',
                  align: 'left-center',
                },
                {
                  id: `item.${item.id}.profilePic`,
                  animation: 'move',
                  resize: 'clip',
                  align: 'left-center',
                },
                {
                  id: `item.${item.id}.username`,
                  animation: 'fade',
                  resize: 'clip',
                  align: 'left-center',
                },
                {
                  id: `item.${item.id}.readtime`,
                  animation: 'fade',
                  resize: 'clip',
                  align: 'left-center',
                },
              ];
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
