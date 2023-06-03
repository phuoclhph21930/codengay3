import { StyleSheet, Text, View,Image, SafeAreaView,Button,ScrollView,TouchableOpacity } from 'react-native';
import React , {useEffect,useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import log from '../Log';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Student = ({ student }) => {

  return (
    
        <View style={{  paddingVertical: 15,
  borderBottomColor: '#E2E2E2',
  borderBottomWidth: 0.5,
  flexDirection: 'row'}}>
          <View style={styles.itemImageContainer}>
              {student.gender === 'Male' ? (
                  <Image style={styles.itemImage} source={require('../assets/images/male.png')} resizeMode='contain' />
              ) : (
                  <Image style={styles.itemImage} source={require('../assets/images/female.png')} resizeMode='contain' />
              )}
          </View>
          <View style={styles.right}>
              <Text>{student.studentId}</Text>
              <Text>{student.fullName}</Text>
              <Text>{student.gender}</Text>
              <Text>{student.email}</Text>
              <Text>{student.dateOfBirth}</Text>
          </View>
      </View>

     
  );
};
const Danhsach = () => {
  const navigation = useNavigation();
    const [students, setStudents] = useState([]);
    const [authInfo, setAuthInfo] = useState();

  const navigateTologin= () =>{
    navigation.navigate('TsxScreen');
  }
  const retrieveData = async () => {
    try {
        const authInfo = await AsyncStorage.getItem('authInfo');
        if (authInfo !== null) {
            log.info('====> authInfo from AsyncStorage', authInfo);
            setAuthInfo(JSON.parse(authInfo));
        }
    } catch (error) {
        log.error(error);
    }
};
const doLogout = () => {
  AsyncStorage.removeItem('authInfo');
  navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
  });
};
const getListStudent = async () => {
  try {
      const API_URL = 'http://192.168.31.82:3000/students';
      const response = await fetch(API_URL);
      const data = await response.json();
      log.info('====> students:', JSON.stringify(data));
      setStudents(data);
  } catch (error) {
      log.error('Fetch data failed ' + error);
  }
};
  useEffect(() => {
    retrieveData();
    getListStudent();
}, []);
  const renderStudents = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View>
                <Text style={styles.txtHeader}>List Student</Text>
            </View>
            <View style={styles.studentContainer}>
                {students.map((item, index) => {
                    return <Student student={item} key={index}></Student>;
                })}
            </View>
        </ScrollView>
    ); 
};
return (
        <SafeAreaView style={styles.container}>
          {authInfo ? 
          <TouchableOpacity   onPress={doLogout}>

              <Text style={styles.text}>Logout</Text>

          </TouchableOpacity> :
          <TouchableOpacity   onPress={navigateTologin} >

              <Text style={styles.text}>Login Screen</Text>

          </TouchableOpacity>}
          {authInfo?.role === 'ADMIN' ? renderStudents() : null}
        </SafeAreaView>
);
}
export default Danhsach

const styles = StyleSheet.create({
  
  container: {
    flex: 1
},
scrollView: {
    flexGrow: 1,
    padding: 20
},
txtHeader: {
    fontSize: 18,
    fontWeight: 'bold'
},
studentContainer: {
    flex: 1
},
item: {
  paddingVertical: 15,
  borderBottomColor: '#E2E2E2',
  borderBottomWidth: 0.5,
  flexDirection: 'row'
},
itemImageContainer: {
  width: 100,
  height: 90,
  borderRadius: 100,
  borderWidth:0.2
},
itemImage: {
  flex: 1,
  width: undefined,
  height: undefined
},
right: {
  paddingLeft: 15
},item:{

},text:{
  color:'blue',
  margintop:10,
  fontSize:20,
  fontWeight:'bold',
  textAlign:'center'
}
})