import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const TsxScreen = () => {
  return (
    <View>
      <TextInput placeholder='Nhập link ảnh' style={styles.logpass} secureTextEntry={true}></TextInput>
      <TextInput placeholder='Nhập họ tên' style={styles.logpass} secureTextEntry={true}></TextInput>
      <TextInput placeholder='Nhập điện thoại' style={styles.logpass} secureTextEntry={true}></TextInput>
      <TextInput placeholder='Nhập địa chỉ' style={styles.logpass} secureTextEntry={true}></TextInput>
      <TextInput placeholder='Nhập ngày sinh' style={styles.logpass} secureTextEntry={true}></TextInput>
    </View>
  )
}

export default TsxScreen

const styles = StyleSheet.create({})