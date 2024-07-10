import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async () => {
      const trimmedForm = {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
      };
  
      if (!trimmedForm.username || !trimmedForm.email || !trimmedForm.password) {
        Alert.alert("Error", "Please fill in all the fields");
        return;
      }
  
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedForm.email)) {
        Alert.alert("Error", "Please enter a valid email address");
        return;
      }
  
      console.log("Form data before submission:", trimmedForm);


   setIsSubmitting(true);
    try {
      await createUser(trimmedForm.email, trimmedForm.password,trimmedForm.username);

      // set it to global state
      router.replace("/home");
    } catch (error) {
      console.log("Error creating user:", error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full px-4 my-6 min-h-[80vh] justify-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text
            className="text-white text-2xl text-semib
           font-psemibold mt-10 "
          >
            Sign Up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7 "
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7 "
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyles="w-full mt-10"
            isLoading={isSubmitting}
          />
          {/* Don't have account */}
          <View className=" justify-center pt-5 flex-row gap-2 ">
            <Text className="text-lg text-gray-100 font-pregular ">
              Already have an account ?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              {" "}
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
