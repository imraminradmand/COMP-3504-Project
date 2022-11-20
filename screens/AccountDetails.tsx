import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  LogBox,
  FlatList,
  ListRenderItem,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import accountIcon from "../assets/AccountAvatar.png";
import ItemCard from "../components/ItemCard";

import { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

LogBox.ignoreAllLogs();

export const CATEGORIES: any[] = [
  { id: "c1", title: "Italian", bg: "#f5428d" },
  { id: "c2", title: "hungrt", bg: "#f5428d" },
  { id: "c2", title: "hungrt", bg: "#f5428d" },
  { id: "c2", title: "hungrt", bg: "#f5428d" },
  { id: "c2", title: "hungrt", bg: "#f5428d" },
  { id: "c1", title: "Italian", bg: "#f5428d" },
  { id: "c2", title: "hungrt", bg: "#f5428d" },
  { id: "c2", title: "hungrt", bg: "#f5428d" },
  { id: "c2", title: "hungrt", bg: "#f5428d" },
  { id: "c2", title: "hungrt", bg: "#f5428d" },
];

const AccountDetails = ({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [userPosts, setUserPosts] = useState<any[]>([]);
  const { authParam } = route.params;

  const Item = ({ data }: { data: any }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{data.postName}</Text>
      </View>
    );
  };

  const renderItem: ListRenderItem<any> = ({ item }) => <Item data={item} />;

  useEffect(() => {
    const getRefDoc = doc(db, "users", authParam.uid);
    getDoc(getRefDoc).then((snapshot) => {
      const res = snapshot.data();
      setEmail(res?.email);
      setFullName(res?.fullName);
      setPhoneNumber(res?.phone);
    });
  }, []);

  useEffect(() => {
    const getPostDoc = doc(db, "posts", "testPost");
    getDoc(getPostDoc)
      .then((snapshot) => {
        const res = snapshot.data();
        setUserPosts(res?.userPosts);
      })
      .catch((err) => alert(err));
  }, []);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigation.navigate("Home");
    });
  };

  return (
    <ScrollView style={styles.backg}>
      <View style={{ paddingHorizontal: 50, marginTop: 50 }}>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          Account Details
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image source={accountIcon} style={styles.avatar} />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",

            alignSelf: "center",
            borderColor: "#FFFFFF",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "500",
              color: "purple",
              opacity: 0.5,
              marginTop: 20,
            }}
          >
            Name
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "500",
                color: "red",
                marginTop: 20,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "black",
            top: 5,
          }}
        >
          {fullName}
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",

            alignSelf: "center",
            borderColor: "#FFFFFF",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "500",
              color: "purple",
              opacity: 0.5,
              marginTop: 20,
            }}
          >
            E-mail
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "500",
                color: "red",
                marginTop: 20,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "black",
            top: 5,
          }}
        >
          {email}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",

            alignSelf: "center",
            borderColor: "#FFFFFF",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "500",
              color: "purple",
              opacity: 0.5,
              marginTop: 20,
            }}
          >
            Phone Number
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "500",
                color: "red",
                marginTop: 20,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "500",
            color: "black",
            top: 5,
          }}
        >
          {phoneNumber}
        </Text>

        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 22,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
            marginTop: 50,
            alignSelf: "center",
          }}
        >
          My Posts
        </Text>

        {userPosts && (
          <ScrollView>
            <FlatList
              data={userPosts}
              keyExtractor={(item) => item.phoneNumber}
              renderItem={renderItem}
            />
          </ScrollView>
        )}

        <TouchableOpacity style={{ top: 20 }}>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "500",
              color: "red",
              marginBottom: 30,
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            Delete Account
          </Text>
        </TouchableOpacity>
        <View style={{ top: 10, marginBottom: "40%" }}>
          <CustomButton label={"Sign Out"} onPress={handleLogOut} />
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  backg: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "#fff49b",
  },
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
    fontFamily: "Roboto-Regular",
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "stretch",
  },
  logoContainer: {
    marginTop: 100,
  },
  avatar: {
    width: 75,
    height: 75,
  },
  item: {
    backgroundColor: "#f9c2ff", // colour for my posts
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
  },
});
