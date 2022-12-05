import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

const SinglePostScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { name, desc, img, phone, address } = route.params;
  const args = {
    number: phone, // String value with the number to call
    prompt: true, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };
  const makeCall = () => {
    Linking.openURL("tel:119");
  };

  const giveDirection = () => {
    const fullAddress = address;
    const url = Platform.select({
      ios: `maps:0,0?q=${fullAddress}`,
      android: `geo:0,0?q=${fullAddress}`,
    });

    Linking.openURL(url!);
  };

  return (
    <ScrollView style={styles.backg}>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.exitPost}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="chevron-left" color={"#AD40AF"} size={32} />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{
            uri: img,
            width: 32,
            height: 250,
          }}
        />
        <View style={styles.title}>
          <Text style={styles.titleText}>{name}</Text>
        </View>
        <View style={styles.descBox}>
          <Text style={styles.desc}>{desc}</Text>
        </View>
        <View style={styles.callButton}>
          <CustomButton label="CALL POSTER" onPress={makeCall} />
        </View>
        <View style={styles.directionButton}>
          <CustomButton label=" GET DIRECTIONS" onPress={giveDirection} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SinglePostScreen;

const styles = StyleSheet.create({
  backg: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "#fff49b",
  },
  exitPost: {
    left: "5%",
  },
  image: {
    width: "95%",
    justifyContent: "center",
    alignSelf: "center",
    top: "2%",
    borderRadius: 10,
  },
  title: {
    alignSelf: "center",
    top: "3.5%",
  },
  titleText: {
    fontSize: 24,
    fontFamily: "Roboto-Regular",
  },
  descBox: {
    top: "5%",
    padding: "3%",
    borderWidth: 3,
    marginLeft: "2%",
    marginRight: "2%",
    borderRadius: 10,
    backgroundColor: "#ffff",
    borderColor: "#c579c7",
  },
  desc: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    alignSelf: "center",
  },
  callButton: {
    marginTop: "20%",
    width: "80%",
    alignSelf: "center",
  },
  directionButton: {
    marginTop: "-3.5%",
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 26,
    fontFamily: "Roboto-Regular",
    alignSelf: "center",
  },
});
