import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {DetailProps} from '../../App';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Detail = ({route, navigation}: DetailProps) => {
  const {item} = route.params;

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useFocusEffect(
    React.useCallback(() => {
      opacity.value = 0.5;
      translateY.value = 0;
      return () => {
        opacity.value = 0;
        translateY.value = 30;
      };
    }, []),
  );

  const style = useAnimatedStyle(() => {
    return {
      opacity: withDelay(200, withTiming(opacity.value)),
      transform: [{translateY: withDelay(200, withSpring(translateY.value))}],
    };
  });

  const style2 = useAnimatedStyle(() => {
    return {
      opacity: withDelay(300, withTiming(opacity.value)),
      transform: [{translateY: withDelay(300, withSpring(translateY.value))}],
    };
  });
  return (
    <View style={styles.container}>
      <View>
        <SharedElement id={`item.${item.id}.photo`}>
          <Image
            resizeMode="cover"
            source={{uri: item.image}}
            style={{
              width,
              height: height - 450,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          />
        </SharedElement>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            left: 10,
            bottom: 14,
          }}>
          <SharedElement id={`item.${item.id}.profilePic`}>
            <Image
              resizeMode="cover"
              source={{uri: item.profilePic}}
              style={{
                width: 60,
                height: 60,
                borderRadius: 10,
                marginRight: 14,
              }}
            />
          </SharedElement>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 20,
            }}>
            <View>
              <SharedElement id={`item.${item.id}.username`}>
                <Text
                  style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                  {item.username}
                </Text>
              </SharedElement>
              <SharedElement id={`item.${item.id}.readtime`}>
                <Text style={{color: 'white', fontSize: 14}}>
                  {item.readtime}
                </Text>
              </SharedElement>
            </View>

            <TouchableOpacity>
              <Feather name="bookmark" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 14,
        }}>
        <SharedElement
          id={`item.${item.id}.text`}
          style={{width: width - 30, marginBottom: 14}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', lineHeight: 32}}>
            {item.title}
          </Text>
        </SharedElement>

        <Animated.Text
          style={[
            {
              fontSize: 14,
              lineHeight: 28,
              textAlign: 'justify',
              opacity: 0.5,
            },
            style,
          ]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Animated.Text>
        <Animated.Text
          style={[
            {
              fontSize: 14,
              lineHeight: 28,
              textAlign: 'justify',
              opacity: 0.5,
            },
            style2,
          ]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Animated.Text>
        <View
          style={{
            marginVertical: 25,
            paddingBottom: 20,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', padding: 12, alignItems: 'center'}}>
            <Feather name="heart" size={16} color="orange" />
            <Text style={{marginHorizontal: 10}}>3.4 Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 12,
              width: 100,
              backgroundColor: 'orange',
              borderRadius: 10,
            }}>
            <Text
              style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
              Follow
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{position: 'absolute', top: 40, left: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Detail;
