import { StyleSheet, Text, View,Image,
TextInput,TouchableOpacity,Alert,onChangeText } from 'react-native'
import React, { useState  ,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import log from '../Log';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [user ,setUser] = useState([]);
  const [userName,setUserName] = useState('');
  const [userNameError , setuserNameError] = useState('');
  const [passwold , setUserPassWold] = useState('');
  const [userPassWoldError , setUserPassWoldError] = useState('');

  //lấy dữ liệu data từ json 
  const fethData = async () =>{
    try {
      const API_URl = ('http://192.168.31.82:3000/users');
      const fectdata = await fetch(API_URl);
      const data = await fectdata.json();
      setUser(data);
    }catch (error){
      log("Dữ liệu không lấy được " +error);
      return null;
    };
  }

  const clearError = (userNameError, userPassWoldError) => {
    if (userNameError) setuserNameError('');
    if (userPassWoldError) setUserPassWoldError('');
};

  //Luu du lieu vao Async
  const storeAuthInfo = async (value)=>{
    try{
      const authInfo = JSON.stringify(value);
      await AsyncStorage.setItem('authInfo',authInfo);

    }catch (error){
        log.info(error);
    }
  }
  log.info('authInfo: ' + JSON.stringify(user));
  const doLogin = () => {
    // Tạo đối tượng lưu giữ thông tin login
    let request = { userName: userName, password: passwold};
    // In ra thông tin user phục vụ check lỗi
    log.info('authInfo: ' + JSON.stringify(request));
    // Kiêm tra danh sách users có null hoặc undefined không
    if (user) {
        // Validate dữ liệu nhập vào
        const validateResult = validateAuthInfo(request);
        if (validateResult === true) {
            // Tìm user trong danh sách user từ API trả về
            const authInfo = user.find((user) => request.userName === user.userName);
            log.info('authInfo: ' + JSON.stringify(authInfo));
            // Thực hiện validate thông tin đăng nhâp
            if (!authInfo) {
                clearError(userNameError, userPassWoldError);
                Alert.alert('Notification', 'Cant find user infomation', [{ text: 'Cancel', onPress: () => log.error('Cant find user ' + request.userName) }]);
            } else {
                if (!(authInfo.password === request.password)) {
                    clearError(userNameError, userPassWoldError);
                    setUserPassWoldError('Password is not correct');
                    return;
                } else {
                    clearError(userNameError, userPassWoldError);
                    storeAuthInfo(authInfo);
                    Alert.alert('Thông báo', 'Bạn có muốn đăng nhập tài khoản : ' + request.userName +request.role, [
                        { text: 'OK', onPress: () => danhSach() },
                        { text: 'Cancel', onPress: () => log.info('Press Cancel') }
                    ]);
                }
            }
        }
    }
};
useEffect(() => {
  fethData();
}, []);

    //vadilate du lieu khi login 
    const validateAuthInfo = (authInfo) => {
      // Kiểm tra dữ liệu trên form gồm username và password
      if (authInfo.userName === '' && authInfo.passwold === '') {
        setuserNameError('Username field cannot be empty');
        setUserPassWoldError('Passworld field cannot be empty');
          return false;
      }
       else if (authInfo.userName === '') {
        setuserNameError('Username field cannot be empty');
          return false;
      } else if (authInfo.password === '') {
       setuserNameError('');
        setUserPassWoldError('Password field cannot be empty');
          return false;
      }
      return true;
  };


  //chuyển màn hình
  const navigation  =  useNavigation();
  const danhSach = () =>{
    navigation.navigate('Danhsach');
  } 
  const TsxScreen =() =>{
    navigation.navigate('TsxScreen');
  }

  
  return (
    <View style={styles.container}>
      <View style={styles.containertop}>
      <Image source={require('../assets/logo.png')} style= {styles.logo}/>
      </View>
      <View style={styles.containerbody}>
        
        <Text style={styles.text}>Đăng Nhập </Text>
        <Text style={{marginTop:30,fontSize:20,marginLeft:35}} >Name</Text>
      <TextInput placeholder='Nhập name' style={styles.log} value={userName} onChangeText={setUserName}></TextInput>
      <Text style={styles.errorTxt}>{userNameError}</Text>
      <Text style={{marginTop:10,fontSize:20,marginLeft:35}}>Passwold</Text>
      
      <TextInput placeholder='Nhập passwold' style={styles.logpass} value={passwold}
      onChangeText={setUserPassWold} secureTextEntry={true}></TextInput>
      <Text style={styles.errorTxt}>{userPassWoldError}</Text>
      <TouchableOpacity style={styles.buttonlogin} onPress={doLogin}>
        <Text style={styles.textlog}>Đăng nhập </Text>
        </TouchableOpacity>
        <Text style={styles.textHello}>Xin Chào Bạn Đang Ở Màn Hình Đăng Nhập!</Text>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  containertop:{
    
  },
  logo:{
    marginTop:70,
    width:500,
    marginBottom:50,
    marginLeft:50,
    height:170
  },
  text:{
    color:'red',
    fontSize:40,
    alignItems:'center',
    textAlign:'center',
    
    fontWeight:'bold'
  },
  containerbody:{
    flex:1
  },
  log:{
    borderWidth:1,
    fontSize:20,
    marginLeft:15,
    padding:10,
    marginRight:15,
    paddingLeft:20,
    marginTop:0,
    borderRadius:30,
    fontStyle:'italic',

  },
  logpass:{
    marginTop:0,
    borderWidth:1,
    marginLeft:15,
    fontSize:20,
    paddingLeft:20, 
    borderRadius:30,
    padding:10,
    marginRight:15,
    fontStyle:'italic',
  },
  buttonlogin:{
    marginTop:50,
    padding:10,
    width:200,
    backgroundColor:'blue',
    alignItems:'center',
    borderRadius:70,
    marginLeft:190
    
  },
  textlog:{
    color:'white',
    fontSize:25,
    fontWeight:'bold'
  },
  textHello:{
    fontWeight:'bold',
    color:'red',
    fontSize:20,
    marginTop:250,
    alignItems:'center',
    textAlign:'center'
  },
  errorTxt:{
    color:'red',
    marginLeft:15
  }

})