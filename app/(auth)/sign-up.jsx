import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    username:'',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = () => {};
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
            handleChangeText={(e) => setForm({ ...form, username: e.target.value})}
            otherStyles="mt-7 "
        
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e.target.value})}
            otherStyles="mt-7 "
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e.target.value})}
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
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary"> Sign In
            </Link>
          </View>


         

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
