import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {data, popular, profile} from '../helper/data';
import TouchableScale from 'react-native-touchable-scale';
import {HomeProps} from '../../App';
import {SharedElement} from 'react-navigation-shared-element';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const Home = ({navigation}: HomeProps) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerDate}>{profile.date}</Text>
          <Text style={styles.headerTitle}>Blog</Text>
        </View>
        <View>
          <Image
            source={{uri: profile.profilePic}}
            style={styles.headerImage}
          />
          <View style={styles.headerImageNotification} />
        </View>
      </View>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          contentContainerStyle={{paddingLeft: 30}}
          snapToInterval={width - 90 + 30}
          decelerationRate="fast"
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => {
            return (
              <View>
                <View>
                  <TouchableScale
                    activeScale={0.9}
                    tension={50}
                    friction={7}
                    useNativeDriver
                    onPress={() => navigation.navigate('Detail', {item})}>
                    <SharedElement id={`item.${item.id}.photo`}>
                      <Image
                        resizeMode="cover"
                        source={{uri: item.image}}
                        style={{
                          width: width - 90,
                          height: height - 450,
                          borderRadius: 14,
                          marginRight: 30,
                        }}
                      />
                    </SharedElement>
                    <SharedElement
                      id={`item.${item.id}.text`}
                      style={{
                        width: width - 90,
                        position: 'absolute',
                        bottom: 90,
                        left: 10,
                        paddingHorizontal: 10,
                      }}>
                      <Text style={styles.blogTitle}>{item.title}</Text>
                    </SharedElement>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                      }}>
                      <SharedElement id={`item.${item.id}.profilePic`}>
                        <Image
                          resizeMode="cover"
                          source={{uri: item.profilePic}}
                          style={styles.blogProfilePic}
                        />
                      </SharedElement>
                      <View>
                        <SharedElement id={`item.${item.id}.username`}>
                          <Text style={styles.blogUsername}>
                            {item.username}
                          </Text>
                        </SharedElement>
                        <SharedElement id={`item.${item.id}.readtime`}>
                          <Text style={styles.blogReadTime}>
                            {item.readtime}
                          </Text>
                        </SharedElement>
                      </View>
                    </View>
                  </TouchableScale>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
          paddingVertical: 30,
        }}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Popular</Text>
        <Text style={{color: 'orange', fontWeight: 'bold'}}>Show All</Text>
      </View>

      <FlatList
        data={popular}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 30,
                paddingLeft: 30,
                alignItems: 'center',
              }}>
              <View style={{marginRight: 30}}>
                <Image
                  source={{uri: item.image}}
                  style={{width: 100, height: 100, borderRadius: 10}}
                />
              </View>

              <View style={{width: '60%'}}>
                <Text
                  style={{
                    color: 'orange',
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}>
                  {item.topic}
                </Text>
                <Text
                  style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>
                  {item.title}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    opacity: 0.4,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 16,
                    }}>
                    <Feather name="book-open" size={14} color="#000" />
                    <Text style={{marginHorizontal: 4, fontSize: 12}}>
                      {item.readtime}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 16,
                    }}>
                    <Feather name="thumbs-up" size={14} color="#000" />
                    <Text style={{marginHorizontal: 4, fontSize: 12}}>
                      {item.likes}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerDate: {
    fontSize: 14,
    fontWeight: '700',
    color: 'orange',
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  headerImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  headerImageNotification: {
    height: 14,
    width: 14,
    borderRadius: 6,
    position: 'absolute',
    backgroundColor: 'red',
    right: -4,
    top: -4,
    borderWidth: 2,
    borderColor: 'white',
  },
  blogTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: 'rgba(0,0,0,.4)',
  },
  blogProfilePic: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginRight: 14,
  },
  blogUsername: {
    color: '#f7f7f7',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: 'rgba(0,0,0,.4)',
  },
  blogReadTime: {
    fontSize: 14,
    color: '#f7f7f7',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: 'rgba(0,0,0,.4)',
  },
});

export default Home;
