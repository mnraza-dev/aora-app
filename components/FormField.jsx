import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {images } from "../constants"
import {icons } from "../constants"
const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100">{title}</Text>
      <View className="border-2 flex-row border-black-200 w-full h-16 px-4  bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TextInput
          secureTextEntry={title === "Password" && !showPassword}
          placeholder={placeholder}
          value={value}
          placeholderTextColor="#7b7b8b"
          onChange={handleChangeText}
          className="flex-1 text-white font-psemibold text-base"
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
           
          >
             <Image className="w-6 h-6" source={!showPassword? icons.eye : icons.eyehide}/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
