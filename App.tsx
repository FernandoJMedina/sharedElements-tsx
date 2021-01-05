import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import TestingProgressIndicator from './src/screens/TestingProgressIndicator';
import Documents from './src/screens/Documents';
import Logger from './src/screens/Logger';
import Menu from './src/screens/Menu';
import Parallax from './src/screens/Parallax';
import CustomTabComponent from './src/components/Tab';

type RootStackParamList = {
  Parallax: undefined;
  Documents: undefined;
  Logger: undefined;
  Menu: undefined;
  Progress: undefined;
  TabComponent: undefined;
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

const Stack = createSharedElementStackNavigator();
const Tab = createBottomTabNavigator();

function TabComponent() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => (
            <CustomTabComponent tintColor="orange" label="home" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Logger"
        component={Logger}
        options={{
          tabBarButton: (props) => (
            <CustomTabComponent tintColor="#f37ff3" label="logger" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Documents"
        component={Documents}
        options={{
          tabBarButton: (props) => (
            <CustomTabComponent
              tintColor="#4b458c"
              label="documents"
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarButton: (props) => (
            <CustomTabComponent tintColor="#2d9cdb" label="menu" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Parallax"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Parallax" component={Parallax} />
          <Stack.Screen name="Progress" component={TestingProgressIndicator} />
          <Stack.Screen name="TabComponent" component={TabComponent} />
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
