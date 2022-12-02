import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

import logo from "../assets/loginPage/Logo.png";
import apple from "../assets/loginPage/apple.png";
import google from "../assets/loginPage/google.png";
import ms from "../assets/loginPage/MS.png";
import { useEffect, useState } from "react";

import { auth, db, userRef } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { addUser } from "../apiCalls/calls";

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = () => {
    const validEmail = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const validPhone = phoneNumber.match(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?\d{3}\d{4}$/
    );

    if (!validEmail) {
      alert("Email not valid, try again");
      return;
    }

    if (!validPhone) {
      alert("Phone number is not in the correct format");
      return;
    }
    let uid = "";
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          uid = data.user.uid;
        })
        .then(() => {
          const dbDoc = doc(db, "users", uid);
          setDoc(dbDoc, {
            fullName: fullName,
            email: email,
            phone: phoneNumber,
          });

          const body = `{"uid": "${uid}", "fullName": "${fullName}", "email": "${email}", "phone": "${phoneNumber}"}`;
          addUser(body).catch((err) => console.log(err));
        })
        .then(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              navigation.navigate("Home");
            }
          });

          return unsubscribe;
        })
        .catch((err) => {
          alert(err);
        });
      return;
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 25, marginTop: 50 }}
        >
          <View style={{ alignItems: "center" }}>
            <Image source={logo} style={styles.logo} />
          </View>

          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
              marginTop: 10,
              alignSelf: "center",
            }}
          >
            Register
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: "#ddd",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginRight: 5,
              }}
            >
              <Image
                source={google}
                style={{ height: 24, width: 24, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: "#ddd",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginRight: 5,
              }}
            >
              <Image
                source={apple}
                style={{ height: 24, width: 24, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: "#ddd",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <Image
                source={ms}
                style={{ height: 24, width: 24, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{ textAlign: "center", color: "#666", marginBottom: 30 }}
          >
            Or, register with email ...
          </Text>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"Full Name"}
              style={{ flex: 1, paddingVertical: 0 }}
              onChangeText={setFullName}
              autoCorrect={false}
              textContentType="name"
              autoComplete="name"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"Email"}
              style={{ flex: 1, paddingVertical: 0 }}
              keyboardType="email-address"
              onChangeText={setEmail}
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <MaterialIcons
              name="phone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"(###)-###-####"}
              style={{ flex: 1, paddingVertical: 0 }}
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
              textContentType="telephoneNumber"
              autoComplete="tel"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"Password"}
              style={{ flex: 1, paddingVertical: 0 }}
              secureTextEntry={true}
              onChangeText={setPassword}
              textContentType="password"
              autoComplete="password"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"Confirm password"}
              style={{ flex: 1, paddingVertical: 0 }}
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              textContentType="password"
              autoComplete="password"
            />
          </View>

          <CustomButton
            label={"Register"}
            onPress={() => {
              registerUser();
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text>Already registered?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                {" "}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff49b",
  },
  header: {
    fontSize: 30,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "stretch",
  },
});
