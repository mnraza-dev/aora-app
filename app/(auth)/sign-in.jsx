import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn, signOut } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error','Please fill  in all the fields');
    }
    setIsSubmitting(true);
    try {
      console.log("Checking for existing session...");

      // Check for and clear any existing session
      await signOut();
await signIn(form.email, form.password)

      // set it to global state
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
    finally{
      setIsSubmitting(false)
    }

  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center  px-4 my-6 min-h-[80vh]">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text
            className="text-white text-2xl text-semib
           font-psemibold mt-10 "
          >
            Login to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email:e})}
            otherStyles="mt-7 "
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password:e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles="w-full mt-10"
            isLoading={isSubmitting}
          />
          {/* Don't have account */}
          <View className=" justify-center pt-5 flex-row gap-1 ">
            <Text className="text-lg text-gray-100 font-pregular ">
              Don't have an account ?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary"> Sign Up
            </Link>
          </View>


         

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
